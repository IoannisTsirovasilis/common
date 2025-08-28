# Changelog

All notable changes to the `@fistware/fastify-core` package will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.3.2] - 2025-08-28

### Fixed
- Fix bug where `HttpError` was not correctly propagating error tracing metadata in error response

## [2.3.1] - 2025-08-23

### Changed
- Update @fistware/http-core to v3.0.1 for improved HTTP handling and error management
- Update Joi version to 18.0.1 for improved performance and security

## [2.3.0] - 2025-08-13

### Changed
- Updated @fistware/http-core to v3.0.0 for improved HTTP handling and error management
- Updated @fistware/logger to v2.0.2 for enhanced logging capabilities and bug fixes
- Added @fistware/utils v1.0.0 dependency for improved utility functions
- Updated Joi to v18.0.0 for improved validation capabilities
- Updated @fistware/lint-ts to v1.1.1 for enhanced linting rules
- Minor dependency updates for security and stability improvements

### Fixed
- Improved error handling and validation reliability
- Enhanced logging integration with updated dependencies

## [2.2.1] - 2025-08-12

### Changed
- Updated Fastify dependency to v5.5.0 for improved performance and security
- Updated @types/node to v24.2.1 for better TypeScript support
- Updated @fistware/logger to v2.0.1 for enhanced logging capabilities

### Fixed
- Minor dependency updates for security and stability improvements

## [2.2.0] - 2025-08-12

### Added
- Enhanced error handling with improved structured logging
- Better integration with Fastify 5.4.0
- Updated dependencies for improved security and performance
- Enhanced TypeScript type safety across all interfaces
- Improved request validation with better error messages

### Changed
- Updated to use `@fistware/http-core` v2.2.0 for enhanced error tracing
- Improved logging with structured error reporting using `toStructuredError()`
- Enhanced documentation with comprehensive usage examples
- Better CORS header management

### Fixed
- Improved error handling in request validation
- Enhanced request logging with better structured data
- Better integration with Fastify's type system

## [2.1.1] - 2025-08-05

### Fixed
- Bug fixes and stability improvements
- Minor dependency updates for security
- Improved error handling in edge cases

## [2.1.0] - 2025-07-22

### Added
- Enhanced validation capabilities with improved Joi integration
- Better request handling with improved type safety
- Enhanced logging with structured error reporting
- Improved TypeScript definitions for better developer experience

### Changed
- Updated dependencies to latest compatible versions
- Improved error message formatting
- Enhanced response transformation capabilities

## [2.0.0] - 2025-06-12

### Breaking Changes
- Major version bump with Fastify 5+ compatibility
- Updated to support Node.js 22+ requirements
- Improved TypeScript configuration and build process
- Enhanced request handling architecture

### Added
- Fastify 5.x support with improved type integration
- Enhanced request validation with Joi schemas
- Improved error handling with structured responses
- Better CORS header management
- Comprehensive logging integration

### Changed
- Updated minimum Node.js version requirement
- Improved package structure and exports
- Enhanced type safety across all interfaces

## [1.0.1] - 2025-06-06

### Fixed
- Bug fixes and minor improvements
- Dependency updates for security and stability
- Improved error handling

## [1.0.0] - 2025-06-06

### Added
- Core Fastify utility package with essential request handling
- `handleApiRequest` function for unified API request handling
- `HandleApiRequestOptions` interface for flexible configuration
- `FastifyHttpRequest` interface for typed Fastify requests
- Schema-based validation using Joi
- Customizable response transformation
- Optional authentication hooks
- Standardized CORS headers
- Integrated logging with `@fistware/logger`
- Complete TypeScript support with proper type definitions
- ES module support
- Comprehensive README documentation

### Features
- Type-safe Fastify request and response handling
- Standardized error handling with HTTP status codes
- Extensible request validation with Joi schemas
- Modern ES module architecture
- Full TypeScript support with strict typing

## [0.2.0] - 2025-06-06

### Added
- Enhanced request handling capabilities
- Improved error handling and logging
- Better TypeScript integration

### Changed
- Updated to use `@fistware/http-core` for consistent error handling
- Improved package structure and exports

## [0.1.0] - 2025-06-06

### Added
- Initial release with basic Fastify integration
- Core request handling utilities
- Basic TypeScript support

---

## Version Compatibility

- **Node.js**: >=22.0.0
- **Fastify**: 5.4.0+
- **TypeScript**: 5.9.2+
- **Package Manager**: npm

## Migration Guide

### From v1.x to v2.x
- Update Node.js to version 22 or higher
- Update Fastify to version 5.4.0 or higher
- Review any custom request handling code for potential breaking changes
- Update import statements if using custom extensions

### From v0.x to v1.x
- Major architectural changes with improved type safety
- Review request handling patterns for compatibility
- Update any custom validation logic

## Key Features

### Core Functionality
- **Unified API request handler** for Fastify routes with built-in validation and error handling
- **Schema-based validation** using Joi for robust payload checking
- **Customizable response transformation** to shape API responses as needed
- **Optional authentication hook** for secure endpoints
- **Standardized CORS headers** for cross-origin compatibility
- **Consistent response utilities** for success and error handling
- **Integrated logging utility** for structured and configurable logs

### Request Handling
- `handleApiRequest`: Main function for handling API requests with validation, authentication, and response transformation
- `validateRequest`: Schema-based validation using Joi with comprehensive error reporting
- `sendResponse`: Creates standardized HTTP responses with CORS headers
- `sendErrorResponse`: Handles errors and sends structured error responses

### Error Handling
- Integrated error handling with `@fistware/http-core`
- Structured error responses with proper HTTP status codes
- Comprehensive logging with error details and request context
- Automatic CORS header inclusion

### Authentication
- Optional `handleAuth` function for custom authentication logic
- Header-based authentication support
- Flexible authentication integration patterns

### Logging
- Structured logging with request and response details
- Error logging with stack traces and context
- Configurable log levels and enable/disable functionality
- Integration with `@fistware/logger` for consistent logging across applications
