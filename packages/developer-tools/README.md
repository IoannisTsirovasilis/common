# Developer Tools

A collection of utilities and scripts to streamline development workflows across projects.

## Features

- Common CLI tools

## Installation

```bash
npm install --save-dev @fistware/developer-tools
```

## diff-packages Script

The `diff-packages` script is used in monorepos to find if there are code differences, from the last publish, per package.
Prerequisites: A commit must be tagged with the name of the package plus the version
E.g if in package.json the name is @fistware/test, then the tag must be something like @fistware/test@v1.0.0

## License

UNLICENSED