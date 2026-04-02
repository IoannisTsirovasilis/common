import test from "node:test";
import assert from "node:assert/strict";
import { PassThrough } from "node:stream";
import type { DestinationStream } from "pino";
import {
  Logger,
  DEFAULT_REDACT_CENSOR,
  isLogRedactionEnabled,
} from "./logger.js";

function restoreLogRedactEnv(
  prevRedact: string | undefined,
  prevRaw: string | undefined,
): void {
  if (prevRedact === undefined) {
    delete process.env.LOG_REDACT;
  } else {
    process.env.LOG_REDACT = prevRedact;
  }
  if (prevRaw === undefined) {
    delete process.env.LOG_ALLOW_RAW_LOGS;
  } else {
    process.env.LOG_ALLOW_RAW_LOGS = prevRaw;
  }
}

test("Logger returns a pino logger instance", () => {
  const logger = Logger({});
  assert(logger);
  assert.strictEqual(typeof logger.info, "function");
});

test("Logger disables logging when enabled is false", () => {
  const logger = Logger({ enabled: false });
  assert.strictEqual(logger.level, "silent");
});

test("Logger sets custom level", () => {
  const logger = Logger({ level: "debug" });
  assert.strictEqual(logger.level, "debug");
});

test("Logger defaults to info level", () => {
  const logger = Logger({});
  assert.strictEqual(logger.level, "info");
});

test("Logger disables logging when level is 'silent'", () => {
  const logger = Logger({ level: "silent" });
  assert.strictEqual(logger.level, "silent");
});

test("isLogRedactionEnabled is true by default", () => {
  const prevRedact = process.env.LOG_REDACT;
  const prevRaw = process.env.LOG_ALLOW_RAW_LOGS;
  try {
    delete process.env.LOG_REDACT;
    delete process.env.LOG_ALLOW_RAW_LOGS;
    assert.strictEqual(isLogRedactionEnabled(), true);
  } finally {
    restoreLogRedactEnv(prevRedact, prevRaw);
  }
});

test("isLogRedactionEnabled is false when LOG_REDACT is false", () => {
  const prevRedact = process.env.LOG_REDACT;
  const prevRaw = process.env.LOG_ALLOW_RAW_LOGS;
  try {
    delete process.env.LOG_ALLOW_RAW_LOGS;
    process.env.LOG_REDACT = "false";
    assert.strictEqual(isLogRedactionEnabled(), false);
  } finally {
    restoreLogRedactEnv(prevRedact, prevRaw);
  }
});

test("isLogRedactionEnabled is false when LOG_ALLOW_RAW_LOGS is true", () => {
  const prevRedact = process.env.LOG_REDACT;
  const prevRaw = process.env.LOG_ALLOW_RAW_LOGS;
  try {
    delete process.env.LOG_REDACT;
    process.env.LOG_ALLOW_RAW_LOGS = "true";
    assert.strictEqual(isLogRedactionEnabled(), false);
  } finally {
    restoreLogRedactEnv(prevRedact, prevRaw);
  }
});

test("redacts sensitive nested keys when redaction is enabled", async () => {
  const prevRedact = process.env.LOG_REDACT;
  const prevRaw = process.env.LOG_ALLOW_RAW_LOGS;
  try {
    delete process.env.LOG_REDACT;
    delete process.env.LOG_ALLOW_RAW_LOGS;

    const stream = new PassThrough();
    const lines: string[] = [];
    stream.on("data", (c: Buffer) => lines.push(c.toString()));

    const logger = Logger({ destination: stream as DestinationStream });
    logger.info({ nested: { password: "secret-value" } });
    await new Promise<void>((resolve) => setImmediate(resolve));

    const parsed = JSON.parse(lines.join("").trim());
    assert.strictEqual(parsed.nested.password, DEFAULT_REDACT_CENSOR);
  } finally {
    restoreLogRedactEnv(prevRedact, prevRaw);
  }
});

test("does not redact when LOG_REDACT is false", async () => {
  const prevRedact = process.env.LOG_REDACT;
  const prevRaw = process.env.LOG_ALLOW_RAW_LOGS;
  try {
    delete process.env.LOG_ALLOW_RAW_LOGS;
    process.env.LOG_REDACT = "false";

    const stream = new PassThrough();
    const lines: string[] = [];
    stream.on("data", (c: Buffer) => lines.push(c.toString()));

    const logger = Logger({ destination: stream as DestinationStream });
    logger.info({ nested: { password: "secret-value" } });
    await new Promise<void>((resolve) => setImmediate(resolve));

    const parsed = JSON.parse(lines.join("").trim());
    assert.strictEqual(parsed.nested.password, "secret-value");
  } finally {
    restoreLogRedactEnv(prevRedact, prevRaw);
  }
});

test("merges custom redactPaths", async () => {
  const prevRedact = process.env.LOG_REDACT;
  const prevRaw = process.env.LOG_ALLOW_RAW_LOGS;
  try {
    delete process.env.LOG_REDACT;
    delete process.env.LOG_ALLOW_RAW_LOGS;

    const stream = new PassThrough();
    const lines: string[] = [];
    stream.on("data", (c: Buffer) => lines.push(c.toString()));

    const logger = Logger({
      destination: stream as DestinationStream,
      redactPaths: ["customSecret", "*.customSecret"],
    });
    logger.info({ customSecret: "hide-me" });
    await new Promise<void>((resolve) => setImmediate(resolve));

    const parsed = JSON.parse(lines.join("").trim());
    assert.strictEqual(parsed.customSecret, DEFAULT_REDACT_CENSOR);
  } finally {
    restoreLogRedactEnv(prevRedact, prevRaw);
  }
});
