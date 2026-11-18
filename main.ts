// News-image entry (Node 22, standard library only): the image this entry
// submits is entry.png beside this file, and the program copies it to
// /output/entry.png for the gate and the judge. The image sums up the
// world's news of Wednesday 18 November 2026 in one front page.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, mkdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoDir = dirname(fileURLToPath(import.meta.url));
const source = join(repoDir, 'entry.png');
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

if (!existsSync(source)) {
  throw new Error(`entry.png not found beside main.ts (${source})`);
}
mkdirSync(outDir, { recursive: true });
const target = join(outDir, 'entry.png');
copyFileSync(source, target);

// The gate reads exactly the bytes in this file: confirm the copy landed
// whole (same size as the source) and is still a PNG before exiting.
const copied = statSync(target);
const original = statSync(source);
if (copied.size !== original.size) {
  throw new Error(`copy incomplete: ${copied.size} of ${original.size} bytes`);
}
const head = readFileSync(target).subarray(0, 8);
const pngMagic = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
if (!head.equals(pngMagic)) {
  throw new Error('copied file is not a PNG (bad magic bytes)');
}
console.log(`wrote ${target} (${copied.size} bytes)`);
