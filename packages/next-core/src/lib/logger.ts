import { HttpError, HttpResponse, ResponseData } from "@fistware/http-core";
import { Logger, type LoggerType } from "@fistware/logger";
import { NextRequest } from "next/server";
import { NextRequestParts } from "./interfaces/NextRequestParts.js";

/** Extra Pino redact paths from the app (via {@link configureNextCoreLogger}). */
let programmaticRedactPaths: string[] = [];

let cachedLogger: LoggerType | null = null;
let cachedConfigSignature = "";

function parseRedactPathsFromEnv(): string[] {
  const raw = process.env.LOG_REDACT_PATHS;
  if (!raw?.trim()) {
    return [];
  }
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function buildRedactPathsMerge(): string[] {
  return [...parseRedactPathsFromEnv(), ...programmaticRedactPaths];
}

function currentConfigSignature(): string {
  return `${process.env.LOG_ENABLED ?? ""}|${process.env.LOG_LEVEL ?? ""}|${process.env.LOG_REDACT_PATHS ?? ""}|${programmaticRedactPaths.join("\u0000")}`;
}

function createLoggerInstance(): LoggerType {
  return Logger({
    level: String(process.env.LOG_LEVEL || "info"),
    enabled: process.env.LOG_ENABLED === "true",
    redactPaths: buildRedactPathsMerge(),
  });
}

function getLoggerInstance(): LoggerType {
  const sig = currentConfigSignature();
  if (!cachedLogger || sig !== cachedConfigSignature) {
    cachedLogger = createLoggerInstance();
    cachedConfigSignature = sig;
  }
  return cachedLogger;
}

export type ConfigureNextCoreLoggerOptions = {
  /**
   * Merged with default redact paths from `@fistware/logger` and any
   * comma-separated entries in `LOG_REDACT_PATHS`. Use Pino path strings (e.g.
   * `firstName`, `*.firstName`, `request.body.guestEmail`).
   */
  redactPaths?: string[];
};

/**
 * Optional app-specific Pino redact paths. Call once at startup (e.g. `instrumentation.ts`)
 * before logging if you need paths beyond env `LOG_REDACT_PATHS`.
 * Passing `redactPaths` replaces the previous programmatic list (not appended across calls).
 */
export function configureNextCoreLogger(
  options: ConfigureNextCoreLoggerOptions,
): void {
  if (options.redactPaths !== undefined) {
    programmaticRedactPaths = [...options.redactPaths];
  }
  cachedLogger = null;
  cachedConfigSignature = "";
}

/**
 * Pino logger with next-core defaults plus env/programmatic {@link LoggerOptions.redactPaths}.
 * Access is lazy so {@link configureNextCoreLogger} can run before first use.
 */
export const logger = new Proxy({} as LoggerType, {
  get(_target, prop, receiver) {
    const instance = getLoggerInstance();
    const value = Reflect.get(instance, prop, receiver);
    if (typeof value === "function") {
      return value.bind(instance);
    }
    return value;
  },
});

export function logRequest(req: NextRequest, parts: NextRequestParts) {
  const { headers, body, query, params } = parts;

  getLoggerInstance().info({
    method: req.method,
    url: req.nextUrl,
    request: {
      headers,
      body,
      params,
      query,
    },
  });
}

export function logError(error: unknown, response: HttpResponse<{}>) {
  const log = getLoggerInstance();
  if (error instanceof HttpError) {
    // Use structured error logging for HttpError instances
    const structuredError = error.toStructuredError();
    log.error({
      error: { ...structuredError },
      stack: error.stack,
      status: error.status,
      response: {
        status: response.status,
        data: response.data,
        message: response.message,
      },
    });
  } else {
    // Fallback for other error types
    log.error({
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      status: response.status,
      response: {
        status: response.status,
        data: response.data,
        message: response.message,
      },
    });
  }
}

export function logResponse<M extends ResponseData>(
  response: HttpResponse<M | M[]>,
  req: NextRequest,
) {
  getLoggerInstance().info({
    response: {
      status: response.status,
      data: response.data,
      message: response.message,
    },
    method: req.method,
    url: req.url,
    status: response.status,
  });
}
