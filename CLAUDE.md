# CLAUDE.md

Thing Explainer ist eine statische PWA (kein Backend). Deployed via GitHub Pages: https://kosmonautica.github.io/ThingExplainer/

Alle Anforderungen in requirements.md.

## Tech-Stack
Vanilla JS ES6+, HTML5, CSS3. Keine Frameworks, keine Build-Tools.
Daten: words.json (flaches JSON-Array von deutschen Lemma-Strings, lowercase).

## Lokale Entwicklung
```
python3 -m http.server
# dann http://localhost:8000
```

## Testen
Manuell im Browser pruefen:
- Gruen/rot-Markierung erscheint beim Tippen in Echtzeit
- Zaehler (erlaubt / verboten) aktualisiert sich korrekt
- Flektierte Formen werden erkannt (z.B. "baute", "fester", "laufend")
- Wortliste-Button oeffnet Modal mit allen erlaubten Woertern
- Modal oeffnet mit Fokus im Suchfeld (sofort tippen moeglich)
- Suchfeld filtert Liste in Echtzeit (Substring, case-insensitiv, Umlaut-normalisiert)
- A-Z-Leiste springt per Klick zum jeweiligen Buchstabenabschnitt
- Inaktive Buchstaben (keine Treffer) sind ausgegraut
- Wortzaehler zeigt Gesamtzahl bzw. Trefferanzahl beim Filtern
- Offline-Funktion nach erstem Laden (Service Worker)
- Mobile-Layout passt sich an

## Deployment
GitHub Actions deployt automatisch bei jedem Push auf main.
Workflow: .github/workflows/pages.yml

Alternativ manuell per FTP: index.html, style.css, script.js, words.json, manifest.json, sw.js

## Wortliste
words.json ist ein einfaches JSON-Array mit 1.098 Lemmas (Grundformen).

**Philosophie**: Munroes Simple English – nur die häufigsten, alltäglichsten deutschen Wörter. Keine Anglizismen, keine akademischen Begriffe.

**Quelle**: FrequencyWords (hermitdave/de_50k.txt) – Untertitel-basiert, reflektiert gesprochene Sprache.

**Wartung & Nachjustierung**: → siehe `docs/WORTLISTE.md`

**Die `isAllowed`-Funktion** (script.js) prüft ein Wort in dieser Reihenfolge:
1. Irregular-Tabelle (z.B. "war" → "sein")
2. Direkter Treffer im wordSet
3. Suffix-Stripping: Endung abschneiden, Stamm pruefen
   - `checkStem` sucht auch nach `stem + "en"` und `stem + "n"` → erkennt Verbflexionen wenn Infinitiv in der Liste steht
4. ge-Praefix (Partizipien II): `gelacht` → `lacht` → `lachen`
5. Umlaut-Normalisierung (ä→a, ö→o, ü→u, ß→s + ASCII ae/oe/ue/ss)

**Neue Wörter hinzufuegen**: `words.json` öffnen, ein Lemma pro Zeile (lowercase), speichern. Flexionsformen werden automatisch erkannt.

## Testen
- **Manuell**: `python3 -m http.server`, dann http://localhost:8000 — Text eingeben, gruen/rot Markierung pruefen
- **Automatisiert**: `node test.mjs` — 55 Tests (Datenintegrität, Morphologie, Unicode-Umlaute)

<!-- SPECKIT START -->
For additional context about technologies to be used, project structure,
shell commands, and other important information, read the current plan:
specs/002-word-list-enhancement/plan.md
<!-- SPECKIT END -->