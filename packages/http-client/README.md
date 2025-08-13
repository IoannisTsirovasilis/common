# HTTP Client

An HTTP client library for Fistware applications.

## Features

- **Full HTTP Method Support**: GET, POST, PUT, DELETE, PATCH
- **Type-Safe Operations**: Complete TypeScript support with generic types
- **Customizable Headers**: Flexible header management with automatic request/correlation ID handling
- **JSON Request/Response**: Automatic JSON serialization and deserialization
- **Integrated Logging**: Built-in logging with `@fistware/logger` integration
- **Error Handling**: Comprehensive error handling with structured responses
- **Request Tracing**: Automatic request ID and correlation ID generation
- **Modern Architecture**: ES modules with Node.js 22+ support

## Installation

```bash
npm install @fistware/http-client
```

## Quick Start

```typescript
import { HttpClient } from "@fistware/http-client";

const httpClient = HttpClient({
  baseUrl: "https://api.example.com",
  logging: true,
  loggingLevel: "info"
});

// Make a GET request
const response = await httpClient.get("/users", {
  headers: new Headers({ "Authorization": "Bearer token" }),
  payload: {}
});
```

## Usage

### Basic Configuration

```typescript
import { HttpClient } from "@fistware/http-client";

const httpClient = HttpClient({
  baseUrl: "https://api.example.com",
  logging: true,        // Enable request/response logging
  loggingLevel: "info"  // Set logging level
});
```

### Making Requests

```typescript
// GET request
const getResponse = await httpClient.get("/users", {
  headers: new Headers(),
  payload: {}
});

// POST request with payload
const postResponse = await httpClient.post("/users", {
  headers: new Headers({ "Content-Type": "application/json" }),
  payload: { name: "John Doe", email: "john@example.com" }
});

// PUT request
const putResponse = await httpClient.put("/users/123", {
  headers: new Headers(),
  payload: { name: "Jane Doe" }
});

// PATCH request
const patchResponse = await httpClient.patch("/users/123", {
  headers: new Headers(),
  payload: { email: "jane@example.com" }
});

// DELETE request
const deleteResponse = await httpClient.delete("/users/123", {
  headers: new Headers(),
  payload: {}
});
```

### Type-Safe Requests

```typescript
interface UserPayload {
  name: string;
  email: string;
}

interface UserResponse {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

// Type-safe POST request
const user = await httpClient.post<UserPayload, HttpRequest<UserPayload>, UserResponse>(
  "/users",
  {
    headers: new Headers(),
    payload: { name: "John Doe", email: "john@example.com" }
  }
);

console.log(user.data.id); // TypeScript knows this is a string
```

### HttpClientOptions

```typescript
/**
 * Configuration options for creating an HTTP client instance.
 *
 * @property baseUrl - The base URL to prefix all request URLs.
 * @property logging - Optional. Enables or disables logging of HTTP requests and responses. Defaults to `true`.
 * @property loggingLevel - Optional. Specifies the logging level (e.g., 'info', 'debug'). Defaults to 'info'.
 */
interface HttpClientOptions {
  baseUrl: string;
  logging?: boolean;
  loggingLevel?: string;
}
```

### HttpClient

```typescript
/**
 * Creates an HTTP client instance with predefined configuration options.
 *
 * The returned client provides methods for making HTTP requests (`get`, `post`, `put`, `delete`, `patch`)
 * to a specified base URL. Each method is generic and supports typed payloads and responses.
 * Logging can be enabled and configured via the options.
 *
 * @param options - Configuration options for the HTTP client.
 * @param options.baseUrl - The base URL to prefix all request URLs.
 * @param options.logging - Optional. Enables or disables logging of requests and responses.
 * @param options.loggingLevel - Optional. Specifies the logging level (e.g., 'info', 'debug').
 *
 * @returns An object with `get`, `post`, `put`, `delete` and `patch` methods for making HTTP requests.
 *
 * @template P - The type of the request payload.
 * @template Rq - The type of the HTTP request object.
 * @template M - The type of the response data.
 *
 * @example
 * ```typescript
 * const client = HttpClient({ baseUrl: 'https://api.example.com', logging: true });
 * const response = await client.get<MyPayload, MyRequest, MyResponse>('/endpoint', myRequest);
 * ```
 */
function HttpClient(options: HttpClientOptions)
```

## Advanced Features

### Automatic Request Tracing

The HTTP client automatically generates and includes request IDs and correlation IDs in all requests:

```typescript
// Request headers are automatically enhanced with:
// - x-request-id: Unique identifier for each request
// - x-correlation-id: Correlation ID for request tracing
```

### Structured Logging

All requests and responses are logged with structured data:

```typescript
// Request logging includes:
// - URL, method, headers, payload
// - Request ID and correlation ID

// Response logging includes:
// - Status, headers, response data
// - Request ID and correlation ID
```

### Error Handling

The client provides comprehensive error handling with structured error responses:

```typescript
try {
  const response = await httpClient.get("/users", request);
} catch (error) {
  // Error includes structured information:
  // - HTTP status code
  // - Error message
  // - Request ID and correlation ID
  // - Timestamp
}
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

### Clean
```bash
npm run clean
```

### Test
```bash
npm test
```

### Test Coverage
```bash
npm run test:coverage
```

## Requirements

- **Node.js**: >=22.0.0
- **TypeScript**: 5.9.2+
- **Package Manager**: npm

## Dependencies

- `@fistware/http-core`: Core HTTP interfaces and types
- `@fistware/logger`: Logging functionality
- `@fistware/utils`: Utility functions

## License

UNLICENSED