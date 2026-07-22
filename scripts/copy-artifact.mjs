import { copyFileSync, mkdirSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const appDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const destDir = resolve(appDir, "data");
const dest = resolve(destDir, "clinical-knowledge-artifact.json");
if (existsSync(dest)) {
  console.log(`[copy-artifact] using existing ${dest}`);
  process.exit(0);
}
const candidates = [
  resolve(appDir, "..", "..", "data", "clinical-knowledge-artifact.json"),
  resolve(appDir, "..", "..", "..", "data", "clinical-knowledge-artifact.json"),
  resolve(appDir, "..", "clinical-knowledge-artifact.json"),
];
const src = candidates.find((p) => existsSync(p));
if (!src) {
  console.error("[copy-artifact] no source found and data/ is empty; run the pipeline first.");
  process.exit(1);
}
mkdirSync(destDir, { recursive: true });
copyFileSync(src, dest);
console.log(`[copy-artifact] copied artifact -> ${dest}`);
