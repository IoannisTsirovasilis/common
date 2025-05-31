#!/usr/bin/env node

import { execSync } from "child_process";
import { readdirSync, statSync } from "fs";
import { join } from "path";

function run(cmd: string) {
  return execSync(cmd, { stdio: "pipe" }).toString().trim();
}

let tag;
try {
  tag = run("git describe --tags --abbrev=0");
} catch (err) {
  console.error(
    "❌  Could not find a Git tag:",
    err instanceof Error ? err.message : String(err),
  );
  process.exit(1);
}

const pkgsDir = "packages";
let pkgs;
try {
  pkgs = readdirSync(pkgsDir).filter((name) =>
    statSync(join(pkgsDir, name)).isDirectory(),
  );
} catch (err) {
  console.error(
    "❌  Could not read packages directory:",
    err instanceof Error ? err.message : String(err),
  );
  process.exit(1);
}

pkgs.forEach((name) => {
  console.log(`\n=== ${name} ===`);
  try {
    const diff = run(
      `git diff --name-only ${tag} HEAD -- "${join("packages", name)}"`,
    );
    console.log(diff || "(no changes)");
  } catch {
    console.log("(no changes)");
  }
});
