import pino, { Logger as PinoLogger } from "pino";

export interface LoggerOptions {
  enabled?: boolean;
  level?: string;
}

export type LoggerType = PinoLogger<never, boolean>;

/**
 * @param {LoggerOptions} options - Options for the logger.
 * @param {boolean} [options.enabled] - Whether the logger is enabled or not (default is true).
 * @param {string} [options.level] - The logging level.
 * possible values: 'fatal', 'error', 'warn', 'info', 'debug', 'trace'.
 * (default is 'info')
 * @returns {LoggerType} - A pino logger instance.
 */
export function Logger(options: LoggerOptions): LoggerType {
  const { enabled = true, level = "info" } = options;

  if (!shouldEnableLogger(enabled, level)) {
    return pino({ level: "silent" });
  }

  return pino({ level: level || "info" });
}

function shouldEnableLogger(
  enabled: boolean | undefined,
  level: string | undefined,
): boolean {
  return enabled !== false && level !== "silent";
}
