import test from "node:test";
import assert from "node:assert/strict";
import { DEFAULT_REDACT_CENSOR } from "./logger.js";
import { redactSensitiveObject } from "./redactSensitiveObject.js";

test("redactSensitiveObject leaves values when disabled", () => {
  const input = { email: "a@b.com" };
  const out = redactSensitiveObject(input, DEFAULT_REDACT_CENSOR, false);
  assert.strictEqual(out, input);
});

test("redactSensitiveObject censors nested PII keys when enabled", () => {
  const input = {
    contact: { email: "a@b.com", ref: "keep" },
    list: [{ phone: "+1" }, { ok: true }],
  };
  const out = redactSensitiveObject(
    input,
    DEFAULT_REDACT_CENSOR,
    true,
  ) as typeof input;
  assert.strictEqual(out.contact.email, DEFAULT_REDACT_CENSOR);
  assert.strictEqual(out.contact.ref, "keep");
  assert.strictEqual(out.list[0].phone, DEFAULT_REDACT_CENSOR);
  assert.strictEqual(out.list[1].ok, true);
});

test("redactSensitiveObject censors confirmPassword and confirm_password", () => {
  const out = redactSensitiveObject(
    {
      confirmPassword: "x",
      confirm_password: "y",
      other: "keep",
    },
    DEFAULT_REDACT_CENSOR,
    true,
  ) as Record<string, string>;
  assert.strictEqual(out.confirmPassword, DEFAULT_REDACT_CENSOR);
  assert.strictEqual(out.confirm_password, DEFAULT_REDACT_CENSOR);
  assert.strictEqual(out.other, "keep");
});

test("redactSensitiveObject preserves Date values", () => {
  const d = new Date("2020-01-01T00:00:00.000Z");
  const out = redactSensitiveObject(
    { at: d, email: "x@y.z" },
    DEFAULT_REDACT_CENSOR,
    true,
  ) as { at: Date; email: string };
  assert.strictEqual(out.at.getTime(), d.getTime());
  assert.strictEqual(out.email, DEFAULT_REDACT_CENSOR);
});
