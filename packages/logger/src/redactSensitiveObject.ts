/**
 * Logical field names treated as sensitive when recursively redacting plain objects
 * for HTTP log bodies (mirrors the default Pino redact paths in this package).
 */
const SENSITIVE_LOG_OBJECT_KEY_NAMES = [
  "password",
  "oldPassword",
  "newPassword",
  "confirmPassword",
  "token",
  "accessToken",
  "refreshToken",
  "idToken",
  "authorization",
  "cookie",
  "set-cookie",
  "apiKey",
  "api_key",
  "api-key",
  "client_secret",
  "clientSecret",
  "secret",
  "ssn",
  "email",
  "phone",
  "creditCard",
  "credit_card",
  "firstName",
  "lastName",
  "fullName",
  "dateOfBirth",
  "address",
] as const;

function normalizeRedactKey(key: string): string {
  return key.toLowerCase().replace(/[-_]/g, "");
}

const NORMALIZED_SENSITIVE_KEYS = new Set<string>(
  SENSITIVE_LOG_OBJECT_KEY_NAMES.map((name) => normalizeRedactKey(name)),
);

function isSensitiveObjectKey(key: string): boolean {
  return NORMALIZED_SENSITIVE_KEYS.has(normalizeRedactKey(key));
}

function redactArray(items: unknown[], censor: string): unknown[] {
  return items.map((item) => redactDeep(item, censor));
}

function redactRecord(
  record: Record<string, unknown>,
  censor: string,
): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(record)) {
    out[k] = isSensitiveObjectKey(k) ? censor : redactDeep(v, censor);
  }
  return out;
}

function redactNonPrimitiveObject(value: object, censor: string): unknown {
  if (value instanceof Date) {
    return value;
  }
  if (Array.isArray(value)) {
    return redactArray(value, censor);
  }
  return redactRecord(value as Record<string, unknown>, censor);
}

function redactDeep(value: unknown, censor: string): unknown {
  if (value === null || value === undefined || typeof value !== "object") {
    return value;
  }
  return redactNonPrimitiveObject(value, censor);
}

/**
 * Deep-clones plain JSON-like trees and replaces values whose keys match a sensitive-name list.
 * When `enabled` is false, returns the original reference (no clone).
 */
export function redactSensitiveObject(
  value: unknown,
  censor: string,
  enabled: boolean,
): unknown {
  if (!enabled) {
    return value;
  }
  return redactDeep(value, censor);
}
