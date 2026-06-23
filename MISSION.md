# Mission: Monorepo Architecture

## Why

Dominik is building Self-Improover — a personal accountability app with a React frontend and a Node.js/Hono backend. He needs to understand monorepo structure well enough to scaffold issue #8 confidently, and to make good structural decisions as the project grows.

## Success looks like

- Can explain the difference between a monorepo and separate repos, and when each makes sense
- Can scaffold a working npm-workspaces monorepo with a `frontend/` and `backend/` package
- Can add shared tooling (ESLint, Prettier, TypeScript) at the root without duplicating config
- Understands how the frontend and backend will communicate in this architecture

## Constraints

- Frontend-comfortable, new to backend development
- Learning by doing — wants to pick up issue #8 immediately after this session
- Sessions are short (a few hours at most)

## Out of scope

- Advanced monorepo tooling (Nx, Turborepo, Bazel) — npm workspaces is enough for this project
- Microservices, Docker, or container orchestration
- CI/CD pipeline design
