import pino, {
  type DestinationStream,
  Logger as PinoLogger,
  type LoggerOptions as PinoLoggerOptions,
} from "pino";

/** Placeholder written for redacted log fields when redaction is enabled. */
export const DEFAULT_REDACT_CENSOR = "[Redacted]";

const DEFAULT_REDACT_PATHS: string[] = [
  "password",
  "*.password",
  "*.oldPassword",
  "*.newPassword",
  "confirmPassword",
  "*.confirmPassword",
  "token",
  "*.token",
  "*.data.token",
  "*.payload.token",
  "*.data.accessToken",
  "*.payload.accessToken",
  "accessToken",
  "refreshToken",
  "idToken",
  "*.accessToken",
  "*.refreshToken",
  "*.idToken",
  "authorization",
  "*.authorization",
  "cookie",
  "*.cookie",
  "set-cookie",
  "*.set-cookie",
  "apiKey",
  "api_key",
  "*.apiKey",
  "*.api_key",
  "api-key",
  "*.api-key",
  "client_secret",
  "clientSecret",
  "*.client_secret",
  "*.clientSecret",
  "secret",
  "*.secret",
  "ssn",
  "*.ssn",
  "email",
  "*.email",
  "phone",
  "*.phone",
  "creditCard",
  "*.creditCard",
  "credit_card",
  "*.credit_card",
];

export interface LoggerOptions {
  enabled?: boolean;
  level?: string;
  /** Merged after built-in redact paths when {@link isLogRedactionEnabled} is true. */
  redactPaths?: string[];
  /** Overrides {@link DEFAULT_REDACT_CENSOR} when redaction is enabled. */
  redactCensor?: string;
  /** Optional output stream (e.g. for tests). Defaults to stdout. */
  destination?: DestinationStream;
}

export type LoggerType = PinoLogger<never, boolean>;

/**
 * Whether structured log redaction is active.
 * Redaction is on by default. Disable only locally via `LOG_REDACT=false` or `LOG_ALLOW_RAW_LOGS=true`.
 */
export function isLogRedactionEnabled(): boolean {
  if (
    process.env.LOG_ALLOW_RAW_LOGS === "true" ||
    process.env.LOG_ALLOW_RAW_LOGS === "1"
  ) {
    return false;
  }
  if (process.env.LOG_REDACT === "false" || process.env.LOG_REDACT === "0") {
    return false;
  }
  return true;
}

function mergeRedactPaths(extra?: string[]): string[] {
  return [...new Set([...DEFAULT_REDACT_PATHS, ...(extra ?? [])])];
}

function createSilentLogger(destination?: DestinationStream): LoggerType {
  const opts = { level: "silent" as const };
  return destination ? pino(opts, destination) : pino(opts);
}

function buildActivePinoOptions(
  options: LoggerOptions,
  levelValue: string,
): PinoLoggerOptions {
  if (!isLogRedactionEnabled()) {
    return { level: levelValue };
  }
  return {
    level: levelValue,
    redact: {
      paths: mergeRedactPaths(options.redactPaths),
      censor: options.redactCensor ?? DEFAULT_REDACT_CENSOR,
    },
  };
}

function instantiatePino(
  pinoOptions: PinoLoggerOptions,
  destination?: DestinationStream,
): LoggerType {
  return destination ? pino(pinoOptions, destination) : pino(pinoOptions);
}

/**
 * @param {LoggerOptions} options - Options for the logger.
 * @param {boolean} [options.enabled] - Whether the logger is enabled or not (default is true).
 * @param {string} [options.level] - The logging level.
 * possible values: 'fatal', 'error', 'warn', 'info', 'debug', 'trace'.
 * (default is 'info')
 * @returns {LoggerType} - A pino logger instance.
 */
export function Logger(options: LoggerOptions): LoggerType {
  const { enabled = true, level = "info", destination } = options;

  if (!shouldEnableLogger(enabled, level)) {
    return createSilentLogger(destination);
  }

  const pinoOptions = buildActivePinoOptions(options, level || "info");
  return instantiatePino(pinoOptions, destination);
}

function shouldEnableLogger(
  enabled: boolean | undefined,
  level: string | undefined,
): boolean {
  return enabled !== false && level !== "silent";
}
