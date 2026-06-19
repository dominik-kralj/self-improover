# Score formula: capped per commitment, averaged within area, weighted across areas

Commitment scores are capped at 100 so that overachieving one Commitment cannot compensate for failing another. Within an Area, Commitments are equally weighted and their scores are averaged. Across Areas, the weekly Score is a weighted average using each Area's relative weight. This keeps the score honest — it measures follow-through on the plan you set, not total output volume.

## Considered options

**Uncapped commitment scores** — rejected because a user who runs 8 times against a target of 4 should not be able to ignore a Commitment they skipped entirely.

**Per-commitment weights** — rejected because the added configuration surface produces friction without meaningfully improving accountability. Weights live at the Area level only.
