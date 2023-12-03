# TypeScript Mongoose Node.js Application

This repository contains a TypeScript-based Node.js application utilizing Mongoose

## Installation

Make sure you have Node.js and npm installed. Then, run:

```bash
npm install
```

## Usage

### Development

To start the application in development mode with automatic restarts using [ts-node-dev](https://www.npmjs.com/package/ts-node-dev), use the following command:

```bash
npm run start:dev
```

This command will run the application from the TypeScript source files.

### Production

To start the application in production mode after compiling the TypeScript code, use the following command:

```bash
npm run build

npm run start:prod
```

The first command (`npm run build`) compiles the TypeScript code into the 'dist' directory, and the second command (`npm run start:prod`) starts the application from the compiled JavaScript files.

## Scripts

- `npm run build`: Runs TypeScript compiler to build the project.

- `npm run start:dev`: Starts the application in development mode with automatic restarts.

- `npm run start:prod`: Starts the application in production mode after building the project.
