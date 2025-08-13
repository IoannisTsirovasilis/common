# http-core

A core HTTP utility package

## Features

- HTTP request and response interfaces
- HttpError interfaces
- Mandatory request tracing with requestId, correlationId, and timestamp

## Installation

```bash
npm install @fistware/http-core
```

## Content

### Interfaces

- `HttpRequest`: Interface for HTTP request objects.
- `HttpPayload` : Body of HttpRequest.
- `HttpResponse`: Interface for HTTP response objects with mandatory tracing fields.
- `HttpError`: Interface for HTTP error handling.
- `HttpErrorOptions`: Interface for HttpError tracing options.
- `ResponseData` : Response date of HttpResponse.

### Enums

- `HttpRequestMethod`: Contains HTTP Methods
- `ResponseCode`: Contains HTTP Status codes

### Errors

- `HttpError`: Base class for HTTP errors with optional tracing support
  - Supports `requestId` and `correlationId` for better logging and tracing
  - Includes `toStructuredError()` method for structured logging
- `BadRequestError`: Class that represents bad request error
- `UnauthorizedError`: Class that represents unauthorized error
- `EntityNotFoundError`: Class that represents not found error

## Usage

### HttpResponse with Mandatory Tracing Fields

Starting from version 3.0.0, the `HttpResponse` interface requires mandatory tracing fields:

```typescript
import { HttpResponse, ResponseCode } from '@fistware/http-core';

// Creating an HttpResponse with all required fields
const response: HttpResponse<{ user: string }> = {
  headers: new Headers({ 'Content-Type': 'application/json' }),
  data: { user: 'john_doe' },
  message: 'User retrieved successfully',
  status: ResponseCode.OK,
  requestId: '46933179-08dd-42c8-a3ee-a588f4cc5f23',           // Required: Unique request identifier
  correlationId: '9f873aad-0319-4af0-bc36-178716595bde',      // Required: Correlation ID for tracing
  timestamp: 1755105187             // Required: Response timestamp
};
```

### HttpError with Tracing

The `HttpError` class now supports optional `requestId` and `correlationId` parameters for better logging and tracing:

```typescript
import { HttpError, HttpErrorOptions, ResponseCode } from '@fistware/http-core';

// Basic usage (backward compatible)
const basicError = new HttpError("Something went wrong", ResponseCode.InternalServerError);

// With tracing information using options object
const tracedError = new HttpError(
  "User not found",
  ResponseCode.NotFound,
  {
    requestId: "req-12345",
    correlationId: "corr-67890"
  }
);

// Getting structured error for logging
const structuredError = tracedError.toStructuredError();
console.log("Structured error:", structuredError);
// Output: {
//   message: "User not found",
//   status: 404,
//   requestId: "req-12345",
//   correlationId: "corr-67890",
//   timestamp: "2024-01-01T12:00:00.000Z"
// }
```

## Migration Guide

### From v2.x to v3.0.0

The main breaking change in version 3.0.0 is the addition of mandatory fields to the `HttpResponse` interface:

**Before (v2.x):**
```typescript
const response: HttpResponse<{ user: string }> = {
  data: { user: 'john_doe' },
  message: 'User retrieved successfully',
  status: ResponseCode.OK
  // requestId, correlationId, and timestamp were optional
};
```

**After (v3.0.0):**
```typescript
const response: HttpResponse<{ user: string }> = {
  data: { user: 'john_doe' },
  message: 'User retrieved successfully',
  status: ResponseCode.OK,
  requestId: '46933179-08dd-42c8-a3ee-a588f4cc5f23',           // Now required
  correlationId: '9f873aad-0319-4af0-bc36-178716595bde',      // Now required
  timestamp: 1755105187             // Now required
};
```

## Development

### Build
```bash
npm run build
```

### Lint
```bash
npm run lint
```

### Empty dist Folder
```bash
npm run clean
```

## License

UNLICENSED