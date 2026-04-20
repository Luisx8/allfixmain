# Cognito PreSignUp + Dummy Email Setup (Allfix)

This setup lets Cognito users be stored with:
- `username` = PMS user ID (from backend provisioning)
- `email` = real PMS email if available, otherwise generated dummy email
- `email_verified` = true

## What Is Already Implemented In This Repo

`src/main/java/ph/allfix/rework/service/CognitoService.java` now does:
- Uses PMS user ID as Cognito username (not email)
- Generates dummy email when PMS email is missing (`<pmsUserId>@<COGNITO_DUMMY_EMAIL_DOMAIN>`)
- Writes `email_verified` based on `PMS_AUTO_VERIFY_EMAIL` (default `true`)

This means your backend admin provisioning path already supports username + dummy email storage in User Pool.

## PreSignUp Trigger: When To Use

Use PreSignUp only if users can sign up directly through Cognito Hosted UI or `SignUp` API and your pool still expects email verification.

For your backend admin flow (`AdminCreateUser`), PreSignUp is optional and usually not required.

## Step-by-Step (AWS Console)

1. Create Lambda function:
- Runtime: Node.js 20.x
- File: paste `lambda/pre-signup-auto-confirm-verify.js`
- Env var: `DUMMY_EMAIL_DOMAIN=allfix.internal` (or your owned internal domain)

2. Add Lambda permissions:
- Execution role needs CloudWatch Logs permissions
- No Cognito admin API permission is required for this trigger script

3. Attach trigger to User Pool:
- Cognito > User Pools > your pool > Lambda triggers
- Pre sign-up: select your Lambda
- Save changes

4. Validate app client / user pool settings:
- Sign-in method should include `username`
- If possible, do not require email as sign-in alias
- If email is still required by schema, this trigger injects dummy email

5. Test:
- Create user via Hosted UI or API without email
- Confirm in User Pool user details:
  - `Username`: PMS ID (or submitted username)
  - `email`: generated dummy email
  - `email_verified`: true

## Backend Env For This Repo

In `.env` for `backend/rework`:

```env
COGNITO_DUMMY_EMAIL_DOMAIN=allfix.internal
PMS_AUTO_VERIFY_EMAIL=true
```

Optional if using external preregister Lambda from backend:

```env
LAMBDA_AUTH_ARN=<your-preregister-lambda-arn>
AUTH_LAMBDA_ONLY_PROVISIONING=false
```

## Important Limitations

- PreSignUp cannot reliably bypass immutable User Pool schema requirements after creation.
- If your pool is locked into email-first mode, a new pool is often the cleanest fix.
- Avoid using public fake domains; use an internal domain you control.

## Verification Checklist

1. Trigger attached in Cognito User Pool.
2. Lambda logs show PreSignUp invoked.
3. Created users have non-empty `email` and `email_verified=true`.
4. Username field in Cognito is your PMS user ID.
