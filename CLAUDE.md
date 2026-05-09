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

## Versionierung
Die App-Version ist definiert als `APP_VERSION` in `script.js` Zeile 1. Sie ist die einzige Quelle der Wahrheit — Script setzt sie beim Laden in `#appVersion` (Header) und `#wlVersion` (Wortlisten-Modal-Footer). **Bei jeder Veröffentlichung (neue Wörter, neue Features) diese Zahl hochzählen und in `docs/WORTLISTE.md` eine neue Versionssektion anlegen.** Aktuelle Version: **3.1**

## Wortliste
words.json ist ein einfaches JSON-Array mit 1.126 Lemmas (Grundformen), Stand v3.1.

**Philosophie**: Munroes Simple English – Kategorie-Filter statt Wort-für-Wort: konkrete Tiere, Berufe, Geräte, Gebäudetypen und spezifisches Essen sind grundsätzlich raus (Spielbegriffe); Erklär-Werkzeuge (hammer, seil, ecke, wolke, klettern…) rein.

**Quellen**: Munroe-1000 (Up-Goer-Five ins Deutsche) + DWDS-Kernwortschatz + FrequencyWords de_50k.txt — jedes Wort muss in mindestens zwei Quellen vorkommen.

**Aufnahme-Kriterium**: Wörter rein wenn sie *Werkzeug zum Erklären* sind. Wörter raus wenn sie selbst erklärt werden sollen (hotel, polizist, batterie...).

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
- **Automatisiert**: `node test.mjs` — 57 Tests (Datenintegrität, Morphologie, Unicode-Umlaute)
- **Stresstest**: `node test.stress.mjs` — informativ; prueft ob 25 Spielbegriffe (klavier, hund, flugzeug…) sich mit der Wortliste in 1–3 Saetzen erklaeren lassen

<!-- SPECKIT START -->
For additional context about technologies to be used, project structure,
shell commands, and other important information, read the current plan:
specs/002-word-list-enhancement/plan.md
<!-- SPECKIT END -->