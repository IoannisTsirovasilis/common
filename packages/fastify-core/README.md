# @fistware/fastify-core

A core package for building high-performance, extensible Fastify applications.

## Features

- Lightweight and fast
- Modular architecture
- TypeScript support
- Easy plugin integration

## Installation

```bash
npm install @fistware/fastify-core
```

## Usage

### handleApiRequest
```ts
import { handleApiRequest } from "@fistware/fastify-core";
import Joi from "joi";

// Define your request schema using Joi
const userSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

// Define your action handler
async function createUser(fields: { username: string; password: string }) {
  // Your logic to create a user
  return { userId: "123" };
}

// Register the route in Fastify
fastify.post(
  "/users",
  handleApiRequest({
    schema: userSchema,
    action: createUser,
    transformResponse: (data) => ({ ...data }),
    // Optionally add handleAuth if needed
  })
);
```

The response sent to the client will be in the following format:

```json
{
  "status": 200,
  "data": {
    "userId": "123"
  },
  "message": ""
}
```

### `HandleApiRequestOptions` Type

Defines the options for configuring `handleApiRequest`:

| Option            | Type                                                      | Description                                                                                   |
|-------------------|-----------------------------------------------------------|-----------------------------------------------------------------------------------------------|
| `action`          | `(fields: P) => Promise<any>`                             | The main handler function that processes the request payload and returns a promise.            |
| `schema`          | `Joi.Schema` _(optional)_                                 | Joi schema for validating the request payload.                                                |
| `transformResponse` | `(data: any) => M \| M[]`                               | Function to transform the result of the action into the desired response format.               |
| `handleAuth`      | `(req: FastifyRequest) => Promise<void>` _(optional)_     | Optional authentication handler that processes the request before the main action.             |

Where:
- `P` extends `HttpPayload` (the request payload type)
- `M` extends `ResponseData` (the response data type)

## Default CORS Headers

The package exports a constant `HEADERS` for setting default CORS headers:

```ts
export const HEADERS = Object.freeze({
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
});
```

You can use `HEADERS` to quickly configure CORS in your Fastify routes or plugins.

## Response Utilities

The package provides utility functions for sending standardized API responses and handling errors:

```ts
import {
  sendResponse,
  sendErrorResponse,
} from "@fistware/fastify-core";

// Usage in a Fastify route handler
fastify.post("/example", async (request, reply) => {
  try {
    const result = await someAsyncAction();
    return sendResponse({
      reply,
      data: result,
      transformResponse: (data) => data,
    });
  } catch (error) {
    return sendErrorResponse(error, reply);
  }
});
```

- `sendResponse` sends a successful response with the default structure and CORS headers.
- `sendErrorResponse` handles errors and sends a standardized error response.

These utilities ensure consistent API responses across your Fastify application.

## Logger Utility

The package also provides a logger utility, powered by @fistware/logger, for consistent logging:

```ts
import { Logger } from "@fistware/logger";

export const logger = Logger({
  level: String(process.env.LOG_LEVEL || "info"),
  enabled: process.env.LOG_ENABLED === "true",
});
```

You can configure the log level and enable/disable logging using environment variables:

- `LOG_LEVEL` (default: `"info"`)
- `LOG_ENABLED` (default: `false`)

This helps manage logging behavior across different environments.

## Related Packages

- @fistware/http-core – Core utilities for building HTTP APIs with a consistent response structure.

## Documentation

See the [Fastify documentation](https://fastify.dev/docs/latest/) for more details.

## License

UNLICENSED