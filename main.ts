// The World in One Day — 18 November 2026 (full-day refresh entry, v2).
// Sums up the full day of Wednesday 18 November 2026 in a single image,
// replacing the morning-only v1. Node 22, stdlib only: copies entry.png
// (sitting beside this file) into the output directory, then verifies the
// copy is whole (same byte size as the source) and still a PNG (magic bytes).

import { copyFileSync, existsSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

const scriptDir = dirname(fileURLToPath(import.meta.url));
const sourcePath = join(scriptDir, "entry.png");
const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const outputPath = join(outputDir, "entry.png");

if (!existsSync(sourcePath)) {
  throw new Error(`Source image not found: ${sourcePath}`);
}

mkdirSync(outputDir, { recursive: true });
copyFileSync(sourcePath, outputPath);

const sourceSize = statSync(sourcePath).size;
const outputSize = statSync(outputPath).size;
if (outputSize !== sourceSize) {
  throw new Error(
    `Copy incomplete: wrote ${outputSize} bytes, expected ${sourceSize} bytes`,
  );
}

const header = readFileSync(outputPath).subarray(0, 8);
if (!header.equals(PNG_MAGIC)) {
  throw new Error("Output is not a valid PNG (bad magic bytes)");
}

console.log(`Wrote ${outputPath} (${outputSize} bytes)`);
