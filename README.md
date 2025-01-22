# NgSRA

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.2.

## Prerequisits

You need to have `node.js` installed. Then run `npm install` to load dependencies.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Build electron app

First run the build command from above to build the project. After this you can run `npx @electron/packager . --all --overwrite --ignore=node_modules --ignore=src --ignore=public --ignore=.angular --ignore=.vscode` to build electron for all targets.

## Build tauri app

You need to have `rust` installed to build with [Tauri](https://v2.tauri.app). Then run `npx tauri build` to build for your current architecture.
