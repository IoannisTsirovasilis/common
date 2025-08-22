# Changelog

All notable changes to the `@fistware/http-core` package will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.0.1] - 2025-08-23

### Added
- Added "name" field to error classes for better error identification and debugging

## [3.0.0] - 2025-08-13

### Breaking Changes
- **HttpResponse interface**: `requestId`, `correlationId`, and `timestamp` are now mandatory fields
  - `requestId`: Required string for request identification and tracing
  - `correlationId`: Required string for correlation across services
  - `timestamp`: Required number representing the response timestamp
- All existing code using `HttpResponse` must be updated to provide these mandatory fields

### Added
- Enhanced request tracing with mandatory identification fields
- Improved debugging and monitoring capabilities through required request tracking

### Changed
- Updated `HttpResponse` interface to enforce consistent request tracing
- Improved type safety by making tracing fields mandatory

## [2.2.0] - 2025-08-12

### Added
- Enhanced `HttpError` class with optional tracing support
- New `HttpErrorOptions` interface for request tracing
- `requestId` and `correlationId` properties for better logging and debugging
- `toStructuredError()` method for structured error logging with timestamp
- Updated `HttpResponse` interface to include optional `headers` property

### Changed
- Improved error handling with better tracing capabilities
- Enhanced documentation with usage examples for tracing features

### Fixed
- Fixed duplicate `data` property in `HttpResponse` interface
- Improved TypeScript type safety across all interfaces

## [2.1.0] - 2025-07-22

### Added
- Enhanced error handling capabilities
- Improved TypeScript definitions
- Better integration with logging systems

### Changed
- Updated dependencies to latest compatible versions
- Improved build process and output

## [2.0.1] - 2025-06-15

### Fixed
- Bug fixes and stability improvements
- Minor dependency updates

## [2.0.0] - 2025-06-15

### Breaking Changes
- Major version bump with potential breaking changes
- Updated to support Node.js 22+ requirements
- Improved TypeScript configuration and build process

### Added
- Enhanced HTTP status code coverage
- Improved error class hierarchy
- Better type definitions

### Changed
- Updated minimum Node.js version requirement
- Improved package structure and exports

## [1.0.2] - 2025-06-12

### Fixed
- Bug fixes and minor improvements
- Dependency updates for security and stability

## [1.0.1] - 2025-06-06

### Fixed
- Initial bug fixes and improvements
- Minor documentation updates

## [1.0.0] - 2025-06-02

### Added
- Core HTTP utility package with essential interfaces and enums
- `HttpRequestMethod` enum with all standard HTTP methods (GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS, CONNECT, TRACE)
- `ResponseCode` enum with comprehensive HTTP status codes (200-511)
- `HttpRequest` interface for typed HTTP requests with headers and payload
- `HttpResponse` interface for typed HTTP responses with data, message, and status
- `HttpPayload` interface for request body typing
- `ResponseData` interface for response data typing
- `HttpError` base class for HTTP error handling
- `BadRequestError` class for 400 Bad Request errors
- `UnauthorizedError` class for 401 Unauthorized errors
- `EntityNotFoundError` class for 404 Not Found errors
- Complete TypeScript support with proper type definitions
- ES module support with `.js` extensions
- Comprehensive README documentation

### Features
- Type-safe HTTP request and response handling
- Standardized error handling with HTTP status codes
- Extensible error class hierarchy
- Modern ES module architecture
- Full TypeScript support with strict typing

---

## Version Compatibility

- **Node.js**: >=22.0.0
- **TypeScript**: 5.9.2+
- **Package Manager**: npm

## Migration Guide

### From v1.x to v2.x
- Update Node.js to version 22 or higher
- Review any custom error handling code for potential breaking changes
- Update import statements if using custom error extensions

### From v2.0.x to v2.2.x
- New `HttpErrorOptions` interface available for enhanced tracing
- `toStructuredError()` method available on all `HttpError` instances
- Optional `headers` property added to `HttpResponse` interface
