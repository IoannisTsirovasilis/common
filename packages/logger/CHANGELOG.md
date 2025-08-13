# Changelog

All notable changes to the `@fistware/logger` package will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.0.2] - 2025-08-13

### Changed
- Updated Pino dependency to v9.9.0 for improved performance and security

## [2.0.1] - 2025-08-12

### Changed
- Updated Pino dependency to v9.8.0 for improved performance and security
- Updated @types/node to v24.2.1 for better TypeScript support

### Fixed
- Minor dependency updates for security and stability improvements

## [2.0.0] - 2025-06-14

### Added
- Enhanced logging capabilities with improved Pino integration
- Better integration with Node.js 22+ features
- Updated dependencies for improved security and performance
- Enhanced TypeScript type safety across all interfaces
- Improved logger configuration and initialization

### Changed
- Updated to Pino v9.7.0 for enhanced logging performance
- Improved logger options interface with better type definitions
- Enhanced documentation with comprehensive usage examples
- Better silent mode handling and level management

### Fixed
- Improved logger initialization and configuration
- Enhanced level validation and silent mode detection
- Better integration with Node.js 22+ requirements

## [1.0.2] - 2025-06-12

### Fixed
- Bug fixes and stability improvements
- Minor dependency updates for security
- Improved error handling in edge cases

## [1.0.1] - 2025-06-06

### Fixed
- Bug fixes and minor improvements
- Dependency updates for security and stability
- Improved logger configuration

## [1.0.0] - 2025-06-06

### Added
- Core logging package with essential logging functionality
- `Logger` function for creating logger instances
- `LoggerOptions` interface for flexible configuration
- Support for multiple log levels: fatal, error, warn, info, debug, trace
- Easy enable/disable functionality
- Complete TypeScript support with proper type definitions
- ES module support
- Comprehensive README documentation
- Integration with Pino for high-performance logging

### Features
- Type-safe logging with full TypeScript support
- Configurable log levels with silent mode support
- High-performance logging with Pino integration
- Modern ES module architecture
- Flexible configuration options

---

## Version Compatibility

- **Node.js**: >=22.0.0
- **TypeScript**: 5.9.2+
- **Package Manager**: npm

## Migration Guide

### From v1.x to v2.x
- Update Node.js to version 22 or higher
- Review any custom logger configuration for potential breaking changes
- Update import statements if using custom extensions

### From v1.0.x to v1.0.2
- Minor bug fixes and stability improvements
- No breaking changes

## Key Features

### Core Functionality
- **High-performance logging** with Pino integration
- **Multiple log levels** support (fatal, error, warn, info, debug, trace)
- **Configurable logging** with enable/disable functionality
- **Type-safe logging** with full TypeScript support
- **Silent mode** for completely disabling logging
- **Flexible configuration** with `LoggerOptions` interface

### Logger Configuration
- `Logger`: Factory function for creating logger instances
- `LoggerOptions`: Configuration interface for logger setup
- `LoggerType`: TypeScript type for logger instances
- `shouldEnableLogger`: Internal utility for logger enablement logic

### Log Levels
- **fatal**: Critical errors that cause application termination
- **error**: Error conditions that need attention
- **warn**: Warning conditions that should be monitored
- **info**: General information about application flow
- **debug**: Detailed debugging information
- **trace**: Very detailed debugging information
- **silent**: Completely disables logging

### Performance Features
- **Pino integration** for high-performance structured logging
- **Configurable levels** for optimal performance in different environments
- **Silent mode** for zero-overhead logging when disabled
- **Type-safe interfaces** for better development experience

### Integration
- **Easy integration** with existing Fistware projects
- **Consistent logging** across all Fistware packages
- **Environment-based configuration** support
- **Test coverage** with comprehensive test suite
