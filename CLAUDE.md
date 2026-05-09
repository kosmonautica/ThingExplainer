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
- Offline-Funktion nach erstem Laden (Service Worker)
- Mobile-Layout passt sich an

## Deployment
GitHub Actions deployt automatisch bei jedem Push auf main.
Workflow: .github/workflows/pages.yml

Alternativ manuell per FTP: index.html, style.css, script.js, words.json, manifest.json, sw.js

## Morphologie (script.js)
Die `isAllowed`-Funktion prueft ein Wort in dieser Reihenfolge:
1. Irregular-Tabelle (z.B. "war" → "sein")
2. Direkter Treffer im wordSet
3. Suffix-Stripping: Endung abschneiden, Stamm pruefen
   - `checkStem` sucht auch nach `stem + "en"` und `stem + "n"` → erkennt Verbflexionen wenn Infinitiv in der Liste steht
4. Umlaut-Normalisierung (ae→a, oe→o, ue→u, ss→s)

## Wortliste erweitern
words.json ist ein einfaches JSON-Array. Neue Lemmas lowercase hinzufuegen.
Die isAllowed-Funktion uebernimmt Flexionsformen automatisch.
Farben, haeufige Adjektive, Verben und Nomen sind bereits enthalten.

<!-- SPECKIT START -->
For additional context about technologies to be used, project structure,
shell commands, and other important information, read the current plan
<!-- SPECKIT END -->
