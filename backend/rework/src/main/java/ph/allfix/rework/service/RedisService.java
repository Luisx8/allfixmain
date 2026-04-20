package ph.allfix.rework.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import ph.allfix.rework.domain.StateData;
import ph.allfix.rework.domain.SessionData;

import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;

/**
 * Redis service for state tokens and session management
 */
@Slf4j
@Service
public class RedisService {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    private static final String STATE_TOKEN_PREFIX = "sso:state:";
    private static final String SESSION_PREFIX = "sso:session:";

    @Value("${app.redis.allow-in-memory-fallback:true}")
    private boolean allowInMemoryFallback;

    private final Map<String, CachedValue<StateData>> fallbackStateStore = new ConcurrentHashMap<>();
    private final Map<String, CachedValue<SessionData>> fallbackSessionStore = new ConcurrentHashMap<>();

    /**
     * Store state token in Redis
     *
     * @param state  State token
     * @param data   StateData
     * @param ttlSeconds Time to live in seconds
     */
    public void storeStateToken(String state, StateData data, long ttlSeconds) {
        String key = STATE_TOKEN_PREFIX + state;
        try {
            redisTemplate.opsForValue().set(key, data, ttlSeconds, TimeUnit.SECONDS);
            fallbackStateStore.remove(key);
            log.debug("Stored state token in Redis: {}", state);
        } catch (Exception e) {
            if (!allowInMemoryFallback) {
                throw redisRequired("store state token", state, e);
            }
            fallbackStateStore.put(key, new CachedValue<>(data, expiryEpochSeconds(ttlSeconds)));
            log.warn("Redis unavailable, stored state token in memory: {}", state);
        }
    }

    /**
     * Retrieve state token from Redis
     *
     * @param state State token
     * @return StateData or null if not found/expired
     */
    public StateData getStateToken(String state) {
        String key = STATE_TOKEN_PREFIX + state;
        try {
            Object value = redisTemplate.opsForValue().get(key);
            if (value instanceof StateData) {
                log.debug("Retrieved state token from Redis: {}", state);
                return (StateData) value;
            }
        } catch (Exception e) {
            if (!allowInMemoryFallback) {
                throw redisRequired("read state token", state, e);
            }
            log.warn("Redis unavailable while reading state token: {}", state);
        }

        CachedValue<StateData> cached = fallbackStateStore.get(key);
        if (cached != null) {
            if (!cached.isExpired()) {
                log.debug("Retrieved state token from memory: {}", state);
                return cached.value();
            }
            fallbackStateStore.remove(key);
        }

        log.warn("State token not found or expired: {}", state);
        return null;
    }

    /**
     * Delete state token from Redis
     *
     * @param state State token
     */
    public void deleteStateToken(String state) {
        String key = STATE_TOKEN_PREFIX + state;
        try {
            redisTemplate.delete(key);
        } catch (Exception e) {
            if (!allowInMemoryFallback) {
                throw redisRequired("delete state token", state, e);
            }
            log.warn("Redis unavailable while deleting state token: {}", state);
        }
        fallbackStateStore.remove(key);
        log.debug("Deleted state token: {}", state);
    }

    /**
     * Store session data in Redis
     *
     * @param sessionId Session ID
     * @param data      SessionData
     * @param ttlSeconds Time to live in seconds
     */
    public void storeSession(String sessionId, SessionData data, long ttlSeconds) {
        String key = SESSION_PREFIX + sessionId;
        String corrId = null;
        String source = data != null ? data.getSource() : null;
        if (data != null && data.getAttributes() != null) {
            Object value = data.getAttributes().get("correlationId");
            if (value != null) {
                corrId = value.toString();
            }
        }

        try {
            redisTemplate.opsForValue().set(key, data, ttlSeconds, TimeUnit.SECONDS);
            fallbackSessionStore.remove(key);
            log.info("Stored session cache in Redis: sessionId={}, source={}, corrId={}, ttlSeconds={}",
                sessionId, source, corrId, ttlSeconds);
        } catch (Exception e) {
            if (!allowInMemoryFallback) {
                throw redisRequired("store session", sessionId, e);
            }
            fallbackSessionStore.put(key, new CachedValue<>(data, expiryEpochSeconds(ttlSeconds)));
            log.warn("Redis unavailable, stored session cache in memory: sessionId={}, source={}, corrId={}, ttlSeconds={}",
                sessionId, source, corrId, ttlSeconds);
        }
    }

    /**
     * Retrieve session data from Redis
     *
     * @param sessionId Session ID
     * @return SessionData or null if not found/expired
     */
    public SessionData getSession(String sessionId) {
        String key = SESSION_PREFIX + sessionId;
        try {
            Object value = redisTemplate.opsForValue().get(key);
            if (value instanceof SessionData) {
                log.debug("Retrieved session from Redis: {}", sessionId);
                return (SessionData) value;
            }
        } catch (Exception e) {
            if (!allowInMemoryFallback) {
                throw redisRequired("read session", sessionId, e);
            }
            log.warn("Redis unavailable while reading session: {}", sessionId);
        }

        CachedValue<SessionData> cached = fallbackSessionStore.get(key);
        if (cached != null) {
            if (!cached.isExpired()) {
                log.debug("Retrieved session from memory: {}", sessionId);
                return cached.value();
            }
            fallbackSessionStore.remove(key);
        }

        log.warn("Session not found or expired: {}", sessionId);
        return null;
    }

    /**
     * Delete session from Redis
     *
     * @param sessionId Session ID
     */
    public void deleteSession(String sessionId) {
        String key = SESSION_PREFIX + sessionId;
        try {
            redisTemplate.delete(key);
        } catch (Exception e) {
            if (!allowInMemoryFallback) {
                throw redisRequired("delete session", sessionId, e);
            }
            log.warn("Redis unavailable while deleting session: {}", sessionId);
        }
        fallbackSessionStore.remove(key);
        log.debug("Deleted session: {}", sessionId);
    }

    /**
     * Check if key exists
     *
     * @param key Redis key
     * @return true if exists
     */
    public boolean exists(String key) {
        try {
            return Boolean.TRUE.equals(redisTemplate.hasKey(key));
        } catch (Exception e) {
            if (!allowInMemoryFallback) {
                throw redisRequired("check key existence", key, e);
            }
            return fallbackStateStore.containsKey(key) || fallbackSessionStore.containsKey(key);
        }
    }

    private IllegalStateException redisRequired(String operation, String key, Exception cause) {
        String message = String.format(
            "Redis unavailable during '%s' for key '%s' while in-memory fallback is disabled",
            operation,
            key
        );
        log.error(message, cause);
        return new IllegalStateException(message, cause);
    }

    private long expiryEpochSeconds(long ttlSeconds) {
        return Instant.now().getEpochSecond() + Math.max(ttlSeconds, 1L);
    }

    private record CachedValue<T>(T value, long expiresAtEpochSeconds) {
        boolean isExpired() {
            return Instant.now().getEpochSecond() >= expiresAtEpochSeconds;
        }
    }
}
