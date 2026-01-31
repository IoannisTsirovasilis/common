# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.1] - 2026-01-31

### Changed
- Update dependencies to latest versions

## [0.1.0] - 2026-01-19

### Added

- Initial release of `@fistware/stripe-checkout` React component library
- `StripeCheckoutButton` component for creating Stripe Checkout sessions
- TypeScript type definitions:
  - `StripeLineItem` interface
  - `CreateCheckoutSessionRequest` interface
  - `CreateCheckoutSessionPayload` interface
  - `CreateCheckoutSessionResponse` interface
  - `CheckoutButtonProps` interface
- HTTP client integration using `@fistware/http-client` for API communication
- Support for multiple line items in checkout sessions
- Customizable button styling via `className` prop
- Build system with TypeScript compilation
- ESLint configuration for code quality
- Tailwind CSS support via PostCSS
- Development scripts:
  - `build`: Compile TypeScript and copy assets
  - `lint`: Run ESLint
  - `lint-build`: Lint and build
  - `clean`: Remove build directory
  - `check-updates`: Check for dependency updates
  - `update-dependencies`: Update dependencies automatically

### Dependencies

- `@fistware/http-client`: ^3.1.2
- `react`: ^19.2.3
- `react-dom`: ^19.2.3
