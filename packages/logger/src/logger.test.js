import test from "node:test";
import assert from "node:assert/strict";
import { Logger } from "./logger.ts";

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
