import { rmSync } from "node:fs";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

rmSync("tsconfig.tsbuildinfo", { force: true });

const tscBin = fileURLToPath(new URL("../node_modules/typescript/bin/tsc", import.meta.url));

const child = spawn(process.execPath, [tscBin, "--noEmit", "-p", "tsconfig.typecheck.json"], {
  stdio: "inherit",
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});
