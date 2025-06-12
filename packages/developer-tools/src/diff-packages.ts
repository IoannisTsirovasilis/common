#!/usr/bin/env node

import { execSync, spawnSync } from "child_process";
import { readdirSync, statSync, readFileSync } from "fs";
import { join } from "path";

const pkgsDir = "packages";

const dirNames = readAllSubDirectories(pkgsDir);

dirNames.forEach(showChangesForPackage);

function showChangesForPackage(dirName: string) {
  const pkgPath = join(pkgsDir, dirName);
  let pkgName: string;

  try {
    pkgName = readPackageJsonName(pkgPath);
  } catch (err) {
    console.error(
      `❌  Skipping “${dirName}” (could not read/parse package.json):`,
      err instanceof Error ? err.message : String(err),
    );
    return;
  }

  console.log(`\n=== ${pkgName} (dir: ${dirName}) ===`);

  const baseRef = getLastTag(pkgName);

  showChanges(baseRef, dirName, pkgsDir);
  showCommits(baseRef, dirName, pkgsDir);
}

function run(cmd: string): string {
  return execSync(cmd, { stdio: "pipe" }).toString().trim();
}

function readAllSubDirectories(packageDir: string) {
  try {
    const directoryNames = readdirSync(packageDir).filter((name) =>
      statSync(join(packageDir, name)).isDirectory(),
    );

    return directoryNames;
  } catch (err) {
    console.error(
      "❌  Could not read packages directory:",
      err instanceof Error ? err.message : String(err),
    );
    process.exit(1);
  }
}

function getLastTag(packageName: string) {
  const matchPattern = `${packageName}@v*`;
  const baseRefBuffer = spawnSync("git", [
    "describe",
    "--tags",
    "--abbrev=0",
    `--match=${matchPattern}`,
  ]);

  return String(baseRefBuffer.stdout).trim();
}

function readPackageJsonName(pkgPath: string) {
  const raw = readFileSync(join(pkgPath, "package.json"), "utf8");
  const pkgJson = JSON.parse(raw);
  if (!pkgJson.name || typeof pkgJson.name !== "string") {
    throw new Error("`name` field is missing or not a string");
  }

  return pkgJson.name;
}

function showChanges(baseRef: string, dirName: string, packagesDir: string) {
  try {
    const diff = run(
      `git diff --name-only ${baseRef} HEAD -- "${join(packagesDir, dirName)}"`,
    );
    console.log(diff || "(no changes)");
  } catch {
    console.log("(no changes)");
  }
}

function showCommits(baseRef: string, dirName: string, packagesDir: string) {
  try {
    const commitLog = run(
      `git log ${baseRef}..HEAD --pretty=format:"%h - %s" -- "${join(
        packagesDir,
        dirName,
      )}"`,
    );
    console.log(
      commitLog
        ? `Commits since ${baseRef}:\n${commitLog}`
        : "(no new commits)",
    );
  } catch {
    console.log("(no new commits)");
  }
}
