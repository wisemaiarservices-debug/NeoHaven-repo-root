import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const CORE_API_URL = (
  process.env.NOVA_CORE_API_URL ||
  process.env.NEXT_PUBLIC_NOVA_CORE_API_URL ||
  "https://nova-core-api.neohaven.workers.dev"
).replace(/\/$/, "");

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

export async function GET() {
  const [health, storage] = await Promise.all([
    readEndpoint("/health"),
    readEndpoint("/api/v1/storage/status"),
  ]);

  const coreOnline = health.ok && health.body?.status === "ok";
  const storageState = storage.ok
    ? storage.body?.status ?? "unknown"
    : storage.statusCode === 404
      ? "endpoint_not_deployed"
      : storage.statusCode === 0
        ? "unreachable"
        : "unavailable";

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
      modules: {
        neoagro: { status: "ui_linked_api_unverified", url: "https://neoagro-six.vercel.app" },
        neogrid: { status: "ui_linked_api_unverified", url: "https://neogrid-sigma.vercel.app" },
        neocell: { status: "ui_linked_api_unverified", url: "https://neocell-ebon.vercel.app" },
      },
      dataTrust: {
        liveTelemetry: false,
        note: "A healthy API process does not prove that field sensors, module APIs, or persistent observations are connected. Existing dashboard charts remain illustrative scenario fixtures until verified source data is ingested.",
      },
    },
    { headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}
