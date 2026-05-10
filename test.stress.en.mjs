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
// Explanations must use only words from the list.
// The game term itself must NOT appear in the explanation.
const probes = [
  { target: 'piano',      explanation: 'a large box with black and white keys that makes sounds when you press them down' },
  { target: 'guitar',     explanation: 'a thing made of wood with strings that you hold in your hands and pull to make sounds' },
  { target: 'drum',       explanation: 'a round thing with a skin on top that you hit to make sounds' },
  { target: 'violin',     explanation: 'a small thing made of wood with strings that you pull a long stick across to make sounds' },
  { target: 'bicycle',    explanation: 'a thing with two round parts that you sit on and push with your legs to make it go forward' },
  { target: 'airplane',   explanation: 'a large thing with wide arms that flies through the air and carries people across the sea' },
  { target: 'television', explanation: 'a box that shows moving images and makes sounds and sits in many homes' },
  { target: 'computer',   explanation: 'a machine that can think and count and that you can ask questions' },
  { target: 'telephone',  explanation: 'a small thing that lets you speak with people who are far away' },
  { target: 'hotel',      explanation: 'a building where people who are away from home can sleep in exchange for money' },
  { target: 'restaurant', explanation: 'a place where you go to get food in exchange for money' },
  { target: 'church',     explanation: 'a large building where people go to speak about god and to sing together' },
  { target: 'station',    explanation: 'a large place where long iron things stop and people get on and off' },
  { target: 'tunnel',     explanation: 'a long hole through a hill or under the ground that you can go through' },
  { target: 'bridge',     explanation: 'a path that goes over a river or road so that you can get to the other side' },
  { target: 'garage',     explanation: 'a small building next to a home where you keep your moving thing' },
  { target: 'battery',    explanation: 'a small thing that stores energy so a device can run without a cord' },
  { target: 'magnet',     explanation: 'a stone that pulls iron toward it without touching and will not let go' },
  { target: 'pilot',      explanation: 'a person who guides a flying thing through the air' },
  { target: 'doctor',     explanation: 'a person who helps sick people feel better and get well again' },
  { target: 'teacher',    explanation: 'a person who brings a group of children together and shows them new things' },
  { target: 'soldier',    explanation: 'a person who fights for a country when there is a war' },
  { target: 'dog',        explanation: 'an animal with four legs and a tail that lives with people and makes loud sounds' },
  { target: 'elephant',   explanation: 'a very large gray animal with a long nose and big ears' },
  { target: 'printer',    explanation: 'a machine that takes images or words from a computer and puts them on paper' },
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
