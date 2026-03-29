import test from "node:test";
import assert from "node:assert/strict";
import { ResponseCode } from "../enums/ResponseCode.js";
import { HttpError } from "./HttpError.js";
import { BadRequestError } from "./BadRequestError.js";
import { EntityNotFoundError } from "./EntityNotFoundError.js";
import { UnauthorizedError } from "./UnauthorizedError.js";

test("HttpError sets message, status, name, and optional tracing fields", () => {
  const err = new HttpError("nope", ResponseCode.BadRequest, {
    requestId: "req-1",
    correlationId: "cor-1",
  });
  assert.equal(err.name, "HttpError");
  assert.equal(err.message, "nope");
  assert.equal(err.status, ResponseCode.BadRequest);
  assert.equal(err.requestId, "req-1");
  assert.equal(err.correlationId, "cor-1");
});

test("HttpError omits requestId and correlationId when not provided", () => {
  const err = new HttpError("x", ResponseCode.InternalServerError);
  assert.equal(err.requestId, undefined);
  assert.equal(err.correlationId, undefined);
});

test("HttpError.toStructuredError returns core fields and ISO timestamp", () => {
  const err = new HttpError("bad", ResponseCode.UnprocessableEntity, {
    requestId: "r",
    correlationId: "c",
  });
  const s = err.toStructuredError();
  assert.equal(s.message, "bad");
  assert.equal(s.status, ResponseCode.UnprocessableEntity);
  assert.equal(s.requestId, "r");
  assert.equal(s.correlationId, "c");
  assert.match(s.timestamp, /^\d{4}-\d{2}-\d{2}T/);
});

test("BadRequestError extends HttpError with correct name and status", () => {
  const err = new BadRequestError("invalid");
  assert.ok(err instanceof HttpError);
  assert.equal(err.name, "BadRequestError");
  assert.equal(err.status, ResponseCode.BadRequest);
  assert.equal(err.message, "invalid");
});

test("EntityNotFoundError extends HttpError with correct name and status", () => {
  const err = new EntityNotFoundError("missing");
  assert.ok(err instanceof HttpError);
  assert.equal(err.name, "EntityNotFoundError");
  assert.equal(err.status, ResponseCode.NotFound);
});

test("UnauthorizedError extends HttpError with fixed message and status", () => {
  const err = new UnauthorizedError();
  assert.ok(err instanceof HttpError);
  assert.equal(err.name, "UnauthorizedError");
  assert.equal(err.status, ResponseCode.Unauthorized);
  assert.equal(err.message, "User is not authorized");
});
