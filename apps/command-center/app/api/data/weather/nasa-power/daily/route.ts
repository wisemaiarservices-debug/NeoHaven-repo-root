import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const CORE_API_URL = (
  process.env.NOVA_CORE_API_URL ||
  process.env.NEXT_PUBLIC_NOVA_CORE_API_URL ||
  "https://nova-core-api.neohaven.workers.dev"
).replace(/\/$/, "");

function validDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const rawLatitude = params.get("latitude");
  const rawLongitude = params.get("longitude");
  const latitude = rawLatitude === null || rawLatitude.trim() === "" ? Number.NaN : Number(rawLatitude);
  const longitude = rawLongitude === null || rawLongitude.trim() === "" ? Number.NaN : Number(rawLongitude);
  const startDate = params.get("start_date") ?? "";
  const endDate = params.get("end_date") ?? "";

  if (!Number.isFinite(latitude) || latitude < -90 || latitude > 90) {
    return NextResponse.json({ error: "Latitude must be between -90 and 90." }, { status: 400 });
  }
  if (!Number.isFinite(longitude) || longitude < -180 || longitude > 180) {
    return NextResponse.json({ error: "Longitude must be between -180 and 180." }, { status: 400 });
  }
  if (!validDate(startDate) || !validDate(endDate)) {
    return NextResponse.json({ error: "Use valid YYYY-MM-DD dates." }, { status: 400 });
  }
  const start = Date.parse(`${startDate}T00:00:00Z`);
  const end = Date.parse(`${endDate}T00:00:00Z`);
  if (end < start || end - start > 366 * 86400000) {
    return NextResponse.json({ error: "End date must be on or after start date; maximum range is 367 days." }, { status: 400 });
  }

  const url = new URL(`${CORE_API_URL}/api/v1/data/weather/nasa-power/daily`);
  url.search = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    start_date: startDate,
    end_date: endDate,
  }).toString();

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 25000);
  try {
    const upstream = await fetch(url, {
      cache: "no-store",
      signal: controller.signal,
      headers: { accept: "application/json" },
    });
    const body = await upstream.json().catch(() => ({ error: "NOVA Core returned a non-JSON response." }));
    return NextResponse.json(body, {
      status: upstream.status,
      headers: { "Cache-Control": "no-store, max-age=0" },
    });
  } catch (error) {
    const timedOut = error instanceof Error && error.name === "AbortError";
    return NextResponse.json(
      { error: timedOut ? "NOVA Core weather retrieval timed out." : "NOVA Core weather retrieval is unreachable." },
      { status: 502 },
    );
  } finally {
    clearTimeout(timeout);
  }
}
