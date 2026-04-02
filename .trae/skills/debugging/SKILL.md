---
name: "systematic-debugging"
description: "Four-phase debugging framework that ensures root cause investigation before attempting fixes. Invoke when encountering any bug or test failure."
---

# Systematic Debugging

Always find the root cause before attempting fixes. Symptom fixes are failures.

## The Iron Law
**NO FIXES WITHOUT ROOT CAUSE INVESTIGATION FIRST.**

## The Four Phases

### Phase 1: Root Cause Investigation
- **Read Error Messages**: Don't skip past them; read stack traces completely.
- **Reproduce Consistently**: Trigger the bug reliably before trying to fix it.
- **Trace Data Flow**: Where does the bad value originate? Trace it back to the source.

### Phase 2: Pattern Analysis
- **Find Working Examples**: Locate similar code that works.
- **Compare**: What is different between the working and broken code?

### Phase 3: Hypothesis and Testing
- **Form Hypothesis**: "I think X is the root cause because Y."
- **Test Minimally**: Make the smallest possible change to test the hypothesis.

### Phase 4: Implementation
- **Create Failing Test**: See the `tdd` skill.
- **Implement Fix**: Address the root cause, not the symptom.
- **Verify**: Confirm the fix works and no regressions were introduced.

## Red Flags
- "Quick fix for now, investigate later."
- "Just try changing X and see if it works."
- Proposing solutions before tracing data flow.

## Remember
- If 3+ fixes failed, stop and question the architecture.
- Systematic debugging is faster than guess-and-check thrashing.
