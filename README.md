![][badge-ts] ![][badge-pnpm]

## Getting Started

To get started, install Node.js. Feel free to use a version manager like [fnm](https://github.com/Schniz/fnm#installation) or [nvm](https://github.com/nvm-sh/nvm#install--update-script). Then, enable [pnpm](https://pnpm.io/) using Corepack:

```bash
corepack enable pnpm
```

Once pnpm is enabled, install the project dependencies:

```bash
pnpm install
```

To start the development servers, run the following:

```bash
pnpm dev
```

## Formatting and Linting

[Biome](https://biomejs.dev/) is used for both formatting and linting. Refer to the available scripts in [package.json](./package.json) or simply run:

```bash
pnpm lint
```

For the best experience, [integrate Biome with your editor](https://biomejs.dev/guides/editors/first-party-extensions/). For VSCode users, add the following to `.vscode/settings.json` for Biome auto-fixes and formatting on save:

```json
"editor.codeActionsOnSave": {
    "source.organizeImports.biome": "explicit",
    "source.action.useSortedKeys.biome": "explicit",
    "source.fixAll.biome": "explicit"
},
"editor.defaultFormatter": "biomejs.biome",
```

## Application Specifics

For details on environment variables and other application-specific configurations, refer to their respective documentation:

- [Web Application](./apps/web/README.md)
- [API](./apps/api/README.md)

<!-- Image References -->

[badge-ts]: https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff
[badge-pnpm]: https://img.shields.io/badge/pnpm-F69220?logo=pnpm&logoColor=fff
