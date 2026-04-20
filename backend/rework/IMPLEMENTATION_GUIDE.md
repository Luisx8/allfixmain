# Allfix Backend - OAuth2/SSO Implementation

## Overview

This is the Spring Boot backend for Allfix that implements OAuth2 SSO integration with AWS Cognito. It handles the PMS → Allfix seamless login flow.

## Architecture

```
PMS User → user-verifylog.php → /oauth/initiate-sso → Cognito Auth → Callback → /oauth/dashboard
```

## Project Structure

```
src/main/java/ph/allfix/rework/
├── config/
│   ├── SecurityConfig.java        # Spring Security OAuth2 setup
│   └── RedisConfig.java            # Redis configuration
├── controller/
│   ├── OAuthController.java        # SSO endpoints
│   └── HealthController.java       # Health checks
├── domain/
│   ├── StateData.java             # CSRF state token data
│   ├── SessionData.java           # User session data
│   └── PMSCognitoMapping.java     # PMS-Cognito user mapping
├── service/
│   ├── RedisService.java          # Redis operations
│   ├── CognitoService.java        # Cognito user operations
│   ├── CognitoTokenService.java   # Token exchange
│   └── PMSUserService.java        # PMS user validation
├── util/
│   ├── CryptoUtils.java           # HMAC signing, token generation
│   └── JwtUtils.java              # JWT decoding
├── dto/
│   ├── AuthResponse.java          # Auth response DTO
│   └── ErrorResponse.java         # Error response DTO
└── ReworkApplication.java          # Main Spring Boot app
```

## Setup Instructions

### 1. Prerequisites

- Java 17+
- Maven 3.8+
- Redis 6.0+
- AWS Cognito User Pool (ap-southeast-2_p7mounHZf)

### 2. Install Dependencies

```bash
cd allfixmain/backend/rework
./mvnw clean install
```

### 3. Configure Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Required environment variables:
- `COGNITO_CLIENT_SECRET` - Get from AWS Console → Cognito → App Clients → Show Details
- `PMS_BACKEND_SECRET` - Shared secret key with PMS for HMAC signatures

### 4. Start Redis

```bash
# Make sure Redis is running
redis-cli ping  # Should return "PONG"
```

### 5. Run the Application

```bash
./mvnw spring-boot:run
```

Should see:
```
Started ReworkApplication in X.XXX seconds
```

### 6. Verify Setup

```bash
curl http://localhost:8080/
# Should return:
# {"message":"Allfix Backend - OAuth2 SSO Service",...}

curl http://localhost:8080/health
# Should return:
# {"status":"UP","service":"allfix-backend"}
```

## Endpoints

### Public Endpoints

#### 1. Health Check
```
GET /health
→ Returns service status
```

#### 2. Initiate SSO
```
GET /oauth/initiate-sso?user_id=123&email=user@pms.com&timestamp=1712770000&signature=HMAC
→ Validates PMS user
→ Gets/Creates Cognito user
→ Redirects to Cognito authorize
```

#### 3. OAuth2 Callback
```
GET /oauth/login/oauth2/code/cognito?code=XXX&state=YYY
→ Exchanges code for JWT tokens
→ Creates session in Redis
→ Redirects to frontend dashboard with session parameter
```

### Protected Endpoints

#### 4. Dashboard (requires session)
```
GET /oauth/dashboard?session=SESSION_ID
→ Returns authenticated user info
→ Returns: { status, user, groups, expiresAt }
```

## TODO: PMS Integration

The `PMSUserService` class has placeholder methods that need to be implemented:

### Methods to Implement

1. **validatePMSUser(userId, timestamp, signature)**
   - Validate HMAC signature (partially done)
   - Check timestamp freshness (partially done)
   - TODO: Verify user exists in PMS database

2. **getUserEmail(userId)**
   - TODO: Query PMS database to fetch user email

3. **getUserRole(userId)**
   - TODO: Query PMS database to fetch user role
   - Return: "admin", "personnel", "vendor", or "customer"

4. **userExists(userId)**
   - TODO: Check if user exists in PMS

### Implementation Example

```java
@Override
public String getUserEmail(String userId) {
    // Query PMS database
    PMSUser user = pmsUserRepository.findById(userId);
    if (user == null) {
        throw new UserNotFoundException("User not found: " + userId);
    }
    return user.getEmail();
}
```

## Security Considerations

### ✅ Implemented

- HMAC-SHA256 signature verification for PMS requests
- State token with CSRF protection (5-min TTL)
- HttpOnly, Secure, SameSite cookies
- JWT token validation via Spring Security
- Token expiry checks
- CORS configuration (localhost only)

### ⚠️ Production Checklist

- [ ] Switch to HTTPS (not localhost)
- [ ] Update CORS to production domains
- [ ] Implement rate limiting on /oauth endpoints
- [ ] Add audit logging for all SSO attempts
- [ ] Use AWS Secrets Manager for sensitive values
- [ ] Configure Cognito domain with custom domain
- [ ] Enable MFA in Cognito for production
- [ ] Set up CloudWatch monitoring

## Troubleshooting

### Issue: "State token not found"
**Cause:** Redis not running or state data expired
**Solution:** 
```bash
redis-cli ping  # Verify Redis running
```

### Issue: "Invalid HMAC signature"
**Cause:** PMS_BACKEND_SECRET mismatch between PMS and backend
**Solution:**
- Ensure both PMS and backend use same secret key
- Check timestamp is fresh (within 5 minutes)

### Issue: "User not found in Cognito"
**Cause:** Cognito user auto-creation failed
**Solution:**
- Verify AWS SDK credentials are set
- Check CloudWatch logs
- Verify Cognito user pool permissions

### Issue: "Redirect URI mismatch"
**Cause:** Cognito callback URL not configured in user pool
**Solution:**
1. Go to AWS Console → Cognito → User Pools → allfix
2. Click "App clients" → Select app
3. Add redirect URL: `http://localhost:8080/login/oauth2/code/cognito`

## Testing the SSO Flow

### Local Testing

1. **Start all services:**
```bash
# Terminal 1: Redis
redis-server

# Terminal 2: PMS Backend
cd fpd-pms && php -S localhost:8000

# Terminal 3: Allfix Backend
cd allfixmain/backend/rework && ./mvnw spring-boot:run

# Terminal 4: Allfix Frontend
cd allfixmain/frontend/allfix-frontend && npm run dev
```

2. **Test SSO:**
```bash
# PMS Login: http://localhost:8000
# Click Allfix button
# Should redirect to Cognito → Allfix dashboard
```

3. **Manual endpoint test:**
```bash
# Generate state + signature
USER_ID=123
EMAIL="user@pms.com"
TIMESTAMP=$(date +%s)
SECRET="your-secret"
SIGNATURE=$(echo -n "${USER_ID}${TIMESTAMP}" | openssl dgst -sha256 -hmac "${SECRET}" -binary | base64)

# Call initiate-sso
curl "http://localhost:8080/oauth/initiate-sso?user_id=${USER_ID}&email=${EMAIL}&timestamp=${TIMESTAMP}&signature=${SIGNATURE}"
# Should redirect to Cognito
```

## Performance Optimization

- Redis caching for state tokens and sessions
- JWT token validation via Spring Security
- Connection pooling for AWS SDK
- Eager initialization of Cognito and Redis clients

## Monitoring & Logging

All operations are logged with DEBUG level:

```bash
# View logs:
tail -f logs/rework.log | grep "SSO"
```

Log levels adjustable in `application.yml`:
```yaml
logging:
  level:
    ph.allfix: DEBUG        # OAuth operations
    org.springframework.security: DEBUG  # Security events
```

## API Rate Limiting (TODO)

Recommended limits:
- `/oauth/initiate-sso`: 5 requests per minute per IP
- `/oauth/login/oauth2/code/cognito`: 10 requests per minute per IP
- `/oauth/dashboard`: 100 requests per minute per session

## References

- [Spring Security OAuth2 Resource Server](https://spring.io/guides/gs/securing-web/)
- [AWS Cognito OAuth2 Flow](https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-authentication-flow.html)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8949)

---

**Last Updated:** April 10, 2026
**Status:** ✅ Authentication Flow Implemented (PMS integration pending)
