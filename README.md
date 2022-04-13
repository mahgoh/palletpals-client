# PalletPals Client

The **PalletPals** client is written in [React](https://reactjs.org) and [Tailwind](https://tailwindcss.com) using the frontend tooling of [Vite](https://vitejs.dev).

## Getting Started

```bash
# install dependencies
npm install

# start dev environment
npm run dev

# build
npm run build

# run tests
npm run test
```

## Workflow

### Automated Testing

Tests are automatically run by a GitHub Action for every commit and pull request on the main branch. Merging is prevented if a test fails.

:::mermaid
flowchart LR

A[Commit to main] --> B[Run tests]
C[Pull request to main] --> B
B --> D{is failing?}
D-- Yes -->E[Stop]
D-- No -->F[Proceed]
:::

### Formatting

[Prettier](https://prettier.io) is used to format the codebase. Additionally, Tailwind classes are sorted using the official [Tailwind CSS Prettier plugin](https://github.com/tailwindlabs/prettier-plugin-tailwindcss).

## Testing

Tests are written in `src/test` using [Vitest](https://vitest.dev/).
