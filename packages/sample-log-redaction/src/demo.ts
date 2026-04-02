/**
 * Prints Pino JSON lines to stdout. Human hints go to stderr.
 *
 * Usage:
 *   npm run demo        — redaction on (default)
 *   npm run demo:raw    — LOG_REDACT=off for this process
 */

import {
  Logger,
  redactSensitiveObject,
  DEFAULT_REDACT_CENSOR,
} from "@fistware/logger";
import { HttpClient } from "@fistware/http-client";
import pino from "pino";

const rawLogs = process.argv.includes("--raw");
if (rawLogs) {
  process.env.LOG_REDACT = "false";
}

/** Shared sync destination so demo sections stay in order on stdout. */
const syncStdout = pino.destination({ sync: true, fd: 1 });

function banner(title: string) {
  process.stderr.write(`\n=== ${title} ===\n`);
}

process.stderr.write(
  rawLogs
    ? "Mode: RAW (LOG_REDACT=false). Secrets and PII appear in stdout JSON.\n"
    : "Mode: REDACTED (default). Compare with: npm run demo:raw\n",
);
process.stderr.write(
  "Note: section banners go to stderr; Pino lines to stdout — they may interleave in the terminal.\n",
);

banner("1) Logger — nested PII and secrets");
const logger = Logger({ level: "info", destination: syncStdout });
logger.info({
  message: "signup attempt",
  user: { id: "usr_1", email: "alice@example.com" },
  token: "opaque-session-token",
  credentials: { password: "hunter2" },
});

banner("2) redactSensitiveObject — snapshot logged as structured field");
const profile = {
  contact: { email: "bob@example.com", ref: "ORDER-99" },
  apiKey: "sk_live_demo",
};
logger.info({
  section: 2,
  snapshot: redactSensitiveObject(profile, DEFAULT_REDACT_CENSOR, !rawLogs),
});

banner("3) HttpClient — Authorization header + payload + response body");
const origFetch = globalThis.fetch;
const origRandom = globalThis.crypto.randomUUID.bind(globalThis.crypto);
globalThis.crypto.randomUUID = () => "00000000-0000-4000-8000-000000000001";
globalThis.fetch = () =>
  Promise.resolve(
    new Response(
      JSON.stringify({
        data: { accessToken: "at-secret", orderRef: "visible-ref" },
        message: "ok",
        status: 200,
        requestId: "resp-req",
        correlationId: "resp-cor",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    ),
  );

try {
  const client = HttpClient({
    baseUrl: "https://api.example.test",
    logging: true,
    logDestination: syncStdout,
  });
  const headers = new Headers();
  headers.set("Authorization", "Bearer bearer-secret");
  await client.post("/oauth/token", {
    payload: {
      email: "client@example.com",
      password: "not-for-logs",
      client_id: "app",
    },
    headers,
  });
} finally {
  globalThis.fetch = origFetch;
  globalThis.crypto.randomUUID = origRandom;
}

process.stderr.write("\nDone. Parse stdout lines as JSON (e.g. pipe to jq).\n");
