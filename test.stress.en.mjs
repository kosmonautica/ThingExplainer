// Stress test: checks whether 25 typical game terms can be explained using
// the current word list in 1–3 sentences (Munroe philosophy).
//
// Non-blocking: reports which words in the example explanations are NOT
// allowed. These are hints about which explanation words might still be
// needed in words.en.json (or which example explanations need rephrasing).
//
// Usage: `node test.stress.en.mjs`

import { readFileSync } from 'node:fs';
import { createContext, Script } from 'node:vm';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dir = dirname(fileURLToPath(import.meta.url));
const words = JSON.parse(readFileSync(join(__dir, 'words.en.json'), 'utf8'));

const el = () => ({
  addEventListener: () => {}, appendChild: () => {}, scrollTop: 0, value: '',
  innerHTML: '', hidden: false, textContent: '', dataset: {}, className: '',
  querySelectorAll: () => [], scrollIntoView: () => {},
  classList: { toggle: () => {}, add: () => {}, remove: () => {} },
});

const sandbox = {
  document: {
    getElementById: () => el(),
    createElement: () => ({ ...el(), dataset: {}, className: '', appendChild: () => {} }),
    querySelectorAll: () => [],
    documentElement: { lang: 'en' },
  },
  navigator: { serviceWorker: { register: () => {} } },
  fetch: () => new Promise(() => {}),
  console, Promise, Set, Map,
};

const ctx = createContext(sandbox);
new Script(readFileSync(join(__dir, 'script.js'), 'utf8')).runInContext(ctx);
ctx.currentLang = 'en';
ctx.wordSet = new Set(words);
const isAllowed = ctx.isAllowed;

// 25 game terms with example explanations (Munroe philosophy).
// Targets are words NOT in the list — they must be paraphrased using only allowed words.
const probes = [
  { target: 'piano',        explanation: 'a large box with black and white keys that makes music when you press them' },
  { target: 'guitar',        explanation: 'a thing made of wood with thin lines that you hold and pull to make music' },
  { target: 'drum',          explanation: 'a round box with skin on top that you hit to make sound' },
  { target: 'violin',        explanation: 'a small wooden thing with thin lines that you draw a stick across to make music' },
  { target: 'bicycle',       explanation: 'a thing with two wheels that you sit on and push with your legs' },
  { target: 'airplane',      explanation: 'a large thing with wide wings that flies through the air carrying people' },
  { target: 'helicopter',    explanation: 'a flying machine with long arms that turn fast above it' },
  { target: 'motorcycle',    explanation: 'a fast two wheel machine that one or two people ride on the road' },
  { target: 'telephone',     explanation: 'a small thing that lets you speak with people who are far away' },
  { target: 'microwave',     explanation: 'a small box that makes food hot using waves you cannot see' },
  { target: 'refrigerator',  explanation: 'a tall box that keeps food cold so it stays good for many days' },
  { target: 'restaurant',    explanation: 'a place where you go to eat food made by other people' },
  { target: 'tunnel',        explanation: 'a long hole through a hill or under the ground that you can go through' },
  { target: 'garage',        explanation: 'a small building next to a house where you keep your car' },
  { target: 'battery',       explanation: 'a small thing that holds power so a machine can run without a cord' },
  { target: 'magnet',        explanation: 'a stone that pulls iron toward it without touching and will not let go' },
  { target: 'pilot',         explanation: 'a person who guides a flying machine through the air' },
  { target: 'dentist',       explanation: 'a doctor who looks at and fixes the teeth of other people' },
  { target: 'plumber',       explanation: 'a person who fixes the pipes that carry water through a house' },
  { target: 'elephant',      explanation: 'a very large gray animal with a long nose and big ears' },
  { target: 'tiger',         explanation: 'a large wild cat with orange and black hair that lives in hot forests' },
  { target: 'lion',          explanation: 'a large wild cat with long yellow hair around its head that lives in hot lands' },
  { target: 'rabbit',        explanation: 'a small soft animal with long ears that jumps and eats grass' },
  { target: 'printer',       explanation: 'a machine that puts words and images from a computer onto paper' },
  { target: 'scanner',       explanation: 'a machine that takes a paper image and copies it into a computer' },
];

let fully_explainable = 0;
const missing_words = new Map();
const reports = [];

for (const { target, explanation } of probes) {
  const tokens = explanation.split(/\s+/).filter(t => t.length > 0);
  const forbidden_use = tokens.filter(t => t.toLowerCase() === target);
  const missing = tokens.filter(t => !isAllowed(t));

  if (forbidden_use.length > 0) {
    reports.push(`✗ ${target.padEnd(14)} | CONTAINS TARGET: ${forbidden_use.join(', ')}`);
  } else if (missing.length === 0) {
    fully_explainable++;
    reports.push(`✓ ${target.padEnd(14)} | explainable`);
  } else {
    reports.push(`✗ ${target.padEnd(14)} | missing: ${missing.join(', ')}`);
    for (const w of missing) {
      missing_words.set(w, (missing_words.get(w) || 0) + 1);
    }
  }
}

console.log('\n=== Stress test: explainability of game terms ===\n');
for (const r of reports) console.log(r);

console.log(`\n=== Result: ${fully_explainable} of ${probes.length} game terms fully explainable ===`);

if (missing_words.size > 0) {
  console.log('\n=== Frequently missing words (candidates for words.en.json) ===');
  const sorted = [...missing_words.entries()].sort((a, b) => b[1] - a[1]);
  for (const [word, count] of sorted) {
    console.log(`  ${count}x  ${word}`);
  }
} else {
  console.log('\nAll example explanations work with the current word list.');
}
