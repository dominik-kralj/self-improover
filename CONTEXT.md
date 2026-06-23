# Self-Improover

A personal accountability system where users set weekly commitments across life areas, check in daily, and receive an honest score they cannot rationalise away.

## Language

**Area**:
A named life domain a user tracks (e.g. "Fitness", "Finance"). Each Area carries a relative weight that determines its influence on the weekly Score.
_Avoid_: Category, topic, domain, section

**Area weight**:
A positive integer expressing how much an Area contributes to the weekly Score relative to other Areas. Weights are not percentages — they are normalised automatically at calculation time.
_Avoid_: Priority, percentage, importance

**Commitment**:
A specific, measurable weekly goal within an Area, expressed as a target count and unit (e.g. "Run — 4 times"). A Commitment does not change week to week unless the user edits it during a Weekly Review.
_Avoid_: Goal, habit, task, activity

**Check-in**:
A numeric daily log entry against a single Commitment, recording how many times the user performed that Commitment on a given day. A day with no Check-in is treated as zero — not as unknown.
_Avoid_: Log, entry, record, progress update

**Commitment score**:
The percentage of a Commitment's target reached in a given week, capped at 100. Computed as: `min(sum of daily Check-ins, targetCount) / targetCount × 100`.
_Avoid_: Progress, completion rate

**Area score**:
The average Commitment score across all Commitments within an Area for a given week.
_Avoid_: Area progress, area result

**Score** (weekly score):
A number from 0 to 100 representing the user's overall follow-through for a given week. Computed as the weighted average of all Area scores, using Area weights.
_Avoid_: Result, grade, rating, points

**Streak**:
A count of consecutive weeks where the weekly Score is at or above the Streak threshold (80).
_Avoid_: Run, chain, combo

**Streak threshold**:
The minimum weekly Score required for a week to count toward a Streak. Fixed at 80.
_Avoid_: Passing score, target score

**Weekly Review**:
An optional end-of-week screen where the user sees their Score summary and may edit their Commitments before the next week begins. It is not a gate — the next week starts regardless.
_Avoid_: Retrospective, reflection, check-out
