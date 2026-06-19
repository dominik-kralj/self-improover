# Self-Improover

A personal accountability OS. Users set weekly commitments across life areas, check in daily, and get a scored week they can't lie to themselves about.

## Agent skills

### Issue tracker

Issues live in GitHub Issues (`dominik-kralj/self-improover`). External PRs are not a triage surface. See `docs/agents/issue-tracker.md`.

### Triage labels

Default label vocabulary: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context repo — one `CONTEXT.md` + `docs/adr/` at the repo root. See `docs/agents/domain.md`.

## Domain language

| Term          | Meaning                                                   |
| ------------- | --------------------------------------------------------- |
| Area          | A life domain the user tracks (e.g. "Fitness", "Finance") |
| Commitment    | A specific weekly goal within an area                     |
| Check-in      | A daily log entry against a commitment (1–5 or boolean)   |
| Score         | Computed weekly number 0–100 representing follow-through  |
| Streak        | Consecutive weeks above a score threshold                 |
| Weekly review | End-of-week reflection + goal reset session               |
| Area weight   | Importance multiplier per area used in score calculation  |

Always use these terms in code — variable names, function names, file names.

## Tech stack

### Frontend

- React + TypeScript
- Chakra UI v3 for components
- React Hook Form + Zod for forms and validation
- No other UI libraries without explicit approval

### Backend

- TBD — do not make assumptions about the backend

## Coding philosophy

- Write everything by hand. Do not scaffold, do not use boilerplate generators, do not add dependencies without asking first.
- Prefer simple and explicit over clever and abstract.
- Small functions with one job. Small files. No premature abstractions.
- TypeScript strict mode — no `any`, no type casting without a comment explaining why.
- Zod schemas are the source of truth for data shapes — derive TS types from them, not the other way around.

## FE conventions

- Forms: always React Hook Form + Zod. Never uncontrolled inputs outside RHF.
- Components: one component per file, named export, no default exports.
- File structure: feature-based folders, not type-based (not `/components`, `/hooks` — instead `/checkin`, `/dashboard`, `/areas`)
- Mobile-first — the check-in screen is used daily on a phone, treat it as the primary surface
