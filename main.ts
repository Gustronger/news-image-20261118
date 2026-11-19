// The World in One Day — 18 November 2026 (v3, poster edition).
// Same full-day news as v2, redrawn as a dramatic poster: deep navy
// backdrop with a warm gold glow, one huge red lead headline, and
// translucent panels that melt into the background instead of sitting
// in rigid white boxes. Text stays crisp and legible throughout.
//
// Node 22, stdlib only. The program copies entry.png (which lives
// next to this file) into the output directory and then checks the
// copy: same byte size as the source, and a real PNG (magic bytes).

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
