# AI Build Orchestration

## Purpose

This document defines the fast-build operating system for NeoHaven AI Urban Labs.

The goal is to coordinate ChatGPT, Claude, Codex, local files, and GitHub without losing context or duplicating work.

## Roles

### ChatGPT

Role: project architect, GitHub coordinator, reviewer, task planner, product strategist.

Responsibilities:

- Maintain the master plan.
- Create GitHub issues and pull requests when possible.
- Review Codex and Claude outputs through GitHub.
- Keep product strategy aligned with SolarHub.
- Convert messy notes into clean repo documents.
- Decide next tasks and acceptance criteria.

### Claude

Role: deep coding assistant and implementation planner.

Responsibilities:

- Work from structured task prompts.
- Edit local files when connected to the local workspace.
- Produce complete files, patches, implementation notes, and test plans.
- Keep outputs compatible with the GitHub source of truth.
- Write clear handoff reports for ChatGPT and Codex.

### Codex

Role: repository implementation and verification agent.

Responsibilities:

- Clone or open repositories.
- Run installs, tests, builds, and smoke checks.
- Fix code errors.
- Open PRs.
- Paste exact reports into GitHub issues.

### Local Code Environment

Role: workspace with access to the user's machine files.

Responsibilities:

- Run local apps.
- Capture screenshots.
- Record demo videos.
- Validate multi-service local runs.
- Push changes to GitHub when needed.

### GitHub

Role: source of truth.

Responsibilities:

- Store code, docs, prompts, issues, PRs, and validation reports.
- Enable ChatGPT to inspect work reliably.
- Preserve stable history across accounts and tools.

## Golden Rule

If work is not in GitHub or pasted into a GitHub issue, ChatGPT may not be able to access it reliably.

## Standard Flow

1. ChatGPT creates task package in GitHub.
2. Claude receives task prompt and produces files or implementation plan.
3. Codex implements or verifies in repo/local environment.
4. Codex opens PR or comments report on issue.
5. ChatGPT reviews GitHub result.
6. ChatGPT merges, fixes, or creates the next task.

## Handoff Format

Every Claude or Codex task must end with:

- Repository used
- Branch used
- Files changed
- Commands run
- Tests passed
- Tests failed
- Screenshots or links
- PR link
- Remaining blockers
- Suggested next task

## Current Build Priorities

1. Verify NOVA Command Center locally.
2. Run full multi-service SolarHub demo.
3. Capture screenshots.
4. Record demo video.
5. Convert demo package into pitch deck.
6. Add investor/demo one-pager.
7. Polish UI for September pitch.

## Repository Map

- `NeoHaven-repo-root`: master knowledge base and NOVA Command Center
- `neoagro-platform`: NOVA Agriculture / NeoAgro
- `nova-core`: NOVA Core AI v0
- `neogrid-platform`: NOVA Energy / NeoGrid
- `neocell-platform`: NOVA Infrastructure / NeoCell

## Decision Policy

- Do not wait for perfect local file organization.
- Build and validate through GitHub first.
- Use local files only for running, screenshots, and videos.
- Prefer small PRs.
- Keep all demos deterministic and able to run in fallback mode.
