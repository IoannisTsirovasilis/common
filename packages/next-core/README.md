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

const authHandler = async (req) => {
  const token = req.headers.get("authorization");
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
import Joi from "joi";
import { HttpRequest } from "@fistware/next-core";

type HandleApiRequestOptions<P = any, M = any> = {
  /**
   * The main handler function that processes the request payload.
   */
  action: (fields: P, req: HttpRequest<P>) => Promise<M>;

  /**
   * Joi schema for validating the request payload (optional).
   */
  schema?: Joi.Schema;

  /**
   * Joi schema for validating route parameters (optional).
   */
  paramsSchema?: Joi.Schema;

  /**
   * Function to transform the result of the action into the desired response format (optional).
   */
  transformResponse?: (data: M) => any;

  /**
   * Optional authentication handler that processes the request before the main action.
   */
  handleAuth?: (req: HttpRequest<P>) => Promise<void>;
};
```

**Options:**

- `action`: Main async function to handle the request.
- `schema`: Joi schema for validating the request body (optional).
- `paramsSchema`: Joi schema for validating route parameters (optional).
- `transformResponse`: Function to shape the API response (optional).
- `handleAuth`: Async function for authentication logic (optional).

## Default CORS Headers

The package exports a constant `HEADERS` for setting default CORS headers:

```ts
export const HEADERS = Object.freeze({
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
});
```

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

## License

UNLICENSED