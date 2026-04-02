---
name: "writing-plans"
description: "Create detailed implementation plans with bite-sized tasks for engineers with zero codebase context. Invoke when design is complete and you need detailed implementation tasks."
---

# Writing Plans

Write comprehensive implementation plans assuming the engineer has zero context for our codebase. Document everything they need to know: which files to touch for each task, code, testing, docs they might need to check, how to test it.

## Bite-Sized Task Granularity
Each step is one action (2-5 minutes):
- "Write the failing test" - step
- "Run it to make sure it fails" - step
- "Implement minimal code to make the test pass" - step
- "Run tests and make sure they pass" - step
- "Commit" - step

## Plan Document Header
Every plan MUST start with this header:
# [Feature Name] Implementation Plan

> **For Claude/Trae:** Use `executing-plans` to implement this plan task-by-task.

**Goal:** [One sentence describing what this builds]
**Architecture:** [2-3 sentences about approach]
**Tech Stack:** [Key technologies/libraries]

---

## Task Structure
### Task N: [Component Name]

**Files:**
- Create: `exact/path/to/file.py`
- Modify: `exact/path/to/existing.py:123-145`
- Test: `tests/exact/path/to/test.py`

**Step 1: Write the failing test**
(Insert actual test code)

**Step 2: Run test to verify it fails**
(Insert command and expected FAIL output)

**Step 3: Write minimal implementation**
(Insert implementation code)

**Step 4: Run test to verify it passes**
(Insert command and expected PASS output)

**Step 5: Commit**
(Insert git command)

## Execution Handoff
After saving the plan, offer execution choice:
"Plan complete and saved to `docs/plans/<filename>.md`. Ready to execute?"

When partner confirms, use the `executing-plans` skill.
