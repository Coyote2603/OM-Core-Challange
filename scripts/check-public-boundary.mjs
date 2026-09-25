#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDirectory, "..");
const manifestPath = path.join(repoRoot, "PUBLIC_CONTENT_MANIFEST.json");

if (!fs.existsSync(manifestPath)) {
  console.error("Missing PUBLIC_CONTENT_MANIFEST.json");
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const ignoredScanDirectories = new Set([".git", "node_modules"]);
const prohibitedDirectories = new Set(manifest.excludedDirectories || []);
const prohibitedExtensions = new Set(
  (manifest.prohibitedExtensions || []).map(extension => extension.toLowerCase().replace(/^\./, ""))
);
const runtimeTerms = manifest.prohibitedRuntimeTerms || [];
const globalPatterns = (manifest.prohibitedAllTextPatterns || []).map(
  pattern => new RegExp(pattern, "i")
);
const maxFileBytes = manifest.maxFileBytes || 2_000_000;
const failures = [];

function relativePath(filePath) {
  return path.relative(repoRoot, filePath).split(path.sep).join("/");
}

function collectFiles(target, output = []) {
  const stat = fs.lstatSync(target);
  if (stat.isSymbolicLink()) {
    failures.push(`${relativePath(target)} is a symbolic link`);
    return output;
  }
  if (stat.isDirectory()) {
    const name = path.basename(target);
    if (target !== repoRoot && ignoredScanDirectories.has(name)) return output;
    if (target !== repoRoot && prohibitedDirectories.has(name)) {
      failures.push(`${relativePath(target)}/ is a prohibited public directory`);
      return output;
    }
    for (const entry of fs.readdirSync(target)) {
      collectFiles(path.join(target, entry), output);
    }
    return output;
  }
  output.push(target);
  return output;
}

function collectRuntimeFiles() {
  const output = new Set();
  for (const item of manifest.runtimeRoots || []) {
    const target = path.join(repoRoot, item);
    if (!fs.existsSync(target)) {
      failures.push(`Runtime path does not exist: ${item}`);
      continue;
    }
    for (const file of collectFiles(target, [])) output.add(file);
  }
  return output;
}

function looksTextual(buffer) {
  const sample = buffer.subarray(0, Math.min(buffer.length, 8_192));
  return !sample.includes(0);
}

const allFiles = collectFiles(repoRoot, []);
const runtimeFiles = collectRuntimeFiles();

for (const file of allFiles) {
  const relative = relativePath(file);
  const stat = fs.statSync(file);
  const extension = path.extname(file).toLowerCase().replace(/^\./, "");

  if (stat.size > maxFileBytes) {
    failures.push(`${relative} exceeds the ${maxFileBytes}-byte public limit`);
  }
  if (prohibitedExtensions.has(extension)) {
    failures.push(`${relative} uses prohibited public asset type .${extension}`);
  }
  if (/^\.env(?:\.|$)/i.test(path.basename(file))) {
    failures.push(`${relative} is an environment or secret file`);
  }

  const buffer = fs.readFileSync(file);
  if (!looksTextual(buffer)) continue;
  const text = buffer.toString("utf8");

  for (const pattern of globalPatterns) {
    if (pattern.test(text)) {
      failures.push(`${relative} matches prohibited text pattern ${pattern}`);
    }
  }

  if (runtimeFiles.has(file)) {
    for (const term of runtimeTerms) {
      if (text.toLowerCase().includes(String(term).toLowerCase())) {
        failures.push(`${relative} contains prohibited runtime term "${term}"`);
      }
    }
  }
}

if (failures.length > 0) {
  console.error("Public-boundary check failed\n");
  for (const failure of [...new Set(failures)]) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `Public-boundary check passed for ${allFiles.length} files and ${runtimeFiles.size} runtime files.`
);
