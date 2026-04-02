---
name: "executing-plans"
description: "Execute detailed plans in batches with review checkpoints. Invoke when partner provides a complete implementation plan to execute."
---

# Executing Plans

Load a plan, review it critically, execute tasks in batches, and report for review between batches.

## The Process

### Step 1: Load and Review Plan
- Read the plan file (e.g., in `docs/plans/`).
- Review critically - identify any questions or concerns.
- If no concerns: Create a `TodoWrite` list and proceed.

### Step 2: Execute Batch
- Default: Execute the first 3 tasks.
- For each task:
  - Mark as `in_progress` in the todo list.
  - Follow each step exactly (plans should have bite-sized steps).
  - Run verifications as specified.
  - Mark as `completed`.

### Step 3: Report
- When the batch is complete:
  - Show what was implemented.
  - Show verification output.
  - Say: "Ready for feedback."

### Step 4: Continue
- Based on feedback:
  - Apply changes if needed.
  - Execute the next batch.
  - Repeat until complete.

## When to Stop and Ask for Help
STOP executing immediately when:
- You hit a blocker mid-batch (missing dependency, test fails, instruction unclear).
- The plan has critical gaps.
- Verification fails repeatedly.

## Remember
- Review the plan critically first.
- Follow plan steps exactly.
- Don't skip verifications.
- Stop when blocked, don't guess.
- Announce skill usage at start.
