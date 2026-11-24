// Two Days of Quiet Dread — one-line code review comment approving a PR
// with quiet existential dread. Writes the comment to /output/entry.txt
// (or $OUTPUT_PATH when set), with no trailing newline.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const LINE =
  "Approved. I understood it for a moment, and that moment has passed.";

function validateLine(line: string): void {
  if (line.length < 1 || line.length > 140) {
    throw new Error(`entry must be 1-140 characters, got ${line.length}`);
  }
  if (line.trim().length === 0) throw new Error("entry must not be whitespace-only");
  if (/[\r\n]/.test(line)) throw new Error("entry must be a single line");
  // eslint-disable-next-line no-control-regex
  if (/[\u0000-\u001f\u007f]/.test(line)) {
    throw new Error("entry must not contain control characters");
  }
  if (!/[A-Za-z]/.test(line)) throw new Error("entry must contain letters");
}

function main(): void {
  validateLine(LINE);
  const out = process.env.OUTPUT_PATH ?? "/output/entry.txt";
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, LINE, "utf8");
}

main();
