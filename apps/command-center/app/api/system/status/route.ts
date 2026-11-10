import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const CORE_API_URL = (
  process.env.NOVA_CORE_API_URL ||
  process.env.NEXT_PUBLIC_NOVA_CORE_API_URL ||
  "https://nova-core-api.neohaven.workers.dev"
).replace(/\/$/, "");

const platformTargets = {
  operator: { kind: "workspace", url: "https://nova-os-pied.vercel.app/os" },
  engineering: { kind: "workspace", url: "https://nova-os-pied.vercel.app/console" },
  neoagro: { kind: "module", url: "https://neoagro-six.vercel.app" },
  neogrid: { kind: "module", url: "https://neogrid-sigma.vercel.app" },
  neocell: { kind: "module", url: "https://neocell-ebon.vercel.app" },
} as const;

async function readEndpoint(path: string) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 4000);
  try {
    const response = await fetch(`${CORE_API_URL}${path}`, {
      cache: "no-store",
      signal: controller.signal,
      headers: { accept: "application/json" },
    });
    const body = await response.json().catch(() => null);
    return { ok: response.ok, statusCode: response.status, body };
  } catch (error) {
    return {
      ok: false,
      statusCode: 0,
      body: null,
      error: error instanceof Error && error.name === "AbortError" ? "timeout" : "unreachable",
    };
  } finally {
    clearTimeout(timeout);
  }
}

async function checkWebsite(url: string) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 4000);
  try {
    const response = await fetch(url, {
      method: "GET",
      cache: "no-store",
      redirect: "follow",
      signal: controller.signal,
      headers: { accept: "text/html" },
    });
    await response.body?.cancel().catch(() => undefined);
    return {
      status: response.ok ? "reachable" : response.status === 401 || response.status === 403 ? "access_restricted" : "unavailable",
      httpStatus: response.status,
    };
  } catch (error) {
    return {
      status: "unavailable",
      httpStatus: 0,
      error: error instanceof Error && error.name === "AbortError" ? "timeout" : "unreachable",
    };
  } finally {
    clearTimeout(timeout);
  }
}

export async function GET() {
  const [health, storage, ...websiteChecks] = await Promise.all([
    readEndpoint("/health"),
    readEndpoint("/api/v1/storage/status"),
    ...Object.values(platformTargets).map((target) => checkWebsite(target.url)),
  ]);

  const coreOnline = health.ok && health.body?.status === "ok";
  const storageState = storage.ok
    ? storage.body?.status ?? "unknown"
    : storage.statusCode === 404
      ? "endpoint_not_deployed"
      : storage.statusCode === 0
        ? "unreachable"
        : "unavailable";

  const platformEntries = Object.entries(platformTargets).map(([id, target], index) => [
    id,
    {
      kind: target.kind,
      url: target.url,
      website: websiteChecks[index],
      apiStatus: target.kind === "module" ? "unverified" : "not_applicable",
    },
  ]);
  const platforms = Object.fromEntries(platformEntries);

  return NextResponse.json(
    {
      checkedAt: new Date().toISOString(),
      core: {
        status: coreOnline ? "online" : "unavailable",
        service: health.body?.service ?? "NOVA Core API",
        endpoint: CORE_API_URL,
        httpStatus: health.statusCode || null,
      },
      persistence: {
        status: storageState,
        httpStatus: storage.statusCode || null,
        detail: storage.ok
          ? "D1 storage status returned by NOVA Core."
          : storageState === "endpoint_not_deployed"
            ? "The read-only storage status route is not present on the deployed Worker yet."
            : "Storage readiness could not be verified.",
      },
      platforms,
      dataTrust: {
        liveTelemetry: false,
        note: "Website reachability confirms only that a web response was received. It does not verify module APIs, field sensors, device health, persistent observations, or live telemetry. Dashboard scenario fixtures remain illustrative until verified source data is ingested.",
      },
    },
    { headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}
