---
name: "superpowers"
description: "An overview of the Superpowers development framework. Invoke when the user wants to learn about the superpowers development workflow or to see available skills."
---

# Superpowers Framework

Superpowers is a complete software development workflow for AI agents, built on a set of composable skills that enforce best practices like TDD, systematic debugging, and comprehensive planning.

## Core Skills

1. **Brainstorming** (`brainstorming`): Refine ideas into designs using the Socratic method.
2. **Writing Plans** (`writing-plans`): Create detailed, bite-sized implementation plans.
3. **Executing Plans** (`executing-plans`): Execute plans task-by-task with verification.
4. **Test-Driven Development** (`tdd`): Enforce the RED-GREEN-REFACTOR cycle.

## How to use

When you have a new task, start with `brainstorming`. Once the design is approved, use `writing-plans` to create a roadmap. Finally, use `executing-plans` (optionally with `tdd`) to implement the feature.

## Principles

- **Evidence over claims**: Always verify before declaring success.
- **TDD first**: Write the test before the code.
- **Bite-sized tasks**: Break complex work into 2-5 minute steps.
- **YAGNI**: You Ain't Gonna Need It - keep implementation minimal.
