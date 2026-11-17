#!/usr/bin/env node
/**
 * Content gates (run in CI):
 *  1. Translation parity — bn.json and en.json have identical key paths and array lengths.
 *  2. Bangla script hygiene — bn.json contains no legacy Bijoy/SutonnyMJ (ANSI) characters
 *     and no stray Devanagari letters (an easy slip when typing Bangla).
 */
import { readFileSync } from "node:fs";

const load = (f) => JSON.parse(readFileSync(new URL(`../src/dictionaries/${f}`, import.meta.url), "utf8"));
const bn = load("bn.json");
const en = load("en.json");
const errors = [];

function shape(node, path, out) {
  if (Array.isArray(node)) {
    out.set(path, `array(${node.length})`);
    node.forEach((v, i) => shape(v, `${path}[${i}]`, out));
  } else if (node && typeof node === "object") {
    out.set(path, "object");
    for (const [k, v] of Object.entries(node)) shape(v, path ? `${path}.${k}` : k, out);
  } else {
    out.set(path, typeof node);
  }
  return out;
}

const a = shape(bn, "", new Map());
const b = shape(en, "", new Map());
for (const [k, t] of a) {
  if (!b.has(k)) errors.push(`en.json is missing ${k}`);
  else if (b.get(k) !== t) errors.push(`type/length mismatch at ${k}: bn=${t} en=${b.get(k)}`);
}
for (const k of b.keys()) if (!a.has(k)) errors.push(`en.json has extra key ${k} (not in bn.json)`);

// Characters typical of Bijoy/SutonnyMJ ANSI-encoded "Bangla" pasted from Word.
const BIJOY = /[¡-¿À-ÿ†‡‰ŒœŠšŸŽžƒˆ˜]/;
const BENGALI = /[\u0980-\u09FF]/;
// Devanagari letters/signs (the danda ।॥ U+0964/0965 is shared and allowed).
const DEVANAGARI = /[ऀ-ॣ०-ॿ]/;

(function walk(node, path) {
  if (typeof node === "string") {
    // Bijoy text has legacy symbols and no real Bengali letters; "©" next to Unicode Bangla is fine.
    if (BIJOY.test(node) && !BENGALI.test(node)) errors.push(`bn.json ${path}: looks like Bijoy/ANSI text, not Unicode: "${node}"`);
    if (DEVANAGARI.test(node)) errors.push(`bn.json ${path}: contains Devanagari characters: "${node}"`);
  } else if (Array.isArray(node)) node.forEach((v, i) => walk(v, `${path}[${i}]`));
  else if (node && typeof node === "object") for (const [k, v] of Object.entries(node)) walk(v, path ? `${path}.${k}` : k);
})(bn, "");

if (errors.length) {
  console.error(`✗ Content check failed (${errors.length}):\n  - ${errors.join("\n  - ")}`);
  process.exit(1);
}
console.log(`✓ Content check passed: ${a.size} keys in parity, Bangla text is clean Unicode.`);
