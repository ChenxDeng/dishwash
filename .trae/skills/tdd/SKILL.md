---
name: "tdd"
description: "Enforce the RED-GREEN-REFACTOR cycle: write the test first, watch it fail, write minimal code to pass. Invoke when implementing any feature or bugfix."
---

# Test-Driven Development (TDD)

Write the test first. Watch it fail. Write minimal code to pass.

## The Iron Law
**NO PRODUCTION CODE WITHOUT A FAILING TEST FIRST.**

If you wrote code before the test, delete it and start over.

## Red-Green-Refactor Cycle

### RED - Write Failing Test
- Write ONE minimal test showing what should happen.
- Use real code (no mocks unless unavoidable).

### Verify RED - Watch It Fail
- Run the test and confirm it fails.
- Confirm the failure message is what you expected.
- **MANDATORY.** Never skip.

### GREEN - Minimal Code
- Write the simplest possible code to pass the test.
- Don't over-engineer.

### Verify GREEN - Watch It Pass
- Run the test and confirm it passes.
- Confirm all other tests still pass.

### REFACTOR - Clean Up
- After the test is green, clean up the code.
- Remove duplication, improve names, extract helpers.
- Keep the tests green throughout.

## When to Use
- New features
- Bug fixes
- Refactoring
- Behavior changes

## Why Order Matters
Tests written after code pass immediately and prove nothing. Test-first forces you to see the test fail, proving it actually tests something.

## Verification Checklist
- [ ] Every new function/method has a test.
- [ ] Watched each test fail before implementing.
- [ ] Each test failed for the expected reason.
- [ ] Wrote minimal code to pass each test.
- [ ] All tests pass.
- [ ] Output is pristine (no warnings/errors).

## Remember
- If you didn't watch the test fail, you don't know if it tests the right thing.
- Delete means delete. Don't "keep for reference".
