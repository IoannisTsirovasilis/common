# http-core

A core HTTP utility package

## Features

- HTTP request and response interfaces
- HttpError interfaces

## Installation

```bash
npm install @fistware/http-core
```

## Content

### Interfaces

- `HttpRequest`: Interface for HTTP request objects.
- `HttpPayload` : Body of HttpRequest.
- `HttpResponse`: Interface for HTTP response objects.
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