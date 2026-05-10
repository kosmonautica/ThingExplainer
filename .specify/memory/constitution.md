# Thing Explainer Constitution

## Core Principles

### I. Vanilla Stack — keine Abhängigkeiten
Keine Frameworks, keine Build-Tools, keine externen Bibliotheken. Jede Funktion muss in reinem Vanilla JS/HTML5/CSS3 lösbar sein. Neue npm-Pakete oder Build-Schritte sind nicht erlaubt.

### II. Statisch & Offline-First
Die App muss vollständig statisch bleiben (FTP-deploybar) und nach dem ersten Laden offline funktionieren. Kein Backend, kein Server-Side Rendering, kein Sync zwischen Geräten.

### III. Mobile-First
Alle Features werden zuerst für Smartphones (360–430 px) entworfen. Desktop ist Secondary. Jede UI-Änderung muss auf mobilem Viewport getestet werden.

### IV. Munroe-Philosophie (NON-NEGOTIABLE)
Die Wortliste folgt dem Kategorie-Filter-Prinzip: Konkrete Tiere, Berufe, Geräte, Gebäudetypen, spezifisches Essen und Anglizismen sind grundsätzlich ausgeschlossen. Neue Wörter werden nur aufgenommen, wenn sie in mindestens zwei Quellen (Munroe-1000, DWDS-Kernwortschatz, de_50k.txt) als Erklär-Werkzeug auftauchen.

### V. Single Source of Truth für Version
`APP_VERSION` in `script.js` Zeile 1 ist die einzige Stelle, an der die App-Version definiert wird. Bei jeder Veröffentlichung wird sie dort erhöht und automatisch in Header und Modal-Footer angezeigt.

### VI. Dokumentationspflicht bei jeder Änderung
Jede Codeänderung zieht die betroffenen Doku-Dateien mit. Kein Commit ohne entsprechende Doku-Aktualisierung (siehe CLAUDE.md → Dokumentationspflicht).

## Technische Constraints

- **Sprache**: Deutsch (Wortliste, UI-Texte, Doku)
- **Testing**: `node test.mjs` (57 blockierende Tests) muss immer grün sein. `node test.stress.mjs` informativ.
- **Wortlistengröße**: 1.000–1.200 Lemmas (Zielkorridor)
- **Performance**: DOM-Update < 100 ms, Suchfilter < 100 ms, A-Z-Sprung < 200 ms

## Deployment-Workflow

1. Feature-Branch erstellen (`claude/<feature-name>`)
2. Änderungen committen inkl. Doku
3. PR erstellen, Tests prüfen, mergen
4. GitHub Actions deployt automatisch auf GitHub Pages
5. Neue Versionsnummer im Chat nennen

## Governance

Diese Constitution hat Vorrang vor anderen Praktiken. Änderungen an der Wortlisten-Philosophie (Principle IV) erfordern eine neue Versionssektion in `docs/WORTLISTE.md`.

**Version**: 1.0 | **Ratified**: 2026-05-10 | **Last Amended**: 2026-05-10
