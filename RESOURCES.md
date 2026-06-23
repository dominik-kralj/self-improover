# Monorepo Architecture Resources

## Knowledge

- [npm workspaces — official docs](https://docs.npmjs.com/cli/v10/using-npm/workspaces)
  The definitive reference for npm workspaces — the tool we use to link frontend/ and backend/ in one repo. Use for: understanding how packages reference each other, hoisting, and running scripts across workspaces.

- [Turborepo handbook: "What is a monorepo?"](https://turbo.build/repo/docs/handbook)
  Clear conceptual explainer from the Turborepo team. Not Turborepo-specific in the early sections — good mental model builder. Use for: monorepo vs polyrepo tradeoffs, when each makes sense.

- [TypeScript Project References](https://www.typescriptlang.org/docs/handbook/project-references.html)
  Official TS docs on how to share TypeScript config across packages. Use for: setting up a root tsconfig.json that frontend/ and backend/ both extend.

## Wisdom (Communities)

- [r/node](https://reddit.com/r/node) — Node.js community. Good for backend architecture questions and "is this the right approach?" sanity checks.
- [Hono GitHub Discussions](https://github.com/honojs/hono/discussions) — Active community for Hono-specific questions.
