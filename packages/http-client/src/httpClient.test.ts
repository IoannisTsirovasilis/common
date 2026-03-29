/**
 * Sync tests return `(async () => { ... })()` so assertions run after `await` inside the IIFE.
 * Using `test("…", async () => …)` with ts-node/esm here led to spurious failures on this stack.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { HttpClient } from "./httpClient.js";
import {
  HttpRequestMethod,
  HttpResponse,
  ResponseData,
} from "@fistware/http-core";

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

test("GET uses full URL, GET method, and no body", () => {
  function assertResult(
    calls: Array<{ url: string; init?: RequestInit }>,
    result: HttpResponse<ResponseData>,
  ) {
    assert.equal(calls.length, 1);
    assert.equal(calls[0].url, `${baseUrl}/users`);
    assert.equal(calls[0].init?.method, HttpRequestMethod.GET);
    assert.equal(calls[0].init?.body, undefined);
    assert.equal((result.data as { id: string }).id, "1");
    assert.equal(result.message, "ok");
    assert.equal(result.status, 200);
    assert.ok(typeof result.timestamp === "number");
  }

  return (async () => {
    const calls: Array<{ url: string; init?: RequestInit }> = [];
    const origFetch = globalThis.fetch;
    const origRandomUUID = globalThis.crypto.randomUUID.bind(globalThis.crypto);
    globalThis.crypto.randomUUID = () => "00000000-0000-4000-8000-000000000001";
    globalThis.fetch = async (url, init) => {
      calls.push({ url: String(url), init });
      return await Promise.resolve(jsonEnvelope({ id: "1" }));
    };
    try {
      const client = HttpClient({ baseUrl, logging: false });
      const result = await client.get("/users", { payload: {} });

      assertResult(calls, result);
    } finally {
      globalThis.fetch = origFetch;
      globalThis.crypto.randomUUID = origRandomUUID;
    }
  })();
});

test("GET uses new Headers when request.headers is omitted", () => {
  return (async () => {
    const calls: Array<{ url: string; init?: RequestInit }> = [];
    const origFetch = globalThis.fetch;
    const origRandomUUID = globalThis.crypto.randomUUID.bind(globalThis.crypto);
    globalThis.crypto.randomUUID = () => "00000000-0000-4000-8000-000000000001";
    globalThis.fetch = async (url, init) => {
      calls.push({ url: String(url), init });
      return await Promise.resolve(jsonEnvelope({}));
    };
    try {
      const client = HttpClient({ baseUrl, logging: false });
      await client.get("/r", { payload: {} });

      const headers = calls[0].init?.headers as Headers;
      assert.ok(headers instanceof Headers);
      assert.equal(
        headers.get("x-request-id"),
        "00000000-0000-4000-8000-000000000001",
      );
    } finally {
      globalThis.fetch = origFetch;
      globalThis.crypto.randomUUID = origRandomUUID;
    }
  })();
});

test("POST sends JSON.stringify(payload) and POST method", () => {
  return (async () => {
    const calls: Array<{ url: string; init?: RequestInit }> = [];
    const origFetch = globalThis.fetch;
    const origRandomUUID = globalThis.crypto.randomUUID.bind(globalThis.crypto);
    globalThis.crypto.randomUUID = () => "00000000-0000-4000-8000-000000000001";
    globalThis.fetch = async (url, init) => {
      calls.push({ url: String(url), init });
      return await Promise.resolve(jsonEnvelope(null));
    };
    try {
      const client = HttpClient({ baseUrl, logging: false });
      const payload = { n: 42 };
      await client.post("/m/post", { payload });

      assert.equal(calls.length, 1);
      assert.equal(calls[0].url, `${baseUrl}/m/post`);
      assert.equal(calls[0].init?.method, "POST");
      assert.equal(calls[0].init?.body, JSON.stringify(payload));
    } finally {
      globalThis.fetch = origFetch;
      globalThis.crypto.randomUUID = origRandomUUID;
    }
  })();
});

test("PUT sends JSON body and PUT method", () => {
  return (async () => {
    const calls: Array<{ url: string; init?: RequestInit }> = [];
    const origFetch = globalThis.fetch;
    const origRandomUUID = globalThis.crypto.randomUUID.bind(globalThis.crypto);
    globalThis.crypto.randomUUID = () => "00000000-0000-4000-8000-000000000001";
    globalThis.fetch = async (url, init) => {
      calls.push({ url: String(url), init });
      return await Promise.resolve(jsonEnvelope(null));
    };
    try {
      const client = HttpClient({ baseUrl, logging: false });
      const payload = { n: 1 };
      await client.put("/x", { payload });
      assert.equal(calls[0].init?.method, "PUT");
      assert.equal(calls[0].init?.body, JSON.stringify(payload));
    } finally {
      globalThis.fetch = origFetch;
      globalThis.crypto.randomUUID = origRandomUUID;
    }
  })();
});

test("PATCH sends JSON body and PATCH method", () => {
  return (async () => {
    const calls: Array<{ url: string; init?: RequestInit }> = [];
    const origFetch = globalThis.fetch;
    const origRandomUUID = globalThis.crypto.randomUUID.bind(globalThis.crypto);
    globalThis.crypto.randomUUID = () => "00000000-0000-4000-8000-000000000001";
    globalThis.fetch = async (url, init) => {
      calls.push({ url: String(url), init });
      return await Promise.resolve(jsonEnvelope(null));
    };
    try {
      const client = HttpClient({ baseUrl, logging: false });
      const payload = { a: true };
      await client.patch("/x", { payload });
      assert.equal(calls[0].init?.method, "PATCH");
      assert.equal(calls[0].init?.body, JSON.stringify(payload));
    } finally {
      globalThis.fetch = origFetch;
      globalThis.crypto.randomUUID = origRandomUUID;
    }
  })();
});

test("DELETE sends JSON body and DELETE method", () => {
  return (async () => {
    const calls: Array<{ url: string; init?: RequestInit }> = [];
    const origFetch = globalThis.fetch;
    const origRandomUUID = globalThis.crypto.randomUUID.bind(globalThis.crypto);
    globalThis.crypto.randomUUID = () => "00000000-0000-4000-8000-000000000001";
    globalThis.fetch = async (url, init) => {
      calls.push({ url: String(url), init });
      return await Promise.resolve(jsonEnvelope(null));
    };
    try {
      const client = HttpClient({ baseUrl, logging: false });
      const payload = { id: "z" };
      await client.delete("/x", { payload });
      assert.equal(calls[0].init?.method, "DELETE");
      assert.equal(calls[0].init?.body, JSON.stringify(payload));
    } finally {
      globalThis.fetch = origFetch;
      globalThis.crypto.randomUUID = origRandomUUID;
    }
  })();
});
