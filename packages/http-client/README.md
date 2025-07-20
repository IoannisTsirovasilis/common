# HTTP Client

An HTTP client library for Fistware applications.

## Features

- Supports GET, POST, PUT, DELETE, PATCH
- Customizable headers and query parameters
- Handles JSON request and response
- Easy to use and extend
- Integrated logging for requests and responses (you can use the @fistware/logger)

## Installation

```bash
npm install @fistware/http-client
```

## Usage

```js
import { HttpClient } from "@fistware/http-client";

const httpClient = HttpClient({
  baseUrl: "",
});
```

### HttpClientOptions
```ts
/**
 * Configuration options for creating an HTTP client instance.
 *
 * @property baseUrl - The base URL to prefix all request URLs.
 * @property logging - Optional. Enables or disables logging of HTTP requests and responses. Defaults to `true`.
 * @property loggingLevel - Optional. Specifies the logging level (e.g., 'info', 'debug'). Defaults to 'info'.
 */
interface HttpClientOptions
```

### HttpClient
```ts
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

### Test
```bash
npm test
```

### Test Coverage
```bash
npm run test:coverage
```

## License

UNLICENSED