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
- `ResponseData` : Response date of HttpResponse.

### Enums

- `HttpRequestMethod`: Contains HTTP Methods
- `ResponseCode`: Contains HTTP Status codes

### Errors

- `HttpError`: Base class for HTTP errors
- `BadRequestError`: Class that represents bad request error
- `UnauthorizedError`: Class that represents unauthorized error
- `EntityNotFoundError`: Class that represents not found error

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