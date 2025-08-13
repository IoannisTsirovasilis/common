# Logger

A simple logging utility for Fistware projects.

## Features

- Multiple log levels: `debug`, `info`, `warn`, `error`
- Easy integration with existing projects
- Type-safe logging with full TypeScript support

## Installation

```bash
npm install @fistware/logger
```

## Usage

```js
import { Logger } from '@fistware/logger';

const logger = new Logger({ level: 'info' });

logger.info('Application started');
logger.warn('Low disk space');
logger.error('Unhandled exception');
```

## Dependencies

This package uses [Pino](https://getpino.io/) v9.9.0 for high-performance structured logging. Pino is one of the fastest Node.js logging libraries available, providing:

- Extremely fast logging performance
- Structured JSON output
- Low overhead in production
- Excellent debugging capabilities

## Development

### Build
```bash
npm run build
```

### Lint
```bash
npm run lint
```

### Test
```bash
npm test
```

### Test Coverage
```bash
npm run test:coverage
```

### Empty dist Folder
```bash
npm run clean
```


## License

UNLICENSED
