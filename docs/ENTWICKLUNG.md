# Entwicklung & Wartung

## Quick Start

```bash
git clone https://github.com/kosmonautica/ThingExplainer.git
cd ThingExplainer
python3 -m http.server
# Öffne http://localhost:8000
```

## Architektur

**Vanilla Stack**: Keine Build-Tools, keine Frameworks, kein Backend.

```
index.html          — HTML-Struktur mit data-i18n-Attributen und DE/EN-Toggle
script.js           — APP_VERSION + i18n + DE/EN-Morphologie-Engines + UI-Event-Handler
style.css           — CSS inkl. .lang-toggle Styling
words.de.json       — 1.146 deutsche Lemmas (JSON-Array, Stand v4.2.1)
words.en.json       — 1.242 englische Lemmas (JSON-Array, Stand v4.1.0)
sw.js               — Service Worker (Offline-Support, Cache v4-2-1, beide Wortlisten)
manifest.json       — PWA-Manifest (zweisprachige Description)
test.mjs            — Node.js Test-Suite DE (57 Tests, blockierend)
test.en.mjs         — Node.js Test-Suite EN (125 Tests, blockierend)
test.stress.mjs     — Stresstest DE: 25 Spielbegriffe erklärbar? (informativ)
test.stress.en.mjs  — Stresstest EN: 25 Spielbegriffe erklärbar? (informativ)
```

## Morphologie-Engine

`script.js` enthält zwei Sprach-Engines (`isAllowed_de`, `isAllowed_en`) die von `isAllowed(rawWord)` je nach `currentLang` aufgerufen werden.

### i18n-System

**`i18n`** — Map mit `de`/`en`-Schlüsseln
Alle UI-Strings (Zähler-Labels, Platzhalter, Modal-Titel, Suchfeld, Schließen-Button).

**`applyI18nDom(lang)`**
Aktualisiert alle `[data-i18n]`, `[data-i18n-placeholder]`, `[data-i18n-aria-label]` Elemente im DOM.

**`applyLanguage(lang)`**
Vollständige Sprachumschaltung: setzt `currentLang`, ruft `applyI18nDom()`, lädt `words.${lang}.json`, rendert Wortliste neu.

**FOUC-Vermeidung**: Inline-`<script>` im `<head>` liest `localStorage('lang')` und setzt `document.documentElement.lang` sofort, bevor `script.js` lädt.

### Deutsche Engine (`isAllowed_de`)

**`umlautBack(s)`**
Normalisiert Umlaute (Unicode zuerst, dann ASCII):
```js
ä → a, ö → o, ü → u, ß → s   // Unicode
ae → a, oe → o, ue → u, ss → s // ASCII
```

**`checkStem_de(stem)`**
Prüft, ob ein Stammwort erlaubt ist:
1. Direkter Treffer: `wordSet.has(stem)`
2. Mit Infinitiv: `wordSet.has(stem + 'en')` oder `+ 'n'`
3. Mit Umlaut-Normalisierung

**`isAllowed_de(rawWord)`**
1. Zu Lowercase
2. Suche in `irregulars_de` Map (~400 Einträge)
3. Direkter Treffer in `wordSet`
4. Suffix-Stripping (60+ Endungen, lang → kurz)
5. `ge-`-Präfix entfernen (Partizipien II)
6. Umlaut-Normalisierung

### Englische Engine (`isAllowed_en`)

**`checkStem_en(stem)`**
1. `wordSet.has(stem)` → true
2. `wordSet.has(stem + 'e')` → true *(loving→love)*
3. `wordSet.has(stem + 'y')` → true *(tries→try)*
4. Konsonanten-Dedopplung: wenn `stem[-1]===stem[-2]` und Konsonant → `wordSet.has(stem.slice(0,-1))` *(running→run)*

**`isAllowed_en(rawWord)`**
1. Kontraktionen-Map (~36 Einträge: `don't→do`, `i'm→be`, `won't→will`, …)
2. `irregulars_en` Map (~180 Einträge für 65+ unregelmäßige Verben)
3. Direkter Treffer in `wordSet`
4. Possessiv-`'s` strippen (`water's` → `water`)
5. Suffix-Stripping (24 Endungen: `ation`, `ness`, `tion`, `ion`, …, `ing`, `ed`, `er`, `ly`, `es`, `s`, `e`)

**EN-Tokenizer**: `/[a-zA-Z']+|[^a-zA-Z']+/g` (Apostroph als Wortbestandteil für Kontraktionen)

## Versionierung

`APP_VERSION` in `script.js` Zeile 1 ist die einzige Quelle der Wahrheit.
Beim Laden wird sie automatisch in `#wlVersion` (Modal-Footer) geschrieben. Der Header zeigt zusätzlich ein Build-Datum aus `document.lastModified` (Format: `Version: D.M.YYYY, HH:MM Uhr`).

**Bei jeder Veröffentlichung:**
1. `APP_VERSION` in `script.js` Zeile 1 erhöhen
2. Neue Sektion in `docs/WORTLISTE.md` anlegen
3. Lemmazahl in `CLAUDE.md` und `README.md` aktualisieren
4. Im Chat die neue Versionsnummer nennen

## Testing

### Automatisiert (Node.js)

```bash
node test.mjs      # Deutsche Tests (57)
node test.en.mjs   # Englische Tests (125)
```

**DE Test-Suites** (`test.mjs`, 57 Tests):
1. **words.de.json – Datenintegrität** (7 Tests) — Strings, lowercase, keine Duplikate, 1.100–1.200 Wörter, keine Anglizismen, Munroe-Werkzeuge vorhanden
2. **umlautBack – ASCII & Unicode** (14 Tests)
3. **isAllowed – Flexionsformen** (30 Tests) — Direkte Treffer, Substantivflexion, Verbflexion, Irreguläre, Adjektive, Umlaut-Normalisierung
4. **escapeHtml** (6 Tests)

**EN Test-Suites** (`test.en.mjs`, 125 Tests):
1. **words.en.json – data integrity** (10 Tests) — Strings, lowercase, keine Duplikate, 900–1.100 Wörter, ASCII-only, keine Spielbegriffe, Core-Vokabular, alle Irregular-Lemmas vorhanden
2. **isAllowed (EN) – direct matches** (8 Tests)
3. **isAllowed (EN) – irregular verbs** (46 Tests)
4. **isAllowed (EN) – regular suffix stripping** (18 Tests)
5. **isAllowed (EN) – doubled consonant stripping** (9 Tests)
6. **isAllowed (EN) – -ies/-ied forms** (5 Tests)
7. **isAllowed (EN) – contractions** (14 Tests)
8. **isAllowed (EN) – possessive 's** (3 Tests)
9. **escapeHtml** (6 Tests)

**Test-Setup**: Node.js `vm` (createContext/Script), minimales DOM-Mock mit `querySelectorAll: () => []` und `documentElement: { lang: 'de'/'en' }`, `wordSet` und `currentLang` manuell in Context injiziert.
**Voraussetzung**: Node.js 18+

### Stresstest (informativ)

```bash
node test.stress.mjs     # DE: 25 Spielbegriffe mit DE-Wortliste
node test.stress.en.mjs  # EN: 25 Spielbegriffe mit EN-Wortliste
```

Prüft, ob 25 typische Spielbegriffe sich mit der aktuellen Wortliste in 1–3 Sätzen erklären lassen. Gibt aus, welche Wörter in den Beispielerklärungen fehlen. Nicht-blockierend, keine Assertions.

**Aktuell DE: 24/25 voll erklärbar** (lehrer: Dativ-Plural `kindern` ist Suffix-Engine-Lücke).
**Aktuell EN: 14/25 voll erklärbar** (fehlende Wörter: animal, food, money, god, war, sick — Kandidaten für spätere Erweiterung).

### Manuell im Browser

```bash
python3 -m http.server
# http://localhost:8000
```

**Checkliste**:
- [ ] Text eingeben → grün/rot-Markierung in Echtzeit
- [ ] Zähler aktualisiert sich korrekt
- [ ] Header zeigt `Thing Explainer` mit Autor-Untertitel und Build-Datum
- [ ] DE/EN-Toggle-Buttons sichtbar rechts neben „Wortliste"
- [ ] EN-Klick: UI wechselt auf Englisch, Wortliste wird englisch, `<html lang="en">`
- [ ] Reload nach EN-Klick: bleibt Englisch (localStorage-Persistenz)
- [ ] DE-Klick: zurück zu Deutsch; Reload: bleibt Deutsch
- [ ] Wortlisten-Modal öffnet mit Fokus im Suchfeld
- [ ] Modal-Footer zeigt aktuelle Version (z. B. `v4.2.1`)
- [ ] Suchfeld filtert in Echtzeit (case-insensitiv)
- [ ] A-Z-Leiste springt zu Buchstaben-Abschnitten, inaktive ausgegraut
- [ ] DE: Anglizismen rot: `computer`, `auto`; Grundwörter grün: `haus`, `rad`
- [ ] DE: Flexionen grün: `baute`, `läuft`, `kann`, `muss`, `hieß`
- [ ] EN: `telephone` rot (Spielbegriff); `water`, `push`, `big` grün
- [ ] EN: `running` grün (→ run), `was` grün (→ be), `don't` grün (→ do)
- [ ] App offline nutzbar nach erstem Laden
- [ ] Credits-Link unten rechts sichtbar; Klick öffnet Modal mit englischem Text und GitHub-Doku-Link (öffnet in neuem Tab)

## Wortliste — Philosophie v3.0

**Kategorie-Filter**: Konkrete Tiere, Berufe, Geräte, Gebäudetypen, spezifisches Essen → raus (Spielbegriffe). Erklär-Werkzeuge → rein.

**Quellen-Stack**: Munroe-1000 + DWDS-Kernwortschatz + FrequencyWords de_50k.txt — jedes Wort muss in mindestens zwei Quellen vorkommen.

Detaillierte Dokumentation: `docs/WORTLISTE.md`

## Wortliste ändern

Siehe `docs/WORTLISTE.md` und `docs/KURZ-ANLEITUNG.md`.

## Deployment

### Automatisch (GitHub Actions)

Push zu `main` → `.github/workflows/pages.yml` → GitHub Pages (2–5 Min)

**Live URL**: https://kosmonautica.github.io/ThingExplainer/

### Manuell

Dateien hochladen: `index.html`, `style.css`, `script.js`, `words.json`, `manifest.json`, `sw.js`

## Performance

- **DOM-Update**: < 50 ms (bei ~1.000 Wörtern)
- **Suchfeld-Filter**: < 10 ms
- **A-Z-Sprung**: < 200 ms (scrollIntoView smooth)
- **Service Worker**: Offline nach erstem Laden

## Browser-Support

- **Desktop**: Chrome, Firefox, Safari (alle modernen Versionen)
- **Mobile**: iOS Safari 12+, Android Chrome 60+
- **PWA**: Installierbar auf iOS und Android

## Troubleshooting

### Tests schlagen fehl

```bash
node --version  # Node.js 18+ erforderlich
node test.mjs 2>&1 | grep "fail"
```

### Wort wird nicht erkannt

1. In `words.json` prüfen (muss Lemma/Grundform sein)
2. In `script.js`: Ist das Suffix in der `suffixes` Array?
3. Irreguläre Form? → In `irregulars` Map hinzufügen
4. Umlaut-Problem? → `umlautBack()` prüfen

### Service Worker

```
DevTools → Application → Service Workers → registered + active?
Falls nicht: sw.js auf Syntax-Fehler prüfen.
Cache löschen: DevTools → Application → Storage → Clear
```

## Weitere Ressourcen

- **Wortlisten-Philosophie & Wartung**: `docs/WORTLISTE.md`
- **Kurz-Anleitung**: `docs/KURZ-ANLEITUNG.md`
- **Anforderungen**: `requirements.md`
- **Specs**: `specs/`
- **Original-Inspiration**: https://xkcd.com/thing-explainer/

---

**Kontakt / Issues**: https://github.com/kosmonautica/ThingExplainer/issues

**Letztes Update**: 2026-06-18 (v4.2.1)
