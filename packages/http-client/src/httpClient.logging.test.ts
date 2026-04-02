import test from "node:test";
import assert from "node:assert/strict";
import { PassThrough } from "node:stream";
import type { DestinationStream } from "@fistware/logger";
import { HttpClient } from "./httpClient.js";

const baseUrl = "https://api.example.test";

function jsonEnvelope(data: unknown) {
  return Response.json({
    data,
    message: "ok",
    status: 200,
    requestId: "resp-req",
    correlationId: "resp-cor",
  });
}

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

function parseLogLines(chunks: string[]): Record<string, unknown>[] {
  return chunks
    .join("")
    .trim()
    .split("\n")
    .filter(Boolean)
    .map((line) => JSON.parse(line) as Record<string, unknown>);
}

function setupFetchMock(
  impl: (url: RequestInfo | URL, init?: RequestInit) => Promise<Response>,
): { restore: () => void } {
  const origFetch = globalThis.fetch;
  const origRandomUUID = globalThis.crypto.randomUUID.bind(globalThis.crypto);
  globalThis.crypto.randomUUID = () => "00000000-0000-4000-8000-000000000001";
  globalThis.fetch = impl as typeof fetch;
  return {
    restore: () => {
      globalThis.fetch = origFetch;
      globalThis.crypto.randomUUID = origRandomUUID;
    },
  };
}

async function withRestoredFetch(
  impl: (url: RequestInfo | URL, init?: RequestInit) => Promise<Response>,
  run: () => Promise<void>,
): Promise<void> {
  const mock = setupFetchMock(impl);
  try {
    await run();
  } finally {
    mock.restore();
  }
}

function createLogCaptureStream(): {
  stream: PassThrough;
  chunks: string[];
} {
  const stream = new PassThrough();
  const chunks: string[] = [];
  stream.on("data", (c: Buffer) => chunks.push(c.toString()));
  return { stream, chunks };
}

function assertRedactedRequestAndResponseLogs(chunks: string[]): void {
  const parsedLines = parseLogLines(chunks);
  assert.equal(parsedLines.length, 2);
  const requestLog = parsedLines[0] as {
    request: { headers: Record<string, string> };
  };
  assert.equal(requestLog.request.headers.authorization, "[Redacted]");
  const responseLog = parsedLines[1] as {
    response: { data: { token: string } };
  };
  assert.equal(responseLog.response.data.token, "[Redacted]");
}

function assertVisibleAuthorizationInFirstLog(chunks: string[]): void {
  const parsedLines = parseLogLines(chunks);
  const requestLog = parsedLines[0] as {
    request: { headers: Record<string, string> };
  };
  assert.equal(
    requestLog.request.headers.authorization,
    "Bearer visible-token",
  );
}

async function runRedactedLoggingTest(): Promise<void> {
  const prevRedact = process.env.LOG_REDACT;
  const prevRaw = process.env.LOG_ALLOW_RAW_LOGS;
  try {
    delete process.env.LOG_REDACT;
    delete process.env.LOG_ALLOW_RAW_LOGS;
    const { stream, chunks } = createLogCaptureStream();
    await withRestoredFetch(
      () => Promise.resolve(jsonEnvelope({ token: "response-secret" })),
      async () => {
        const client = HttpClient({
          baseUrl,
          logging: true,
          logDestination: stream as DestinationStream,
        });
        const headers = new Headers();
        headers.set("authorization", "Bearer super-secret");
        await client.get("/r", { payload: {}, headers });
        await new Promise<void>((r) => setImmediate(r));
        assertRedactedRequestAndResponseLogs(chunks);
      },
    );
  } finally {
    restoreLogRedactEnv(prevRedact, prevRaw);
  }
}

test("logging redacts Authorization header and nested tokens when redaction is enabled", () =>
  runRedactedLoggingTest());

async function runRawAuthorizationLoggingTest(): Promise<void> {
  const prevRedact = process.env.LOG_REDACT;
  const prevRaw = process.env.LOG_ALLOW_RAW_LOGS;
  try {
    delete process.env.LOG_ALLOW_RAW_LOGS;
    process.env.LOG_REDACT = "false";
    const { stream, chunks } = createLogCaptureStream();
    await withRestoredFetch(
      () => Promise.resolve(jsonEnvelope({ ok: true })),
      async () => {
        const client = HttpClient({
          baseUrl,
          logging: true,
          logDestination: stream as DestinationStream,
        });
        const headers = new Headers();
        headers.set("authorization", "Bearer visible-token");
        await client.get("/r", { payload: {}, headers });
        await new Promise<void>((r) => setImmediate(r));
        assertVisibleAuthorizationInFirstLog(chunks);
      },
    );
  } finally {
    restoreLogRedactEnv(prevRedact, prevRaw);
  }
}

test("logging keeps Authorization header when redaction is disabled via env", () =>
  runRawAuthorizationLoggingTest());

async function runPiiPayloadRedactionTest(): Promise<void> {
  const prevRedact = process.env.LOG_REDACT;
  const prevRaw = process.env.LOG_ALLOW_RAW_LOGS;
  try {
    delete process.env.LOG_REDACT;
    delete process.env.LOG_ALLOW_RAW_LOGS;
    const { stream, chunks } = createLogCaptureStream();
    await withRestoredFetch(
      () => Promise.resolve(jsonEnvelope(null)),
      async () => {
        const client = HttpClient({
          baseUrl,
          logging: true,
          logDestination: stream as DestinationStream,
        });
        await client.post("/p", {
          payload: {
            contact: { email: "leak@example.com", ref: "visible-ref" },
          },
        });
        await new Promise<void>((r) => setImmediate(r));
        const requestLog = parseLogLines(chunks)[0] as {
          request: {
            payload: { contact: { email: string; ref: string } };
          };
        };
        assert.equal(requestLog.request.payload.contact.email, "[Redacted]");
        assert.equal(requestLog.request.payload.contact.ref, "visible-ref");
      },
    );
  } finally {
    restoreLogRedactEnv(prevRedact, prevRaw);
  }
}

test("logging redacts PII fields in request payload when redaction is enabled", () =>
  runPiiPayloadRedactionTest());
