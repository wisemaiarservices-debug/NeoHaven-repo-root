# NOVA Command Center — $0 Cloudflare hosting assessment

## Decision

Keep the current Vercel project and production alias unchanged. Evaluate Cloudflare Workers as a separate preview-hosting path only; do not switch DNS, change the production alias, or remove Vercel.

The Command Center is a Next.js 14.2.23 App Router application with server route handlers. A static Pages export is not an equivalent host because the app uses server-side status checks and a server-side NOVA Core proxy.

## Current official Cloudflare guidance (reviewed 2026-11-10)

- Cloudflare's current Next.js guide recommends **vinext** as the default route for Next.js on Workers. The guide describes vinext as beta and advises running compatibility checks before adopting it for an existing production application.
- Cloudflare still documents the OpenNext adapter as an alternative for applications that cannot yet migrate to vinext. Its guide lists App Router, route handlers, SSR, React Server Components and static generation as supported.
- The repository currently uses Next.js 14.2.23. Do not assume that the newest vinext path is a drop-in replacement; test the existing app and all required features first.
- Cloudflare Workers Free currently lists 100,000 requests/day, 10 ms CPU time per invocation, 128 MB memory, and 50 external subrequests per invocation. Limits and plan terms can change.
- Cloudflare Workers Paid has a minimum account charge of USD $5/month. It is outside this project's $0-only constraint.

Official references:
- https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/
- https://developers.cloudflare.com/workers/framework-guides/web-apps/opennext/
- https://developers.cloudflare.com/workers/platform/limits/
- https://developers.cloudflare.com/workers/platform/pricing/

## Safe prototype plan

1. Create a separate preview Worker named `nova-command-center-preview`; do not reuse or overwrite `nova-core-api`, `nova-core-ingest-api`, or the existing `nova-os` project.
2. Run a compatibility assessment against the existing Next.js 14.2.23 app before changing its runtime. Prefer a non-destructive branch and preserve the existing `next dev` workflow.
3. Test every server route, including `/api/system/status` and `/api/data/weather/nasa-power/daily`, as well as the full App Router UI.
4. Confirm the preview Worker uses only the Cloudflare Free plan and no paid bindings, add-ons, or Workers Paid account requirement. Stop immediately if the dashboard or CLI asks for an upgrade or paid resource.
5. Keep the preview on its own `workers.dev` hostname. Do not change production DNS or the Vercel production alias.
6. Compare typecheck, production build, route behavior, response headers, static assets, and runtime CPU usage. Promote only after explicit review and a separate approval.

## Runtime and security requirements

- Keep NOVA Core API origin server-side where possible; do not expose credentials in client bundles.
- Website reachability checks are public outbound fetches to a fixed allowlist, not arbitrary URL proxying.
- Do not add a D1 binding or enable observation writes as part of hosting migration.
- Preserve the distinction between process health, module API health, device telemetry, and verified observations.
- Avoid relying on Cloudflare Workers Free's 10 ms CPU allowance until the actual rendered app has been measured on the target runtime.

## Current status

This is an architecture assessment only. No vinext/OpenNext dependency, Wrangler config, Worker, DNS record, Cloudflare binding, or deployment has been added for the Command Center. The current Vercel deployment and production alias remain unchanged.
