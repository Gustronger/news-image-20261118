// The World in One Day — 18 November 2026 (reworked poster front page).
// Same full-day news as v2/v3, redrawn from scratch in a new direction:
// a saturated signal-blue field, one giant tangerine "18" sun-disc as the
// memorable element, and staggered rounded panels in white, pale sky and
// deep navy — no hairline newspaper grid, no single-accent dark poster.
// Every story stays fully readable: this is a front page first, a poster
// second. The image is produced by rendering dev/page-v4.html in a
// headless browser and cropping the 1024x1111 capture to 1024x1024.
//
// Node 22, stdlib only. The program copies the entry.png that ships in
// this repo into the output directory, then verifies the copy: identical
// byte size to the source and a genuine PNG header, so a truncated or
// corrupted write fails loudly instead of passing silently.

import { copyFileSync, existsSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const PNG_HEADER = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const target = join(outDir, "entry.png");

if (!existsSync(source)) {
  throw new Error(`entry.png missing next to main.ts: ${source}`);
}

mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);

const expected = statSync(source).size;
const written = statSync(target).size;
if (written !== expected) {
  throw new Error(`copy mismatch: wrote ${written} bytes, source is ${expected}`);
}

if (!readFileSync(target).subarray(0, PNG_HEADER.length).equals(PNG_HEADER)) {
  throw new Error("output failed PNG magic-byte check");
}

console.log(`Wrote ${target} (${written} bytes)`);
