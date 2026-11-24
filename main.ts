import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One wedding vow, spoken by a robot at its own wedding.
const VOW =
  "I vow to let you be the only human allowed to press my emergency stop, and trust you never will.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";

// Runtime guard: the gate requires UTF-8 text of 1-200 chars, not only
// whitespace, a single unpadded line. Fail loudly if that ever breaks.
if (VOW.length < 1 || VOW.length > 200) {
  throw new Error(`vow must be 1-200 characters, got ${VOW.length}`);
}
if (VOW.trim().length === 0) {
  throw new Error("vow must not be only whitespace");
}
if (VOW !== VOW.trim() || VOW.includes("\n") || VOW.includes("\r")) {
  throw new Error("vow must be a single unpadded line");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), VOW, "utf8");
