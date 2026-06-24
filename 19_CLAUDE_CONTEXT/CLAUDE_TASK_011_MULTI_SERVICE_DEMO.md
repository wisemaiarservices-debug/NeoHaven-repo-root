# Claude Task 011 — Multi-Service SolarHub Demo Support

## Goal

Prepare a multi-service local demo run package for Codex.

## Access Boundary

Claude does not directly access the user's local files in this workflow.

Codex is the local-file executor. Claude should produce clear commands, troubleshooting paths, patch suggestions, and a handoff package Codex can run locally and then push/report through GitHub.

## Repositories

- `neoagro-platform`
- `nova-core`
- `neogrid-platform`
- `neocell-platform`
- `NeoHaven-repo-root`

## GitHub Issue

`NeoHaven-repo-root` Issue #5

## Target ports

- NeoAgro API: `8000`
- NOVA Core API: `8100`
- NeoGrid API: `8200`
- NeoCell API: `8300`
- NOVA Command Center: `8400`

## Commands Codex should run locally

### NeoAgro

```powershell
cd neoagro-platform/apps/api
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### NOVA Core

```powershell
cd nova-core/apps/api
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install -r requirements-dev.txt
uvicorn main:app --reload --port 8100
```

### NeoGrid

```powershell
cd neogrid-platform/service
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install -r requirements-dev.txt
uvicorn main:app --reload --port 8200
```

### NeoCell

```powershell
cd neocell-platform/runtime
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install -r requirements-dev.txt
uvicorn app:app --reload --port 8300
```

### Command Center

```powershell
cd NeoHaven-repo-root/apps/command-center
npm install
$env:NEXT_PUBLIC_DEMO_MODE="false"
$env:NEXT_PUBLIC_NEOAGRO_API_URL="http://localhost:8000"
$env:NEXT_PUBLIC_NOVA_CORE_API_URL="http://localhost:8100"
$env:NEXT_PUBLIC_NEOGRID_API_URL="http://localhost:8200"
$env:NEXT_PUBLIC_NEOCELL_API_URL="http://localhost:8300"
npm run dev
```

Open:

```text
http://localhost:8400
```

## Expected Result

- All health endpoints return ok.
- Command Center renders.
- NeoAgro, NeoGrid, NeoCell show connected if running.
- NOVA Core shows connected if health endpoint is running.
- If a service fails, fallback mode still renders.

## Claude Output Required

Claude should provide Codex with:

- exact run order
- exact health checks
- likely local environment errors
- small fix patches if ports, CORS, env vars, or service fetches fail
- screenshot checklist
- final GitHub issue report template

## Handoff report

Claude should instruct Codex to paste report into GitHub Issue #5 in `NeoHaven-repo-root`.

Report must include:

- Which services started
- Which ports worked
- Which services showed connected
- Which showed fallback
- Screenshots captured
- Errors and fixes
- PR link if created
