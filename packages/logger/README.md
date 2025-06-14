# Logger

A simple logging utility for Fistware projects.

## Features

- Multiple log levels: `debug`, `info`, `warn`, `error`
- Easy integration with existing projects

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


## License

UNLICENSED
