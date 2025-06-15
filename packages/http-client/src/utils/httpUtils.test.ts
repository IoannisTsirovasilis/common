import test from "node:test";
import assert from "node:assert/strict";
import { buildResponse, buildOptions, maskSensitiveData } from "./httpUtils.js";
import { HttpRequestMethod, HttpResponse } from "@fistware/http-core";

function MockResponse(jsonData: HttpResponse<any>) {
  async function json() {
    return await Promise.resolve(jsonData);
  }

  return {
    json,
  } as Response;
}

function MockHeaders(init: object) {
  const map = new Map(Object.entries(init));

  function set(k: string, v: any) {
    map.set(k, v);
  }
  function get(k: string) {
    return map.get(k);
  }

  function forEach(cb: (v: any, k: string) => {}) {
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

test("buildResponse returns correct HttpResponse", async () => {
  const mockData: HttpResponse<any> = {
    data: { foo: "bar" },
    message: "ok",
    status: 200,
  };
  const response = MockResponse(mockData);
  const result = await buildResponse(response);
  assert.deepEqual(result, mockData);
});

test("buildOptions copies headers and sets method", () => {
  const headers = MockHeaders({
    "X-Test": "abc",
    Authorization: "Bearer token",
  });
  const method = HttpRequestMethod.POST;
  const options = buildOptions(headers, method);
  assert.equal(options.method, method);
  assert.equal(options.headers.get("X-Test"), "abc");
  assert.equal(options.headers.get("Authorization"), "Bearer token");
});

test("maskSensitiveData masks Authorization header", () => {
  const headers = MockHeaders({
    Authorization: "Bearer secret-token",
    "X-Test": "abc",
  });
  const masked = maskSensitiveData(headers);
  assert.equal(masked.Authorization, "Bearer");
  assert.equal(masked["X-Test"], "abc");
});

test("maskSensitiveData handles missing Authorization header", () => {
  const headers = MockHeaders({ "X-Test": "abc" });
  const masked = maskSensitiveData(headers);
  assert.equal(masked.Authorization, "undefined");
  assert.equal(masked["X-Test"], "abc");
});
