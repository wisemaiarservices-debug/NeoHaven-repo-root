# AI Build Orchestration

## Purpose

This document defines the fast-build operating system for NeoHaven AI Urban Labs.

The goal is to coordinate ChatGPT, Claude, Codex, local files, and GitHub without losing context or duplicating work.

## Access Boundaries

### ChatGPT

Access level: GitHub connector and chat-provided content.

ChatGPT does not directly access the user's local machine files. ChatGPT reviews work through GitHub issues, pull requests, commits, and pasted reports.

### Claude

Access level: GitHub context and chat-provided content.

Claude does not directly access the user's local machine files in this workflow. Claude helps by producing implementation plans, full file contents, patches, prompts, and task packages that Codex can apply locally or in GitHub.

### Codex

Access level: local code environment plus GitHub.

Codex is the agent that can work with the user's local files, run commands, test builds, capture local results, create branches, update files, and push changes to GitHub.

### GitHub

Access level: shared source of truth for ChatGPT, Claude, and Codex.

Anything that must be reviewed by ChatGPT or reused by Claude/Codex should be committed to GitHub or pasted into a GitHub issue.

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
- Read GitHub context and produce implementation-ready files or patches.
- Produce complete file contents, patch plans, implementation notes, and test plans.
- Keep outputs compatible with the GitHub source of truth.
- Write clear handoff reports for ChatGPT and Codex.
- Provide files that Codex can apply locally and push to GitHub.

Claude should not be treated as the local-file executor. Codex is the local executor.

### Codex

Role: local repository implementation and verification agent.

Responsibilities:

- Clone or open repositories.
- Access local files.
- Apply Claude-provided files and patches.
- Run installs, tests, builds, smoke checks, and local demos.
- Fix code errors.
- Open PRs.
- Paste exact reports into GitHub issues.

### Local Code Environment

Role: workspace with access to the user's machine files.

Primary executor: Codex.

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
- Enable ChatGPT and Claude to inspect work reliably.
- Preserve stable history across accounts and tools.

## Golden Rule

If work is not in GitHub or pasted into a GitHub issue, ChatGPT and Claude may not be able to access it reliably.

## Standard Flow

1. ChatGPT creates task package in GitHub.
2. Claude receives task prompt and produces files, patches, or implementation plan.
3. Codex applies the files/patches locally or directly in the repo.
4. Codex runs tests, builds, and local verification.
5. Codex opens PR or comments report on issue.
6. ChatGPT reviews GitHub result.
7. ChatGPT merges, fixes, or creates the next task.

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
- Use local files only through Codex for running, screenshots, and videos.
- Use Claude for planning, full-file generation, patch drafting, and coding assistance.
- Prefer small PRs.
- Keep all demos deterministic and able to run in fallback mode.
