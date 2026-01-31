# Changelog

All notable changes to the `@fistware/http-client` package will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [3.1.3] - 2026-01-31

### Changed
- Update dependencies to latest versions

## [3.1.2] - 2026-01-11

### Changed
- Update @fistware/logger to v2.0.5 for improved logging capabilities

## [3.1.1] - 2025-10-23

### Changed
- Update @fistware/logger to v2.0.4 for enhanced logging capabilities

## [3.1.0] - 2025-09-23

### Added
- Return `reasonCode` in response

## [3.0.3] - 2025-09-16

### Changed
- Update @fistware/logger to v2.0.3 for enhanced logging capabilities

## [3.0.2] - 2025-08-23

### Changed
- Update `@fistware/http-core` to v3.0.1 for improved HTTP handling and error management

## [3.0.1] - 2025-08-15

### Fixed
- Correctly populate `requestId` and `correlationId` in `HttpResponse` outputs
- Ensure tracing fields are set consistently across all HTTP methods (GET, POST, PUT, PATCH, DELETE)
- Align response metadata with `@fistware/http-core@3.0.0` structure

## [3.0.0] - 2025-08-13

### Breaking Changes
- **Major version bump**: This release includes significant architectural improvements and enhanced TypeScript support
- **Updated response structure**: HTTP responses now include additional metadata fields (headers, requestId, correlationId, timestamp)
- **Improved error handling**: Enhanced error responses with structured error information and better tracing

### Added
- **Enhanced TypeScript support**: Complete type safety with improved generic type constraints for all HTTP methods
- **Automatic request tracing**: Built-in request ID and correlation ID generation for better request tracking
- **Structured logging**: Enhanced logging with comprehensive request and response metadata
- **Enhanced documentation**: Complete API documentation with TypeScript examples and usage patterns

### Changed
- **Updated dependencies**: Upgraded to latest versions of `@fistware/http-core` (3.0.0), `@fistware/logger` (2.0.2), and `@fistware/utils` (1.0.0)
- **Improved build process**: Enhanced TypeScript configuration and build optimization
- **Better error messages**: More descriptive error messages with structured error information
- **Enhanced header management**: Improved header handling with automatic request/correlation ID injection
- **Modern Node.js support**: Optimized for Node.js 22+ with improved performance and security

### Fixed
- **Unit test reliability**: Fixed failing unit tests and improved test coverage
- **Response handling**: Improved response parsing and error handling edge cases
- **Logging consistency**: Enhanced logging format consistency across all request types
- **Header processing**: Fixed header processing issues and improved header validation

### Migration Guide

#### From v2.x to v3.0.0

1. **Update Node.js**: Ensure you're using Node.js 22.0.0 or higher
2. **Review response handling**: HTTP responses now include additional fields:
   ```typescript
   // Old response structure
   { data: any, message: string, status: number }
   
   // New response structure
   { 
     data: any, 
     message: string, 
     status: number,
     headers: Headers,
     requestId: string,
     correlationId: string,
     timestamp: number
   }
   ```
3. **Update type definitions**: If using custom type definitions, ensure compatibility with new generic constraints
4. **Review logging**: Enhanced logging may provide more detailed information in your logs

#### Key Improvements in v3.0.0

- **Better TypeScript Integration**: Full type safety with improved generic support
- **Enhanced Request Tracing**: Automatic request ID and correlation ID generation
- **Improved Error Handling**: Structured error responses with comprehensive metadata
- **Security Enhancements**: Automatic sensitive data masking in logs
- **Performance Optimizations**: Better performance with Node.js 22+ features

## [2.2.2] - 2025-08-12

### Changed
- Updated @types/node to v24.2.1 for better TypeScript support
- Updated @fistware/logger to v2.0.1 for enhanced logging capabilities

### Fixed
- Minor dependency updates for security and stability improvements

## [2.2.1] - 2025-08-12

### Added
- Enhanced error handling with improved request/response logging
- Better integration with `@fistware/http-core` v2.2.0
- Updated dependencies for improved security and performance
- Enhanced TypeScript type safety across all interfaces
- Improved request validation and response handling

### Changed
- Updated to use `@fistware/http-core` v2.2.0 for enhanced error tracing
- Improved logging with structured request and response reporting
- Enhanced documentation with comprehensive usage examples
- Better header management and sensitive data masking

### Fixed
- Improved error handling in request execution
- Enhanced request logging with better structured data
- Better integration with fetch API and response handling

## [2.2.0] - 2025-07-22

### Added
- Enhanced HTTP client capabilities with improved error handling
- Better integration with `@fistware/http-core` v2.2.0
- Updated dependencies for improved security and performance
- Enhanced TypeScript type safety across all interfaces

### Changed
- Updated to use `@fistware/http-core` v2.2.0 for enhanced error tracing
- Improved logging with structured request and response reporting
- Enhanced documentation with comprehensive usage examples

### Fixed
- Improved error handling in request execution
- Enhanced request logging with better structured data

## [2.1.0] - 2025-07-20

### Added
- Enhanced HTTP client capabilities with improved error handling
- Better integration with `@fistware/http-core` v2.1.0
- Updated dependencies for improved security and performance
- Enhanced TypeScript type safety across all interfaces

### Changed
- Updated to use `@fistware/http-core` v2.1.0 for enhanced error handling
- Improved logging with structured request and response reporting
- Enhanced documentation with comprehensive usage examples

### Fixed
- Improved error handling in request execution
- Enhanced request logging with better structured data

## [2.0.1] - 2025-07-16

### Fixed
- Bug fixes and stability improvements
- Minor dependency updates for security
- Improved error handling in edge cases

## [2.0.0] - 2025-06-15

### Breaking Changes
- Major version bump with Node.js 22+ compatibility
- Updated to support Node.js 22+ requirements
- Improved TypeScript configuration and build process
- Enhanced HTTP client architecture

### Added
- Node.js 22+ support with improved performance
- Enhanced HTTP client capabilities with better error handling
- Improved request validation and response handling
- Better CORS and header management
- Comprehensive logging integration

### Changed
- Updated minimum Node.js version requirement
- Improved package structure and exports
- Enhanced type safety across all interfaces

## [1.1.2] - 2025-06-13

### Fixed
- Bug fixes and stability improvements
- Minor dependency updates for security
- Improved error handling in edge cases

## [1.1.1] - 2025-06-06

### Fixed
- Bug fixes and minor improvements
- Dependency updates for security and stability
- Improved error handling

## [1.1.0] - 2025-06-06

### Added
- Enhanced HTTP client capabilities
- Improved error handling and logging
- Better TypeScript integration
- Enhanced request/response utilities

### Changed
- Updated to use `@fistware/http-core` for consistent error handling
- Improved package structure and exports
- Enhanced type safety

## [1.0.1] - 2025-06-02

### Fixed
- Bug fixes and minor improvements
- Dependency updates for security and stability
- Improved error handling

## [1.0.0] - 2025-06-02

### Added
- Core HTTP client package with essential request handling
- `HttpClient` function for creating HTTP client instances
- `HttpClientOptions` interface for flexible configuration
- Support for GET, POST, PUT, PATCH, DELETE HTTP methods
- Schema-based request validation
- Customizable response transformation
- Optional logging with `@fistware/logger`
- Complete TypeScript support with proper type definitions
- ES module support
- Comprehensive README documentation

### Features
- Type-safe HTTP request and response handling
- Standardized error handling with HTTP status codes
- Extensible request validation
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
- Review any custom HTTP client code for potential breaking changes
- Update import statements if using custom extensions

### From v2.0.x to v2.2.x
- Enhanced error handling with better structured logging
- Improved integration with `@fistware/http-core` v2.2.0
- Better request/response logging capabilities

## Key Features

### Core Functionality
- **HTTP client factory** for creating configured HTTP client instances
- **Multiple HTTP methods** support (GET, POST, PUT, PATCH, DELETE)
- **Type-safe request and response handling** with full TypeScript support
- **Configurable logging** with `@fistware/logger` integration
- **Base URL configuration** for consistent API endpoints
- **Header management** with sensitive data masking
- **Error handling** with structured error responses

### Request Handling
- `HttpClient`: Factory function for creating HTTP client instances
- `HttpClientOptions`: Configuration interface for client setup
- `buildOptions`: Utility for building fetch options with headers
- `buildResponse`: Utility for building standardized HTTP responses
- `maskSensitiveData`: Security utility for masking sensitive headers

### Error Handling
- Integrated error handling with `@fistware/http-core`
- Structured error responses with proper HTTP status codes
- Comprehensive logging with request and response details
- Automatic sensitive data masking for security

### Logging
- Structured logging with request and response details
- Configurable log levels and enable/disable functionality
- Integration with `@fistware/logger` for consistent logging across applications
- Sensitive data masking for security compliance

### Security Features
- Automatic masking of Authorization headers in logs
- Secure header handling and management
- Type-safe request/response interfaces
- Comprehensive error handling without data leakage
