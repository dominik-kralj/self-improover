# ESLint + Prettier setup completed (issue #9)

Dominik asked the right question unprompted: "should React packages be in root package.json?" — showing he's reasoning about where tooling belongs, not just following steps. Got the answer right when explained (tooling that runs from root goes at root; runtime deps stay in the package that uses them).

**Key concepts introduced:** Prettier vs ESLint split (format vs correctness), flat config layer order, `eslint-config-prettier` must be last, file scoping with `files` key for React plugins.

**Implications:** Ready to start on backend work (issue #10 — Hono + Neon + Drizzle). Backend concepts will be new territory. Lesson 4 should cover "what is a web server / request-response cycle" grounded in Hono.
