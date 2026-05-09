# CLAUDE.md

Thing Explainer ist eine statische PWA (kein Backend, FTP-deploybar). Alle Anforderungen in requirements.md.

Tech-Stack: Vanilla JS ES6+, HTML5, CSS3. Keine Frameworks, keine Build-Tools. Daten: words.json (flaches Array von deutschen Lemma-Strings).

Entwicklung: python3 -m http.server dann http://localhost:8000

Testen: Manuell im Browser: gruen/rot-Markierung in Echtzeit, Zaehler, Offline-Funktion, Mobile-Layout.

Deployment: FTP-Upload: index.html, style.css, script.js, words.json, manifest.json, sw.js

Wortliste erweitern: words.json ist ein einfaches JSON-Array. Neue Lemmas lowercase hinzufuegen. Die isAllowed-Funktion in script.js uebernimmt Flexionsformen automatisch.