// Stresstest: prüft, ob 25 typische Spielbegriffe sich mit der aktuellen
// Wortliste in 1–3 Sätzen erklären lassen (Munroe-Philosophie).
//
// Nicht-blockierend: gibt Bericht aus, welche Wörter in den Beispiel-
// Erklärungen NICHT erlaubt sind. Das sind Hinweise, welche Erklär-Wörter
// noch in words.de.json gehören (oder welche Beispiel-Erklärungen umzu-
// formulieren sind).
//
// Bedienung: `node test.stress.mjs`

import { readFileSync } from 'node:fs';
import { createContext, Script } from 'node:vm';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dir = dirname(fileURLToPath(import.meta.url));
const words = JSON.parse(readFileSync(join(__dir, 'words.de.json'), 'utf8'));

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
    documentElement: { lang: 'de' },
  },
  navigator: { serviceWorker: { register: () => {} } },
  fetch: () => new Promise(() => {}),
  console, Promise, Set, Map,
};

const ctx = createContext(sandbox);
new Script(readFileSync(join(__dir, 'script.js'), 'utf8')).runInContext(ctx);
ctx.wordSet = new Set(words);
const isAllowed = ctx.isAllowed;

// 25 Spielbegriffe mit Beispiel-Erklärungen.
// Erklärungen sollen nur Wörter aus der Liste verwenden.
// Der Spielbegriff (ziel) selbst darf NICHT in der Erklärung vorkommen.
const probes = [
  { ziel: 'klavier',      erklaerung: 'große kiste mit weißen und schwarzen tasten die töne macht wenn man sie drückt' },
  { ziel: 'gitarre',      erklaerung: 'ding aus holz mit fäden das man in der hand hält und töne macht wenn man die fäden zieht' },
  { ziel: 'trommel',      erklaerung: 'runde kiste mit einer haut darüber auf die man schlägt um töne zu machen' },
  { ziel: 'geige',        erklaerung: 'kleines ding aus holz mit fäden auf das man mit einem stock fährt um töne zu machen' },
  { ziel: 'fahrrad',      erklaerung: 'ding mit zwei runden teilen auf dem man sitzt und mit den beinen drückt damit es fährt' },
  { ziel: 'flugzeug',     erklaerung: 'großes ding mit flügeln das durch die luft fliegt und menschen über das meer trägt' },
  { ziel: 'fernseher',    erklaerung: 'kiste die bewegte bilder zeigt und töne macht und in jedem haus steht' },
  { ziel: 'computer',     erklaerung: 'kiste die rechnet und denkt und der man fragen stellen kann' },
  { ziel: 'telefon',      erklaerung: 'kleines ding mit dem man mit menschen sprechen kann die weit weg sind' },
  { ziel: 'hotel',        erklaerung: 'haus in dem fremde menschen schlafen wenn sie weit weg von zu hause sind' },
  { ziel: 'restaurant',   erklaerung: 'haus in das man geht um essen zu bekommen für geld' },
  { ziel: 'kirche',       erklaerung: 'großes haus in das menschen gehen um über gott zu sprechen und zu singen' },
  { ziel: 'bahnhof',      erklaerung: 'großer platz wo lange wagen aus eisen halten und menschen ein und aus steigen' },
  { ziel: 'tunnel',       erklaerung: 'langes loch durch einen berg oder unter der erde durch das man fahren kann' },
  { ziel: 'brücke',       erklaerung: 'weg der über einen fluss oder eine straße führt damit man auf die andere seite gehen kann' },
  { ziel: 'garage',       erklaerung: 'kleines haus neben dem haus in dem man sein fahrendes ding stehen lässt' },
  { ziel: 'balkon',       erklaerung: 'kleiner platz draußen am haus auf dem man stehen kann ohne runter zu fallen' },
  { ziel: 'batterie',     erklaerung: 'kleine kiste in der man kraft sammelt damit ein ding ohne kabel laufen kann' },
  { ziel: 'magnet',       erklaerung: 'stein der eisen ohne kabel zu sich zieht und nicht mehr weg gehen lässt' },
  { ziel: 'pilot',        erklaerung: 'mensch der ein fliegendes ding durch die luft führt' },
  { ziel: 'polizist',     erklaerung: 'mensch der dafür sorgt dass alle sich an die regeln halten und die bösen fängt' },
  { ziel: 'arzt',         erklaerung: 'mensch der kranken menschen hilft wieder gesund zu werden' },
  { ziel: 'lehrer',       erklaerung: 'mensch der eine gruppe von kindern zusammen bringt und ihnen neue dinge zeigt' },
  { ziel: 'hund',         erklaerung: 'tier mit vier beinen und einem schwanz das bei menschen wohnt und laute töne macht' },
  { ziel: 'elefant',      erklaerung: 'sehr großes graues tier mit einer langen nase und großen ohren' },
];

let voll_erklaerbar = 0;
const fehlende_woerter = new Map();
const berichte = [];

for (const { ziel, erklaerung } of probes) {
  // Aufteilen in Wörter (ohne Satzzeichen)
  const tokens = erklaerung.split(/\s+/).filter(t => t.length > 0);
  // Spielbegriff selbst darf nicht in der Erklärung vorkommen
  const verboten = tokens.filter(t => t.toLowerCase() === ziel);
  // Nicht-erlaubte Wörter
  const fehlend = tokens.filter(t => !isAllowed(t));

  if (verboten.length > 0) {
    berichte.push(`✗ ${ziel.padEnd(12)} | ENTHÄLT ZIEL: ${verboten.join(', ')}`);
  } else if (fehlend.length === 0) {
    voll_erklaerbar++;
    berichte.push(`✓ ${ziel.padEnd(12)} | erklärbar`);
  } else {
    berichte.push(`✗ ${ziel.padEnd(12)} | fehlt: ${fehlend.join(', ')}`);
    for (const w of fehlend) {
      fehlende_woerter.set(w, (fehlende_woerter.get(w) || 0) + 1);
    }
  }
}

console.log('\n=== Stresstest: Erklärbarkeit von Spielbegriffen ===\n');
for (const b of berichte) console.log(b);

console.log(`\n=== Ergebnis: ${voll_erklaerbar} von ${probes.length} Spielbegriffen voll erklärbar ===`);

if (fehlende_woerter.size > 0) {
  console.log('\n=== Häufig fehlende Wörter (Kandidaten für words.de.json) ===');
  const sortiert = [...fehlende_woerter.entries()].sort((a, b) => b[1] - a[1]);
  for (const [wort, anzahl] of sortiert) {
    console.log(`  ${anzahl}x  ${wort}`);
  }
} else {
  console.log('\nAlle Beispiel-Erklärungen kommen mit der Wortliste aus.');
}
