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
index.html        — HTML-Struktur + CSS Styles (inline)
script.js         — Morphologie-Engine + UI-Event-Handler
style.css         — CSS (externe Datei)
words.json        — 1.098 deutsche Lemmas (JSON-Array)
sw.js             — Service Worker (Offline-Support)
manifest.json     — PWA-Manifest
test.mjs          — Node.js Test-Suite (55 Tests)
```

## Morphologie-Engine

`script.js` enthält ein reines Funktions-System zur Wort-Validierung:

### Zentrale Funktionen

**`umlautBack(s)`** – Zeile 59
Normalisiert Umlaute (Unicode + ASCII):
```js
ä → a, ö → o, ü → u, ß → s
ae → a, oe → o, ue → u, ss → s
```

**`checkStem(stem)`** – Zeile 60
Prüft, ob ein Stammwort erlaubt ist:
1. Direkter Treffer: `wordSet.has(stem)`
2. Mit Infinitiv: `wordSet.has(stem + 'en')` oder `+ 'n'`
3. Mit Umlaut-Normalisierung

**`isAllowed(rawWord)`** – Zeile 73
Hauptfunktion zur Wort-Validierung:
1. Zu Lowercase
2. Suche in `irregulars` Map
3. Direkter Treffer in `wordSet`
4. Suffix-Stripping (8 Endungen ausprobieren)
5. `ge-`-Präfix entfernen
6. Umlaut-Normalisierung

**Irregulars Map** – Zeile 6–57
~300 Einträge für unregelmäßige Verben:
```js
['war', 'sein'],
['baute', 'bauen'],
['ging', 'gehen'],
...
```

**Suffixes Array** – Zeile 58
60+ häufige Endungen für Suffix-Stripping:
```js
['ung', 'en', 'te', 'lichen', 'lich', 'ig', 'er', 'e', 'n', ...]
```

## Testing

### Automatisiert (Node.js)

```bash
node test.mjs
```

**Test-Suites** (55 Tests):
1. **words.json – Datenintegrität** (7 Tests)
   - Alle Einträge sind Strings, lowercase
   - Keine Duplikate
   - Größe 900–1.200 Wörter
   - Keine bekannten Anglizismen
   - Kernvokabular vorhanden

2. **umlautBack – ASCII & Unicode** (14 Tests)
   - ae/oe/ue/ss → a/o/u/s
   - ä/ö/ü/ß → a/o/u/s
   - Konsistenz zwischen Formen

3. **isAllowed – Verschiedene Kategorien** (24 Tests)
   - Direkte Treffer (haus, gehen, Computer)
   - Substantiv-Flexionen (kinder, kindes, väter)
   - Verb-Flexionen (baute, gelacht, läuft)
   - Irreguläre Verben (ging, war, hatte, sah)
   - Adjektiv-Flexionen (schneller, roten, große)
   - Umlaut-Normalisierung (haeuser vs. häuser)

4. **escapeHtml** (6 Tests)
   - HTML-Entities korrekt escaped

**Test-Setup**:
- Verwendet Node.js `vm` Module (createContext, Script)
- DOM wird gemockt (minimal: document.getElementById, createElement, etc.)
- `wordSet` wird manuell mit words.json befüllt
- `script.js` wird in der VM ausgeführt

**Voraussetzung**: Node.js 18+ (wegen `node:test` built-in)

### Manuell im Browser

```bash
python3 -m http.server
# http://localhost:8000
```

**Checkliste**:
- [ ] Text eingeben, grün/rot-Markierung erscheint in Echtzeit
- [ ] Zähler (erlaubt / verboten) aktualisiert sich
- [ ] Flexionsformen erkannt: "baute" grün, "größer" grün, "läuft" grün
- [ ] Anglizismen rot: "computer", "internet", "app"
- [ ] Abstrakte Wörter rot: "kompetenz", "gesellschaft"
- [ ] Wortliste-Button öffnet Modal mit Fokus im Suchfeld
- [ ] Suchfeld filtert in Echtzeit (case-insensitiv, Umlaut-normalisiert)
- [ ] A-Z-Leiste springt zu Buchstaben-Abschnitten
- [ ] Inaktive Buchstaben (keine Treffer) sind ausgegraut
- [ ] Wortzähler zeigt Gesamtzahl oder Trefferanzahl
- [ ] App funktioniert offline (nach erstem Laden)
- [ ] Mobile-Layout responsive (Portrait/Landscape)

## Wortliste ändern

Siehe **`docs/WORTLISTE.md`** für:
- Wörter hinzufügen / entfernen
- Flexionsformen validieren
- Anlauf-Probleme beheben

## Deployment

### Automatisch (GitHub Actions)

Push zu `main` → GitHub Actions führt `.github/workflows/pages.yml` aus → Deploy zu GitHub Pages

**Live URL**: https://kosmonautica.github.io/ThingExplainer/

### Manuell

Falls GitHub Actions nicht verfügbar:
1. Dateien hochladen: `index.html`, `style.css`, `script.js`, `words.json`, `manifest.json`, `sw.js`
2. Per FTP zu GitHub Pages oder eigenem Hosting

## Performance

- **DOM-Update**: < 50 ms (bei 1.000 Wörtern)
- **Suchfeld-Filter**: < 10 ms (Array.filter + includes)
- **A-Z-Sprung**: < 200 ms (scrollIntoView mit smooth behavior)
- **Service Worker**: Offline nach erstem Laden

## Browser-Support

- **Desktop**: Chrome, Firefox, Safari (alle modernen Versionen)
- **Mobile**: iOS Safari 12+, Android Chrome 60+
- **PWA**: Installierbar auf iOS (Home Screen) und Android (Play Store Option)

## Troubleshooting

### Tests schlagen fehl
```bash
# Node.js Version prüfen (18+ erforderlich)
node --version

# Einzelnen Test debuggen
node test.mjs | grep "failing"
```

### Wort wird nicht erkannt
1. In `words.json` prüfen (muss Lemma sein)
2. In `script.js` prüfen: Ist das Suffix in der `suffixes` Array?
3. Irregular form? → In `irregulars` Map hinzufügen
4. Umlaut-Problem? → `umlautBack()` Logik checken

### Service Worker funktioniert nicht
```bash
# Im Browser: DevTools → Application → Service Workers
# → Sollte registered + active sein

# Falls nicht: sw.js prüfen (Syntax-Fehler?)
# Falls ja: Cache löschen → DevTools → Application → Storage → Clear
```

### Layout-Probleme auf Mobil
- Chrome DevTools: Toggle Device Toolbar (Ctrl+Shift+M)
- Verschiedene Viewport-Größen testen (320px, 375px, 768px)
- CSS `style.css` prüfen (Mobile-first Approach)

## Code-Style

- **Vanilla JS**: Keine externe Abhängigkeiten, keine Frameworks
- **Funktional**: Pure Functions wo möglich (umlautBack, checkStem, isAllowed)
- **Keine Kommentare**: Code ist selbsterklärend; nur komplexe Logik erklären
- **Lowercase-only**: words.json, variable names (ausser Klassen)

## Weitere Ressourcen

- **Wortlisten-Philosophie & Wartung**: `docs/WORTLISTE.md`
- **Spec Wortlisten-Erweiterung**: `specs/002-word-list-enhancement/spec.md`
- **Anforderungen**: `requirements.md`
- **Original-Inspiration**: https://xkcd.com/thing-explainer/

---

**Kontakt / Issues**: https://github.com/kosmonautica/ThingExplainer/issues

**Letztes Update**: 2026-05-09