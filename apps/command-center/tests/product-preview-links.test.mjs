import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const data = readFileSync(new URL("../data/mockData.ts", import.meta.url), "utf8");
const panel = readFileSync(new URL("../components/nova/ProductStatusPanel.tsx", import.meta.url), "utf8");

test("linked product cards use the current labeled preview deployments", () => {
  const expected = [
    "https://neoagro-git-fix-neoagro-demo-proven-0f0f19-neo-haven-urban-labs.vercel.app",
    "https://neogrid-git-fix-neogrid-demo-proven-a503a5-neo-haven-urban-labs.vercel.app",
    "https://neocell-git-fix-neocell-demo-proven-82fc89-neo-haven-urban-labs.vercel.app",
  ];

  for (const url of expected) {
    assert.ok(data.includes(url), `missing preview URL: ${url}`);
  }

  for (const productionUrl of [
    "https://neoagro-six.vercel.app",
    "https://neogrid-sigma.vercel.app",
    "https://neocell-ebon.vercel.app",
  ]) {
    assert.ok(!data.includes(productionUrl), `production URL should not replace labeled preview: ${productionUrl}`);
  }
});

test("product navigation is explicitly preview-only and disclaims live integration", () => {
  assert.match(panel, /Product previews · navigation only/);
  assert.match(panel, /does not verify live Core connectivity, tenant authorization, telemetry, or module readiness/);
});
