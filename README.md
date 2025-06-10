# @fistware/common

This repository serves as the monorepo for a collection shared utilities, helpers, and components for use across multiple projects. It is organized as a workspace, allowing for the development and maintenance of multiple related packages in a single repository.

> **Note:** This root package is not intended for direct installation via `npm i`. Please refer to the individual packages within the workspace for installation and usage instructions.

## Features

- Reusable functions and classes
- Common configuration files
- Shared assets and resources

## Structure

- `packages/` — Contains individual ESLint config packages.
- `README.md` — This file.

For more details, see the documentation within each package directory.

## Dependency Graph

- `http-client` -> `http-core`, `logger`
- `fastify-core` -> `http-core`, `logger`

## Development

### Build All Pacakges
```bash
npm run build
```

### Lint All Pacakges
```bash
npm run lint
```

### Check Updates For All Pacakges
```bash
npm run check-updates
```

### Update Depenencies For All Pacakges
```bash
npm run update-dependencies
```

### Check Code Changes Since Last Publish For All Pacakges
```bash
npm run diff:packages
```

## License

UNLICENSED