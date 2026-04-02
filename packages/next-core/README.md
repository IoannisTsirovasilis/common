# @fistware/next-core

A utility package offering core API request handling, response formatting, CORS headers, and logging utilities for building robust Next.js applications.

## Features

- **Unified API request handler** for Next.js routes with built-in validation and error handling.
- **Schema-based validation** using Joi for robust payload checking.
- **Customizable response transformation** to shape API responses as needed.
- **Optional authentication hook** for secure endpoints.
- **Standardized CORS headers** for cross-origin compatibility.
- **Consistent response utilities** for success and error handling.
- **Integrated logging utility** for structured and configurable logs.

## Installation

```bash
npm install @fistware/next-core
```

## Usage

### handleApiRequest
```ts
import { handleApiRequest, HttpRequest } from "@fistware/next-core";

export const POST = handleApiRequest({
  action: async (req: HttpRequest<any>) => {
  return { message: "Authenticated!" };
  },
});
```
    
#### Example: With Authentication

```ts
import { handleApiRequest } from "@fistware/next-core";
import Joi from "joi";

const authHandler = async (headers) => {
  const token = headers.get("authorization");
  if (!token || token !== "Bearer my-secret-token") {
  throw new Error("Unauthorized");
  }
};

export const GET = handleApiRequest({
  handleAuth: authHandler,
  action: async (req: HttpRequest<any>) => {
  return { message: "Authenticated!" };
  },
});
```

#### Example: With transformResponse

```ts
import { handleApiRequest } from "@fistware/next-core";

export const POST = handleApiRequest({
  action: async (req: HttpRequest<any>) => {
  return { id: 1, name: "Alice" };
  },
  transformResponse: (data) => ({
  user: {
    userId: data.id,
    username: data.name,
  },
  }),
});
```

#### Example: With schema validation

```ts
import { handleApiRequest } from "@fistware/next-core";
import Joi from "joi";

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

export const POST = handleApiRequest({
  schema,
  action: async ({ email }) => {
  return { userId: "abc123", email };
  },
});
```

#### Example: With paramsSchema

```ts
import { handleApiRequest } from "@fistware/next-core";
import Joi from "joi";

const paramsSchema = Joi.object({
  id: Joi.string().uuid().required(),
});

export const GET = handleApiRequest({
  paramsSchema,
  action: async (req: HttpRequest<any>) => {
  // req contains body and path params
  return { userId: req.id, name: "Bob" };
  },
});
```

The response sent to the client will be in the following format:

```json
{
  "status": 200,
  // data contains the result of transformResponse
  "data": {
    "userId": "123"
  },
  "message": ""
}
```

### `HandleApiRequestOptions` Type

The `HandleApiRequestOptions` type defines the configuration object accepted by `handleApiRequest`. It allows you to customize request validation, authentication, response transformation, and the main action handler.

```ts
/**
 * Options for handling an API request in a Next.js environment.
 *
 * @typeParam P - The type of the HTTP payload.
 * @typeParam R - The type of the HTTP request, extending `HttpRequest<P>`.
 * @typeParam M - The type of the response data.
 *
 * @property action - An asynchronous function that processes the request fields and returns a result.
 * @property schema - (Optional) A Joi schema used to validate the request payload.
 * @property transformResponse - (Optional) A function to transform the response data before sending it to the client.
 * @property handleAuth - (Optional) An asynchronous function to handle authentication logic using the incoming Next.js request.
 */
export interface HandleApiRequestOptions<
  P extends HttpPayload,
  R extends HttpRequest<P>,
  M extends ResponseData,
> {
  action: (fields: R) => Promise<any>;
  schema?: Joi.Schema;
  transformResponse?: (data: any) => M | M[];
  handleAuth?: (headers: Record<string, string>) => Promise<void>;
}
```

**Options:**

- `action`: Main async function to handle the request.
- `schema`: Joi schema for validating the request body (optional).
- `transformResponse`: Function to shape the API response (optional).
- `handleAuth`: Async function for authentication logic (optional).

## Logger Utility

The package exports a `logger` (Pino via `@fistware/logger`) for consistent structured logging.

Environment variables:

- `LOG_LEVEL` (default: `"info"`)
- `LOG_ENABLED` (default: logging off unless set to `"true"`)
- `LOG_REDACT_PATHS` (optional): comma-separated extra [Pino redact paths](https://github.com/pinojs/pino/blob/main/docs/redaction.md), merged with library defaults (e.g. `firstName,*.firstName,*.guestEmail`)

Optional app-specific redact paths (call once at startup, e.g. in Next.js `instrumentation.ts` before handling requests):

```ts
import { configureNextCoreLogger } from "@fistware/next-core";

configureNextCoreLogger({
  redactPaths: ["firstName", "*.firstName", "guestEmail", "*.request.body.guestEmail"],
});
```

Each call that passes `redactPaths` replaces the previous programmatic list (env `LOG_REDACT_PATHS` is still merged in). The exported `logger` object forwards to the underlying Pino instance so existing `import { logger } from "@fistware/next-core"` usage keeps working.

## Related Packages

- @fistware/http-core – Core utilities for building HTTP APIs with a consistent response structure.

## Development

### Build
```bash
npm run build
```

### Lint
```bash
npm run lint
```

## License

UNLICENSED
