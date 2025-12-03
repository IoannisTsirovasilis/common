# Changelog

All notable changes to the `@fistware/next-core` package will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [6.1.2] - 2025-12-03

### Changed
- Update Next.js version to v16.0.7 for improved performance and security
- Fix security vulnerability: https://nextjs.org/blog/CVE-2025-66478

## [6.1.1] - 2025-12-01

### Changed
- Update Next.js version to v16.0.6 for improved performance and security

## [6.1.0] - 2025-11-26

### Added
- Export `NextRequestProps` interface

## [6.0.0] - 2025-10-23

### Breaking Changes
- Update Next.js version to v16.0.0 for improved performance and security [Major Version Change](https://nextjs.org/blog/next-16)

### Changed
- Update @fistware/logger to v2.0.4 for enhanced logging capabilities

## [5.0.0] - 2025-10-21

### Breaking Changes
- Remove `NextError` and `renderAsyncOrError` classes as it would create issues with Next's default error handling for Server Components

## [4.0.0] - 2025-09-23

### Breaking Changes
- Change `HandleApiRequestOptions` action return type to `(fields: R) => Promise<Partial<HttpResponse<M>>>`

### Added
- Add `reasonCode` to response

## [3.4.1] - 2025-09-16

### Changed
- Update @fistware/logger to v2.0.3 for enhanced logging capabilities
- Update Next.js version to v15.5.3 for improved performance and security

## [3.4.0] - 2025-08-28
- Add `NextError` class for better error handling in Next.js applications
- Add `renderAsyncOrError` function for better error handling in Next.js applications

## [3.3.4] - 2025-08-28

### Changed
- Update Next.js to v15.5.2 for improved performance and security

## [3.3.3] - 2025-08-28

### Fixed
- Fix bug where `HttpError` was not correctly propagating error tracing metadata in error response

## [3.3.2] - 2025-08-23

### Changed
- Update @fistware/http-core to v3.0.1 for improved HTTP handling and error management
- Update Next.js version to v15.5.0 for improved performance and security

## [3.3.1] - 2025-08-15

### Fixed
- Preserve incoming request headers by using `req.headers` in `buildServiceRequest`

## [3.3.0] - 2025-08-13

### Changed
- Updated @fistware/http-core to v3.0.0 for improved HTTP handling and error management
- Updated @fistware/logger to v2.0.2 for enhanced logging capabilities and bug fixes
- Added @fistware/utils v1.0.0 dependency for improved utility functions
- Minor dependency updates for security and stability improvements

### Fixed
- Improved logging integration and error handling reliability

## [3.2.1] - 2025-08-12

### Changed
- Updated Next.js dependency to v15.4.6 for improved performance and security
- Updated @types/node to v24.2.1 for better TypeScript support
- Updated @types/react to v19.1.10 for better React type definitions
- Updated @fistware/logger to v2.0.1 for enhanced logging capabilities

### Fixed
- Minor dependency updates for security and stability improvements

## [3.2.0] - 2025-08-12

### Added
- Enhanced request handling with improved error management
- Better integration with Next.js 15.4.5
- Updated React dependencies to 19.1.1
- Improved TypeScript type safety across all interfaces
- Enhanced logging capabilities with structured error reporting

### Changed
- Updated peer dependencies for Next.js compatibility
- Improved build process and output optimization
- Enhanced documentation with comprehensive usage examples

### Fixed
- Improved error handling in request validation
- Better CORS header management
- Enhanced request parts extraction reliability

## [3.1.1] - 2025-08-05

### Fixed
- Bug fixes and stability improvements
- Minor dependency updates for security
- Improved error handling in edge cases

## [3.1.0] - 2025-07-22

### Added
- Enhanced validation capabilities with improved Joi integration
- Better request parts extraction for complex scenarios
- Improved logging with structured error reporting
- Enhanced TypeScript definitions for better developer experience

### Changed
- Updated dependencies to latest compatible versions
- Improved error message formatting
- Enhanced request transformation capabilities

## [3.0.0] - 2025-07-21

### Breaking Changes
- Major version bump with Next.js 15+ compatibility
- Updated to support Node.js 22+ requirements
- Improved TypeScript configuration and build process
- Enhanced request handling architecture

### Added
- Next.js 15 App Router support
- Enhanced request validation with Joi schemas
- Improved error handling with structured responses
- Better CORS header management
- Comprehensive logging integration

### Changed
- Updated minimum Node.js version requirement
- Improved package structure and exports
- Enhanced type safety across all interfaces

## [2.0.2] - 2025-07-20

### Fixed
- Bug fixes and stability improvements
- Minor dependency updates
- Improved error handling

## [2.0.1] - 2025-07-16

### Fixed
- Bug fixes and minor improvements
- Dependency updates for security and stability

## [2.0.0] - 2025-07-03

### Breaking Changes
- Major version bump with potential breaking changes
- Updated to support Next.js 13+ App Router
- Improved TypeScript configuration

### Added
- Next.js App Router support
- Enhanced request handling capabilities
- Improved error handling and logging
- Better type definitions

### Changed
- Updated minimum Node.js version requirement
- Improved package structure and exports

## [1.0.2] - 2025-06-13

### Fixed
- Bug fixes and minor improvements
- Dependency updates for security and stability

## [1.0.1] - 2025-06-13

### Fixed
- Bug fixes and minor improvements
- Dependency updates for security and stability

## [1.0.0] - 2025-06-10

### Initial Release

---


## Version Compatibility

- **Node.js**: >=22.0.0
- **Next.js**: 15.3.4+ (peer dependency)
- **React**: 19.1.1+
- **TypeScript**: 5.9.2+
- **Package Manager**: npm

## Migration Guide

### From v2.x to v3.x
- Update Node.js to version 22 or higher
- Update Next.js to version 15.3.4 or higher
- Review any custom request handling code for potential breaking changes
- Update import statements if using custom extensions

### From v1.x to v2.x
- Update to Next.js App Router architecture
- Review request handling patterns for compatibility
- Update any custom validation logic

## Key Features

### Core Functionality
- **Unified API request handler** for Next.js routes with built-in validation and error handling
- **Schema-based validation** using Joi for robust payload checking
- **Customizable response transformation** to shape API responses as needed
- **Optional authentication hook** for secure endpoints
- **Standardized CORS headers** for cross-origin compatibility
- **Consistent response utilities** for success and error handling
- **Integrated logging utility** for structured and configurable logs

### Request Handling
- `handleApiRequest`: Main function for handling API requests with validation, authentication, and response transformation
- `extractRequestParts`: Utility for extracting body, params, query, and headers from Next.js requests
- `validateRequest`: Schema-based validation using Joi
- `buildServiceRequest`: Builds service-ready request objects
- `buildResponse`: Creates standardized HTTP responses

### Error Handling
- Integrated error handling with `@fistware/http-core`
- Structured error responses with proper HTTP status codes
- Comprehensive logging with error details
- Automatic CORS header inclusion

### Authentication
- Optional `handleAuth` function for custom authentication logic
- Header-based authentication support
- Flexible authentication integration patterns
