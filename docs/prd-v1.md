## Problem Statement

Users struggle to hold themselves accountable to their weekly goals because they rely on memory and self-reported feelings of progress. There is no honest, numbers-based record of follow-through — making it easy to rationalise a bad week as "mostly fine."

## Solution

A personal accountability app where the user defines Areas of their life, sets specific numeric Commitments within each Area, and checks in daily. At the end of each week a Score from 0–100 is computed automatically. The user cannot fudge it: a day with no Check-in counts as zero.

## User Stories

1. As a user, I want to create an Area (e.g. "Fitness") with a relative weight, so that I can organise my Commitments by life domain.
2. As a user, I want to set a weight on each Area so that more important Areas count more toward my weekly Score.
3. As a user, I want to add multiple Commitments to an Area, each with a title, a target count, and a unit (e.g. "Run — 4 times"), so that I can be specific about what I am committing to.
4. As a user, I want my Commitments to automatically carry over to the next week without any action on my part, so that I do not have to re-enter my goals every Monday.
5. As a user, I want to open the app each day and see all my Commitments on one scrollable screen grouped by Area, so that checking in is fast and frictionless.
6. As a user, I want to log a numeric count for each Commitment on a given day (e.g. 2 for padel in the morning and gym in the afternoon), so that I can record multiple occurrences in a single day.
7. As a user, I want a day with no Check-in to automatically count as zero, so that forgetting to log is penalised rather than ignored.
8. As a user, I want to see my Commitment score for the current week update as I check in, so that I have immediate feedback on my progress.
9. As a user, I want to see my weekly Score (0-100) on a Dashboard, so that I have an honest, single-number summary of my follow-through.
10. As a user, I want to see my current Streak (consecutive weeks at or above 80) on the Dashboard, so that I have a motivating continuity metric.
11. As a user, I want to see a history of my past weekly Scores on the Dashboard, so that I can track my accountability over time.
12. As a user, I want to access a Weekly Review screen that shows me my Score summary and lets me edit my Commitments, so that I can reflect and adjust before the next week begins.
13. As a user, I want the Weekly Review to be optional so that the new week starts on Monday regardless and I am not blocked from continuing if I skip it.
14. As a user, I want a sign-up screen where I can register with my email and password, so that my data is persisted and protected.
15. As a user, I want a login screen where I can authenticate with my email and password, so that I can access my data from any device.
16. As a user, I want my session to be maintained securely via an httpOnly cookie, so that my authentication token is not accessible to JavaScript.
17. As a user, I want the app to redirect me to create my first Area when I have no Commitments set up yet, so that I am guided immediately into a useful state rather than seeing an empty dashboard.
18. As a user, I want bottom tab navigation between Check-in, Dashboard, Areas, and Weekly Review, so that the core surfaces are always one tap away on mobile.
19. As a user, I want the check-in screen to be optimised for mobile with large tap targets and minimal typing, so that the daily habit is as frictionless as possible.
20. As a user, I want to edit an existing Area's name and weight, so that I can adjust my priorities over time.
21. As a user, I want to delete a Commitment, so that I can remove goals I no longer want to track.
22. As a user, I want to delete an Area and all its Commitments, so that I can remove life domains I no longer track.
23. As a user, I want to edit a Commitment's title, target count, or unit, so that I can adjust goals during a Weekly Review.

## Implementation Decisions

### Domain model
- Area: { id, title, weight: number } — weight is a positive integer relative multiplier, not a percentage.
- Commitment: { id, areaId, title, targetCount: number, unit: string } — belongs to exactly one Area, carries no per-commitment weight.
- Check-in: { id, commitmentId, date: ISO date string YYYY-MM-DD, count: number } — one record per commitment per day. Absence of a record means zero.
- Score: derived, never stored. Computed on demand from Check-ins.

### Score formula
- commitmentScore = min(sum of daily Check-in counts for the week, targetCount) / targetCount x 100, capped at 100.
- areaScore = average of commitmentScores for all Commitments in the Area.
- weeklyScore = sum(areaScore x areaWeight) / sum(areaWeights) — weighted average across all Areas.
- Streak threshold constant: STREAK_THRESHOLD = 80.

### Week boundaries
- Weeks run Monday–Sunday (ISO week convention), fixed, not user-configurable.
- The current week is derived from today's date at query time — no week record is stored.

### Auth
- Custom JWT implementation. No third-party auth provider.
- Token stored in an httpOnly, Secure, SameSite=Strict cookie — not in localStorage.
- Endpoints: POST /auth/signup, POST /auth/login, POST /auth/logout.
- Single-user in practice for v1; sign-up is implemented but not publicly linked.

### API shape
- All data routes are protected by JWT middleware.
- Resource endpoints follow standard REST conventions: GET/POST /areas, GET/PATCH/DELETE /areas/:id, GET/POST /areas/:id/commitments, PATCH/DELETE /commitments/:id, GET/POST /checkins, GET /score/weekly, GET /score/history, GET /streak.

### Stack
- Frontend: React + TypeScript, Chakra UI v3, React Hook Form + Zod, deployed to Vercel.
- Backend: Node.js + Hono, Drizzle ORM, Neon managed Postgres, deployed to Render.
- Zod schemas are the source of truth for all data shapes — TypeScript types are derived from them.

### Frontend structure
- Feature-based folders: /checkin, /dashboard, /areas, /weekly-review, /auth.
- One named export per file, no default exports.
- Mobile-first — Check-in screen is the primary surface.
- Four tab screens: Check-in (home), Dashboard, Areas, Weekly Review.

## Testing Decisions

- Good tests verify external behaviour, not implementation details: given these inputs, what does the user observe? Tests must not assert on internal state, private functions, or component internals.
- Score logic is the highest-value test target. Extract computeCommitmentScore, computeAreaScore, and computeWeeklyScore as pure functions and test them directly with plain unit tests — no DB, no HTTP, no React.
- API integration tests should hit the real Hono router with a real test DB (not mocked). Test the auth flow (signup, login, protected route) and the check-in to score pipeline end-to-end.
- No snapshot tests — they test implementation shape, not behaviour.
- Prior art: none yet (green-field). The score functions are the first seam to establish.

## Out of Scope

- Multi-user support and public registration in v1.
- Free-text reflection fields in the Weekly Review (v2+).
- Push notifications or reminders.
- Data export or import.
- Offline support.
- Per-Commitment weights (weights live at the Area level only).
- A configurable week start day (Monday is fixed).
- Overachievement bonuses (Commitment score is hard-capped at 100).

## Further Notes

- The core promise — "a score you cannot lie to yourself about" — depends entirely on the silence-is-zero rule (ADR 0002) and the cap-at-100 rule (ADR 0001). Any future feature that weakens either should be treated with high suspicion.
- Streak threshold of 80 is a product constant. It is not user-configurable in v1, but it is a named constant (STREAK_THRESHOLD) so it can be revisited without a grep.
- The Weekly Review screen is intentionally not a gate. The new week starts on Monday whether or not the user has reviewed — forcing a review would break the Streak and punish people for being busy.
