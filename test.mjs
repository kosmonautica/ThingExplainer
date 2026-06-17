import { readFileSync } from 'node:fs';
import { createContext, Script } from 'node:vm';
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dir = dirname(fileURLToPath(import.meta.url));
const words = JSON.parse(readFileSync(join(__dir, 'words.de.json'), 'utf8'));

// Minimales DOM-Mock damit script.js geladen werden kann
const el = () => ({
  addEventListener: () => {},
  appendChild: () => {},
  scrollTop: 0,
  value: '',
  innerHTML: '',
  hidden: false,
  textContent: '',
  dataset: {},
  className: '',
  querySelectorAll: () => [],
  scrollIntoView: () => {},
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
  fetch: () => new Promise(() => {}), // nie auflösen – wordSet bleibt leer bis wir es manuell setzen
  console,
  Promise,
  Set,
  Map,
};

const ctx = createContext(sandbox);
new Script(readFileSync(join(__dir, 'script.js'), 'utf8')).runInContext(ctx);

// wordSet manuell befüllen (var-Deklaration macht es als ctx-Property erreichbar)
ctx.wordSet = new Set(words);

// ---------------------------------------------------------------------------
// words.json – Datenintegrität
// ---------------------------------------------------------------------------

describe('words.json – Datenintegrität', () => {
  test('Alle Einträge sind Strings', () => {
    const bad = words.filter(w => typeof w !== 'string');
    assert.deepEqual(bad, []);
  });

  test('Alle Einträge sind lowercase', () => {
    const bad = words.filter(w => w !== w.toLowerCase());
    assert.deepEqual(bad, []);
  });

  test('Keine Duplikate', () => {
    assert.equal(new Set(words).size, words.length);
  });

  test('Anzahl zwischen 1100 und 1200 Wörtern', () => {
    assert.ok(words.length >= 1100 && words.length <= 1200, `Tatsächlich: ${words.length}`);
  });

  test('Keine bekannten Anglizismen enthalten', () => {
    const anglizismen = ['computer', 'internet', 'team', 'app', 'software', 'email', 'chat', 'video', 'job', 'fair', 'chance', 'auto', 'taxi', 'gummi', 'sport', 'band'];
    const found = anglizismen.filter(w => words.includes(w));
    assert.deepEqual(found, [], `Gefundene Anglizismen: ${found.join(', ')}`);
  });

  test('Keine entfernten Komposita enthalten', () => {
    const removed = ['haushalt', 'tankstelle', 'apotheke', 'supermarkt', 'kaufhaus', 'rathaus', 'schwimmbad'];
    const found = removed.filter(w => words.includes(w));
    assert.deepEqual(found, [], `Unerwartete Komposita: ${found.join(', ')}`);
  });

  test('Grundvokabular vollständig vorhanden', () => {
    const required = ['haus', 'gehen', 'rot', 'fünf', 'wasser', 'kind', 'mutter', 'vater', 'essen', 'schlafen'];
    const missing = required.filter(w => !words.includes(w));
    assert.deepEqual(missing, [], `Fehlende Grundwörter: ${missing.join(', ')}`);
  });

  test('Munroe-Erklärwerkzeuge vorhanden (v3.0 Kategorien)', () => {
    const required = [
      // Werkzeuge & Materialien
      'hammer', 'säge', 'zange', 'faden', 'seil', 'kette', 'nadel', 'schere', 'messer', 'topf', 'flasche', 'schlüssel', 'eimer',
      // Geometrie
      'ecke', 'kante', 'rand', 'kreis', 'linie', 'loch', 'winkel', 'fläche',
      // Natur/Physik
      'wolke', 'blitz', 'dampf', 'rauch', 'schatten', 'licht', 'wärme', 'kälte', 'eisen', 'leder', 'sand',
      // Körperteile
      'zahn', 'lunge', 'knie', 'brust', 'daumen', 'zunge',
      // Verben des Tuns
      'klettern', 'greifen', 'biegen', 'binden', 'brechen', 'schneiden', 'schmelzen', 'kleben',
      // Familie
      'sohn', 'tochter', 'oma', 'opa',
      // Abstrakt
      'tier', 'pflanze', 'ding', 'person',
    ];
    const missing = required.filter(w => !words.includes(w));
    assert.deepEqual(missing, [], `Fehlende Munroe-Erklärwerkzeuge: ${missing.join(', ')}`);
  });

  test('Spielerklärbare Wörter nicht enthalten (Munroe-Philosophie)', () => {
    const shouldBeExplained = [
      // ursprünglich
      'hotel', 'restaurant', 'polizist', 'pilot', 'batterie', 'garage', 'tunnel', 'balkon', 'traktor',
      // v3.0: konkrete Tiere
      'hund', 'katze', 'kuh', 'pferd', 'fuchs', 'fisch', 'vogel', 'schaf', 'schwein',
      // v3.0: Berufe
      'arzt', 'lehrer', 'professor', 'richter', 'fahrer', 'soldat', 'bauer',
      // v3.0: konkrete Geräte
      'flugzeug', 'fernseher', 'telefon', 'fahrrad', 'instrument', 'schiff', 'zug', 'boot',
      // v3.0: Gebäude/Orte
      'bahnhof', 'kirche', 'krankenhaus', 'hafen', 'turm', 'brücke', 'schule', 'markt',
      // v3.0: spezifisches Essen
      'schokolade', 'kaffee', 'käse', 'kuchen', 'tee', 'bier', 'wein',
      // v3.0: Musik/Kunst
      'musik', 'lied', 'theater',
    ];
    const found = shouldBeExplained.filter(w => words.includes(w));
    assert.deepEqual(found, [], `Sollten nicht in der Liste sein: ${found.join(', ')}`);
  });
});

// ---------------------------------------------------------------------------
// umlautBack
// ---------------------------------------------------------------------------

describe('umlautBack – ASCII-Digraphen', () => {
  const fn = ctx.umlautBack;

  test('ae → a', () => assert.equal(fn('ae'), 'a'));
  test('oe → o', () => assert.equal(fn('oe'), 'o'));
  test('ue → u', () => assert.equal(fn('ue'), 'u'));
  test('ss → s', () => assert.equal(fn('ss'), 's'));
  test('haeuser → hauser', () => assert.equal(fn('haeuser'), 'hauser'));
  test('Wörter ohne Ersetzung bleiben gleich', () => assert.equal(fn('haus'), 'haus'));
  test('Leerer String bleibt leer', () => assert.equal(fn(''), ''));
});

describe('umlautBack – Unicode-Umlaute', () => {
  const fn = ctx.umlautBack;

  test('ä → a', () => assert.equal(fn('ä'), 'a'));
  test('ö → o', () => assert.equal(fn('ö'), 'o'));
  test('ü → u', () => assert.equal(fn('ü'), 'u'));
  test('ß → s', () => assert.equal(fn('ß'), 's'));
  test('väter → vater', () => assert.equal(fn('väter'), 'vater'));
  test('größe → grose', () => assert.equal(fn('größe'), 'grose'));
  test('gemischt: haeuser und häuser gleich', () => assert.equal(fn('haeuser'), fn('häuser')));
});

// ---------------------------------------------------------------------------
// isAllowed
// ---------------------------------------------------------------------------

describe('isAllowed – direkte Treffer', () => {
  const fn = ctx.isAllowed;

  test('"haus" erlaubt', () => assert.ok(fn('haus')));
  test('"gehen" erlaubt', () => assert.ok(fn('gehen')));
  test('Großschreibung: "Haus" erlaubt', () => assert.ok(fn('Haus')));
  test('"computer" nicht erlaubt', () => assert.ok(!fn('computer')));
  test('Leerer String nicht erlaubt', () => assert.ok(!fn('')));
  test('Zahl-String nicht erlaubt', () => assert.ok(!fn('123')));
});

describe('isAllowed – Flexionsformen (Substantive)', () => {
  const fn = ctx.isAllowed;

  test('Plural: "kinder" (→ kind)', () => assert.ok(fn('kinder')));
  test('Genitiv: "kindes" (→ kind)', () => assert.ok(fn('kindes')));
  test('Plural Umlaut: "väter" (→ vater)', () => assert.ok(fn('väter')));
});

describe('isAllowed – Flexionsformen (Verben)', () => {
  const fn = ctx.isAllowed;

  test('Präteritum schwach: "baute" (→ bauen)', () => assert.ok(fn('baute')));
  test('Partizip II: "gelacht" (→ lachen)', () => assert.ok(fn('gelacht')));
  test('Infinitiv direkt: "lachen"', () => assert.ok(fn('lachen')));
  test('3. Ps. Sg. mit Umlaut: "läuft" (→ laufen)', () => assert.ok(fn('läuft')));
});

describe('isAllowed – irreguläre Verben', () => {
  const fn = ctx.isAllowed;

  test('"ging" → gehen', () => assert.ok(fn('ging')));
  test('"war" → sein', () => assert.ok(fn('war')));
  test('"hatte" → haben', () => assert.ok(fn('hatte')));
  test('"sah" → sehen', () => assert.ok(fn('sah')));
  test('"kam" → kommen', () => assert.ok(fn('kam')));
  test('"dachte" → denken', () => assert.ok(fn('dachte')));
  test('"brachte" → bringen', () => assert.ok(fn('brachte')));
  test('"las" → lesen', () => assert.ok(fn('las')));
  test('"trank" → trinken', () => assert.ok(fn('trank')));
});

describe('isAllowed – Adjektive', () => {
  const fn = ctx.isAllowed;

  test('Komparativ: "schneller" (→ schnell)', () => assert.ok(fn('schneller')));
  test('Superlativ: "schnellsten" (→ schnell)', () => assert.ok(fn('schnellsten')));
  test('Schwache Flexion: "roten" (→ rot)', () => assert.ok(fn('roten')));
  test('Adjektivendung: "große" (→ groß)', () => assert.ok(fn('große')));
});

describe('isAllowed – Umlaut-Normalisierung', () => {
  const fn = ctx.isAllowed;

  test('"haeuser" wird erkannt (ASCII-Form → haus)', () => assert.ok(fn('haeuser')));
  test('"häuser" wird erkannt (Unicode-Form → haus)', () => assert.ok(fn('häuser')));
});

// ---------------------------------------------------------------------------
// escapeHtml
// ---------------------------------------------------------------------------

describe('escapeHtml', () => {
  const fn = ctx.escapeHtml;

  test('& → &amp;', () => assert.equal(fn('a & b'), 'a &amp; b'));
  test('< → &lt;', () => assert.equal(fn('<tag>'), '&lt;tag&gt;'));
  test('> → &gt;', () => assert.equal(fn('a>b'), 'a&gt;b'));
  test('alle drei gleichzeitig', () => assert.equal(fn('<a & b>'), '&lt;a &amp; b&gt;'));
  test('normaler Text unverändert', () => assert.equal(fn('hallo welt'), 'hallo welt'));
  test('Leerer String', () => assert.equal(fn(''), ''));
});