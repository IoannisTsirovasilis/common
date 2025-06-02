import pino, { Logger } from "pino";

export interface LoggerOptions {
  enabled?: boolean;
  level?: string;
}

/**
 * @param {LoggerOptions} options - Options for the logger.
 * @param {boolean} [options.enabled] - Whether the logger is enabled or not (default is true).
 * @param {string} [options.level] - The logging level.
 * possible values: 'fatal', 'error', 'warn', 'info', 'debug', 'trace'.
 * (default is 'info')
 * @returns {Logger<never, boolean>} - A pino logger instance.
 */
export function CreateLogger(options: LoggerOptions): Logger<never, boolean> {
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
