const base = process.env.NOVA_COMMAND_CENTER_BASE_URL || "http://127.0.0.1:8400";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const statusResponse = await fetch(`${base}/api/system/status`, { cache: "no-store" });
assert(statusResponse.ok, `System status returned HTTP ${statusResponse.status}`);
const status = await statusResponse.json();

assert(typeof status.checkedAt === "string" && !Number.isNaN(Date.parse(status.checkedAt)), "checkedAt must be an ISO-compatible timestamp");
assert(status.core?.status === "online", "NOVA Core health must be online");
assert(typeof status.core.service === "string" && status.core.service.length > 0, "Core service identity must be present");
assert(["unconfigured", "unavailable", "schema_incomplete", "ready", "endpoint_not_deployed", "unreachable"].includes(status.persistence?.status), "Persistence status must use a documented state");
assert(status.platforms && typeof status.platforms === "object", "Platform status map must be present");

for (const id of ["operator", "engineering", "neoagro", "neogrid", "neocell"]) {
  const platform = status.platforms[id];
  assert(platform, `Missing platform status: ${id}`);
  assert(["reachable", "access_restricted", "unavailable"].includes(platform.website?.status), `Invalid website state for ${id}`);
  if (platform.kind === "module") {
    assert(platform.apiStatus === "unverified", `${id} API must remain explicitly unverified`);
  }
}

assert(status.dataTrust?.liveTelemetry === false, "System status must not claim live field telemetry");
assert(typeof status.dataTrust.note === "string" && status.dataTrust.note.length > 20, "Data trust explanation must be present");

const invalidWeatherResponse = await fetch(`${base}/api/data/weather/nasa-power/daily`, { cache: "no-store" });
assert(invalidWeatherResponse.status === 400, `Weather proxy must reject missing coordinates/dates; got HTTP ${invalidWeatherResponse.status}`);

const invalidLatitudeResponse = await fetch(`${base}/api/data/weather/nasa-power/daily?latitude=999&longitude=10&start_date=2025-01-01&end_date=2025-01-02`, { cache: "no-store" });
assert(invalidLatitudeResponse.status === 400, `Weather proxy must reject out-of-range latitude; got HTTP ${invalidLatitudeResponse.status}`);

console.log("Command Center runtime smoke tests passed: Core health, persistence contract, five platform states, telemetry trust gate, and weather proxy validation.");
