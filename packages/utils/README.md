# @fistware/utils

A collection of utility functions for Fistware projects.

## Installation

```bash
npm install @fistware/utils
```

## Usage

```typescript
import { getUnixTimestamp } from '@fistware/utils';

// Get current Unix timestamp (seconds since epoch)
const timestamp = getUnixTimestamp();
console.log(timestamp); // e.g., 1703123456
```

## API Reference

### `getUnixTimestamp()`

Returns the current Unix timestamp in seconds (not milliseconds).

**Returns:** `number` - Current Unix timestamp in seconds since epoch

**Example:**
```typescript
import { getUnixTimestamp } from '@fistware/utils';

const now = getUnixTimestamp();
// Returns something like: 1703123456
```

## Development

### Prerequisites

- Node.js >= 22.0.0
- TypeScript 5.9.2+

### Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the package:
   ```bash
   npm run build
   ```

### Available Scripts

- `npm run build` - Build the TypeScript source
- `npm run clean` - Clean the build output
- `npm run lint` - Run ESLint on source files
- `npm run prepare` - Build before publishing (runs automatically on npm install)

### Project Structure

```
src/
├── index.ts      # Main entry point and exports
└── utils.ts      # Utility functions implementation
```

## License

UNLICENSED - Private package for Fistware projects

## Author

Ioannis Tsirovasilis <ioannis.tsirovasilis@fistware.com>
