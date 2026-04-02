---
name: "tracing-knowledge-lineages"
description: "Understand why code exists and the history of its design. Invoke before proposing changes to existing code."
---

# Tracing Knowledge Lineages

Understand why code exists before you change it. This is "Chesterton's Fence" applied to software engineering.

## The Process

### Step 1: Historical Context
- **Git History**: Use `git log -p` or `git blame` to see when and why code was changed.
- **Commit Messages**: Read the commit messages for context. They often explain the "why" that isn't in the code.

### Step 2: Design Intent
- **Find Related Docs**: Look for ADRs (Architecture Decision Records), comments, or specs.
- **Search Context**: Search for the symbol in the codebase to see how it's used elsewhere.

### Step 3: Impact Analysis
- **Identify Consumers**: Who depends on this code?
- **Check Edge Cases**: Does the existing implementation handle obscure cases you might miss?

## When to Use
- Before refactoring.
- Before deleting "dead" code.
- When existing code seems "wrong" or "over-engineered."

## Remember
- Code usually exists for a reason, even if that reason is no longer obvious.
- Understanding the history prevents you from re-introducing bugs that were already fixed.
