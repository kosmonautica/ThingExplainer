# CLAUDE.md

Thing Explainer ist eine statische PWA (kein Backend). Deployed via GitHub Pages: https://kosmonautica.github.io/ThingExplainer/

Alle Anforderungen in requirements.md.

## Tech-Stack
Vanilla JS ES6+, HTML5, CSS3. Keine Frameworks, keine Build-Tools.
Daten: words.de.json (1.126 deutsche Lemmas) + words.en.json (953 englische Lemmas), flache JSON-Arrays, lowercase.

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

Alternativ manuell per FTP: index.html, style.css, script.js, words.de.json, words.en.json, manifest.json, sw.js

## Versionierung
Die App-Version ist definiert als `APP_VERSION` in `script.js` Zeile 1. Sie ist die einzige Quelle der Wahrheit — Script setzt sie beim Laden in `#appVersion` (Header) und `#wlVersion` (Wortlisten-Modal-Footer). **Bei jeder Veröffentlichung (neue Wörter, neue Features) diese Zahl hochzählen und in `docs/WORTLISTE.md` eine neue Versionssektion anlegen.** Aktuelle Version: **4.0.1**

## Wortliste
words.de.json ist ein einfaches JSON-Array mit 1.126 deutschen Lemmas (Grundformen), Stand v4.0.
words.en.json ist ein einfaches JSON-Array mit 953 englischen Lemmas (Grundformen), Stand v4.0.

**Philosophie**: Munroes Simple English – Kategorie-Filter statt Wort-für-Wort: konkrete Tiere, Berufe, Geräte, Gebäudetypen und spezifisches Essen sind grundsätzlich raus (Spielbegriffe); Erklär-Werkzeuge rein.

**Quellen DE**: Munroe-1000 (Up-Goer-Five ins Deutsche) + DWDS-Kernwortschatz + FrequencyWords de_50k.txt
**Quellen EN**: Munroe-1000 (Original) + NGSL 2.0 + FrequencyWords en_50k.txt — jedes Wort muss in mindestens zwei Quellen vorkommen.

**Aufnahme-Kriterium**: Wörter rein wenn sie *Werkzeug zum Erklären* sind. Wörter raus wenn sie selbst erklärt werden sollen (hotel, polizist, batterie...).

**Wartung & Nachjustierung**: → siehe `docs/WORTLISTE.md` (DE) und `docs/WORDLIST-EN.md` (EN)

**Die `isAllowed`-Funktion** (script.js) dispatcht auf `isAllowed_de` oder `isAllowed_en` je nach `currentLang`:

DE prüft:
1. Irregular-Tabelle (z.B. "war" → "sein")
2. Direkter Treffer im wordSet
3. Suffix-Stripping; `checkStem_de` sucht auch `stem + "en"` und `stem + "n"`
4. ge-Praefix (Partizipien II): `gelacht` → `lachen`
5. Umlaut-Normalisierung (ä→a, ö→o, ü→u, ß→s + ASCII ae/oe/ue/ss)

EN prüft:
1. Kontraktionen-Map (`don't` → `do`, `i'm` → `be`, etc.)
2. Irregular-Tabelle (`was` → `be`, `went` → `go`, etc.)
3. Direkter Treffer im wordSet
4. Possessiv-`'s` strippen (`water's` → `water`)
5. Suffix-Stripping; `checkStem_en` prüft stem, stem+e, stem+y, Konsonanten-Dedopplung

**Neue Wörter hinzufuegen**: `words.de.json` oder `words.en.json` öffnen, ein Lemma pro Zeile (lowercase), speichern.

## Testen
- **Manuell**: `python3 -m http.server`, dann http://localhost:8000 — Text eingeben, DE/EN-Toggle testen
- **Automatisiert DE**: `node test.mjs` — 57 Tests (Datenintegrität, Morphologie, Unicode-Umlaute)
- **Automatisiert EN**: `node test.en.mjs` — 120 Tests (Datenintegrität, Irregulars, Suffix-Stripping, Kontraktionen)
- **Stresstest DE**: `node test.stress.mjs` — informativ; 25 Spielbegriffe mit DE-Wortliste
- **Stresstest EN**: `node test.stress.en.mjs` — informativ; 25 Spielbegriffe mit EN-Wortliste

## Dokumentationspflicht bei Änderungen

**WICHTIG**: Jede Änderung zieht die betroffenen Doku-Dateien automatisch mit. Kein Commit ohne entsprechende Aktualisierung.

| Änderungsart | Zu aktualisierende Dateien |
|---|---|
| Wörter hinzugefügt / entfernt (DE) | `words.de.json`, `APP_VERSION` in `script.js`, `docs/WORTLISTE.md` (neue Versionssektion), `CLAUDE.md` (Lemmazahl + Version), `README.md` (Lemmazahl + Version) |
| Wörter hinzugefügt / entfernt (EN) | `words.en.json`, `APP_VERSION` in `script.js`, `docs/WORDLIST-EN.md` (neue Versionssektion), `CLAUDE.md` (Lemmazahl + Version), `README.md` (Lemmazahl + Version) |
| Neue App-Features | `requirements.md` (neue FR), `specs/001-*/spec.md` (neue User Story), `README.md` (Features-Liste), `docs/ENTWICKLUNG.md` |
| Morphologie-Engine geändert | `docs/ENTWICKLUNG.md` (Zeilennummern, Funktionsbeschreibungen), `docs/WORTLISTE.md` (Morphologie-Abschnitt) |
| Tests geändert | `docs/ENTWICKLUNG.md` (Testanzahl), `docs/KURZ-ANLEITUNG.md` (Testanzahl) |
| Neue Version deployt | `APP_VERSION` in `script.js` hochzählen, neue Versionssektion in `docs/WORTLISTE.md`, Lemmazahl + Versionsstand in `CLAUDE.md` und `README.md`, **neue Versionsnummer im Chat nennen** |

Nach jedem Merge: neue Versionsnummer im Chat mitteilen, damit sie manuell verifiziert werden kann.

<!-- SPECKIT START -->
For additional context about technologies to be used, project structure,
shell commands, and other important information, read the current plan:
specs/002-word-list-enhancement/plan.md
<!-- SPECKIT END -->