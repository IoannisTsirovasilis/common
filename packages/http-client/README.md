# HTTP Client

An HTTP client library for Fistware applications.

## Features

- Supports GET, POST, PUT, DELETE
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

## License

UNLICENSED