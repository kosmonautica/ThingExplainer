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
index.html        — HTML-Struktur
script.js         — APP_VERSION + Morphologie-Engine + UI-Event-Handler
style.css         — CSS
words.json        — 1.126 deutsche Lemmas (JSON-Array, Stand v3.1)
sw.js             — Service Worker (Offline-Support)
manifest.json     — PWA-Manifest
test.mjs          — Node.js Test-Suite (57 Tests, blockierend)
test.stress.mjs   — Stresstest: 25 Spielbegriffe erklärbar? (informativ)
```

## Morphologie-Engine

`script.js` enthält ein reines Funktionssystem zur Wort-Validierung.

### Zentrale Funktionen

**`umlautBack(s)`** — Zeile 60
Normalisiert Umlaute (Unicode zuerst, dann ASCII):
```js
ä → a, ö → o, ü → u, ß → s   // Unicode
ae → a, oe → o, ue → u, ss → s // ASCII
```

**`checkStem(stem)`** — Zeile 61
Prüft, ob ein Stammwort erlaubt ist:
1. Direkter Treffer: `wordSet.has(stem)`
2. Mit Infinitiv: `wordSet.has(stem + 'en')` oder `+ 'n'`
3. Mit Umlaut-Normalisierung

**`isAllowed(rawWord)`** — Zeile 75
Hauptfunktion zur Wort-Validierung:
1. Zu Lowercase
2. Suche in `irregulars` Map
3. Direkter Treffer in `wordSet`
4. Suffix-Stripping (Suffixes von lang nach kurz)
5. `ge-`-Präfix entfernen (Partizipien II)
6. Umlaut-Normalisierung

**Irregulars Map** — Zeile 7–59
~400 Einträge für unregelmäßige Verben, Schlüssel in ASCII und Unicode:
```js
['war', 'sein'], ['wäre', 'sein'],
['ging', 'gehen'], ['kann', 'können'], ...
```

**Suffixes Array** — Zeile 59
60+ Endungen für Suffix-Stripping, sortiert von lang nach kurz:
```js
['ungsweise', 'ungen', 'ung', 'lichen', 'lich', ... 'en', 'er', 'e', 'n', 't']
```

## Versionierung

`APP_VERSION` in `script.js` Zeile 1 ist die einzige Quelle der Wahrheit.
Beim Laden wird sie automatisch in `#appVersion` (Header) und `#wlVersion` (Modal-Footer) geschrieben.

**Bei jeder Veröffentlichung:**
1. `APP_VERSION` in `script.js` Zeile 1 erhöhen
2. Neue Sektion in `docs/WORTLISTE.md` anlegen
3. Lemmazahl in `CLAUDE.md` und `README.md` aktualisieren
4. Im Chat die neue Versionsnummer nennen

## Testing

### Automatisiert (Node.js)

```bash
node test.mjs
```

**Test-Suites** (57 Tests):
1. **words.json – Datenintegrität** (7 Tests)
   - Alle Einträge sind Strings, lowercase, keine Duplikate
   - Größe 1.050–1.150 Wörter
   - Keine bekannten Anglizismen, keine Spielbegriffe
   - Munroe-Erklärwerkzeuge vorhanden

2. **umlautBack – ASCII & Unicode** (14 Tests)

3. **isAllowed – Flexionsformen** (30 Tests)
   - Direkte Treffer, Substantivflexion, Verbflexion
   - Irreguläre Verben, Adjektive, Umlaut-Normalisierung

4. **escapeHtml** (6 Tests)

**Test-Setup**: Node.js `vm` (createContext/Script), minimales DOM-Mock, `wordSet` manuell befüllt.
**Voraussetzung**: Node.js 18+

### Stresstest (informativ)

```bash
node test.stress.mjs
```

Prüft, ob 25 typische Spielbegriffe (klavier, hund, flugzeug …) sich mit der aktuellen Wortliste in 1–3 Sätzen erklären lassen. Gibt aus, welche Wörter in den Beispielerklärungen fehlen. Nicht-blockierend, keine Assertions.

**Aktuell: 24/25 voll erklärbar** (lehrer: Dativ-Plural `kindern` ist Suffix-Engine-Lücke).

### Manuell im Browser

```bash
python3 -m http.server
# http://localhost:8000
```

**Checkliste**:
- [ ] Text eingeben → grün/rot-Markierung in Echtzeit
- [ ] Zähler aktualisiert sich korrekt
- [ ] Header zeigt `Thing Explainer v3.1` (aktuelle Version)
- [ ] Wortlisten-Modal öffnet mit Fokus im Suchfeld
- [ ] Modal-Footer zeigt `v3.1` (identisch mit Header-Version)
- [ ] Suchfeld filtert in Echtzeit (case-insensitiv, Umlaut-normalisiert)
- [ ] A-Z-Leiste springt zu Buchstaben-Abschnitten, inaktive ausgegraut
- [ ] Anglizismen rot: `computer`, `auto`; Grundwörter grün: `haus`, `rad`
- [ ] Flexionen grün: `baute`, `läuft`, `kann`, `muss`, `hieß`
- [ ] App offline nutzbar nach erstem Laden

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

**Letztes Update**: 2026-05-10
