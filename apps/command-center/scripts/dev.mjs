import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const args = process.argv.slice(2).filter((arg) => arg !== "--");
const hasPort = args.includes("-p") || args.includes("--port");
const nextArgs = ["dev", ...(hasPort ? args : ["-p", "8400", ...args])];
const nextBin = fileURLToPath(new URL("../node_modules/next/dist/bin/next", import.meta.url));

const child = spawn(process.execPath, [nextBin, ...nextArgs], {
  stdio: "inherit",
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});
