import test from "node:test";
import assert from "node:assert/strict";
import { buildResponse, buildOptions } from "./httpUtils.js";
import {
  HttpRequestMethod,
  HttpResponse,
  ResponseData,
} from "@fistware/http-core";

function MockResponse(jsonData: HttpResponse<ResponseData>) {
  async function json() {
    return await Promise.resolve(jsonData);
  }

  return {
    json,
    headers: new Headers(),
  } as Response;
}

function MockHeaders(init: object) {
  const map = new Map(Object.entries(init));

  function set(k: string, v: string) {
    map.set(k, v);
  }
  function get(k: string) {
    return map.get(k);
  }

  function forEach(cb: (v: string, k: string) => void) {
    map.forEach((v, k) => cb(v, k));
  }

  function entries() {
    return map.entries();
  }

  return {
    set,
    get,
    forEach,
    entries,
  } as Headers;
}

test("buildResponse returns correct HttpResponse", () => {
  return (async () => {
    const origNow = Date.now;
    Date.now = () => 1_700_000_000_000;
    try {
      const mockData: HttpResponse<ResponseData> = {
        data: { foo: "bar" },
        message: "ok",
        status: 200,
        requestId: "123",
        correlationId: "456",
        timestamp: 1234567890,
      };
      const response = MockResponse(mockData);
      const result = await buildResponse(response);

      assert.equal(result.data, mockData.data);
      assert.equal(result.message, mockData.message);
      assert.equal(result.status, mockData.status);

      assert.ok(result.headers);
      assert.equal(result.requestId, "123");
      assert.equal(result.correlationId, "456");
      assert.equal(result.timestamp, 1_700_000_000);
    } finally {
      Date.now = origNow;
    }
  })();
});

test("buildOptions copies headers, sets method, and assigns stable request id", () => {
  const origUuid = globalThis.crypto.randomUUID.bind(globalThis.crypto);
  let call = 0;
  globalThis.crypto.randomUUID = () => {
    call += 1;
    return call === 1
      ? "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa"
      : "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb";
  };
  try {
    const headers = MockHeaders({
      "X-Test": "abc",
      Authorization: "Bearer token",
    });
    const method = HttpRequestMethod.POST;
    const options = buildOptions(headers, method);
    assert.equal(options.method, method);
    assert.equal(options.headers.get("X-Test"), "abc");
    assert.equal(options.headers.get("Authorization"), "Bearer token");
    assert.equal(
      options.headers.get("x-request-id"),
      "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
    );
    assert.equal(
      options.headers.get("x-correlation-id"),
      "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb",
    );
    assert.equal(call, 2);
  } finally {
    globalThis.crypto.randomUUID = origUuid;
  }
});

test("buildOptions preserves existing x-correlation-id", () => {
  const origUuid = globalThis.crypto.randomUUID.bind(globalThis.crypto);
  let call = 0;
  globalThis.crypto.randomUUID = () => {
    call += 1;
    return "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa";
  };
  try {
    const headers = MockHeaders({
      "x-correlation-id": "preset-correlation",
    });
    const options = buildOptions(headers, HttpRequestMethod.GET);
    assert.equal(
      options.headers.get("x-request-id"),
      "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
    );
    assert.equal(options.headers.get("x-correlation-id"), "preset-correlation");
    assert.equal(call, 1);
  } finally {
    globalThis.crypto.randomUUID = origUuid;
  }
});
