const SENSITIVE_HEADER_NAMES = new Set([
  "authorization",
  "cookie",
  "set-cookie",
  "proxy-authorization",
  "proxy-authenticate",
  "www-authenticate",
  "x-api-key",
  "x-apikey",
]);

/**
 * Returns a copy of header key/value pairs with sensitive values replaced when redaction is enabled.
 */
export function sanitizeLogHeaderRecord(
  headers: Record<string, string>,
  censor: string,
  redact: boolean,
): Record<string, string> {
  if (!redact) {
    return { ...headers };
  }
  const out = { ...headers };
  for (const key of Object.keys(out)) {
    if (SENSITIVE_HEADER_NAMES.has(key.toLowerCase())) {
      out[key] = censor;
    }
  }
  return out;
}
