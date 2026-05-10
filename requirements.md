# Thing Explainer — Anforderungen

## 1. Projektübersicht

Thing Explainer ist eine mobile-first PWA inspiriert von Randall Munroes Buch *Thing Explainer*. Spielende erklären Begriffe ausschließlich mit den ~1.000 häufigsten, alltäglichsten deutschen Wörtern (nach Munroe-Philosophie: keine Anglizismen, keine spielbaren Begriffe). Die App prüft den Text in Echtzeit und erkennt Flexionsformen automatisch.

## 2. Workshop-Spielablauf

1. Moderator nennt einen Begriff verbal
2. Erklärende Person öffnet die App auf dem Smartphone
3. Sie tippt die Erklärung in das Textfeld
4. Die App markiert jedes Wort sofort: grün = erlaubt, rot = nicht erlaubt
5. Andere Spielende hören zu und raten den Begriff verbal
6. Kein digitaler Sync zwischen den Geräten nötig

## 3. Funktionale Anforderungen

### Kernanforderungen (v1.0)

- Jedes Wort wird beim Tippen in Echtzeit geprüft
- Flektierte Formen zählen als erlaubt wenn ihre Grundform in der Liste steht
- Komposita werden nicht automatisch aufgeteilt
- Echtzeit-Zähler: n erlaubt / m verboten
- Morphologie via Suffix-Stripping, Umlaut-Normalisierung, Irregular-Tabelle
- Keine externe NLP-Bibliothek

### Wortlisten-Modal (v1.1)

- Suchfeld mit Auto-Fokus: Modal öffnet direkt mit Cursor im Suchfeld
- Echtzeit-Filter: Substring-Suche, case-insensitiv, Umlaut-normalisiert (ae/oe/ue und Unicode-Umlaute gleichwertig)
- A-Z-Navigationsleiste: Klick springt zum jeweiligen Buchstabenabschnitt; inaktive Buchstaben ausgegraut
- Wortzähler im Modal-Header: Gesamtanzahl erlaubter Wörter; bei aktiver Suche Trefferanzahl
- Leerzustand: Hinweistext wenn Suche keine Treffer liefert

### Versionsanzeige (v3.1)

- Die App-Version wird im Header neben dem Titel angezeigt (`Thing Explainer v3.1`)
- Die App-Version wird im Footer des Wortlisten-Modals angezeigt
- Beide Stellen zeigen immer dieselbe Versionsnummer
- Einzige Quelle der Wahrheit: `APP_VERSION` in `script.js` Zeile 1

## 4. Nicht-funktionale Anforderungen

- Web/PWA, läuft in jedem modernen Mobilbrowser
- Offline nach erstem Laden (Service Worker)
- Vollständig statisch, FTP-deploybar
- Vanilla JS, keine Frameworks

## 5. Wortlisten-Philosophie

**Kategorie-Filter** (v3.0): Wörter raus wenn sie in eine dieser Kategorien fallen:
- Konkrete Tierart (hund, katze → Spielbegriff)
- Konkreter Beruf (arzt, lehrer → Spielbegriff)
- Konkretes Gerät (flugzeug, fernseher → Spielbegriff)
- Gebäudetyp (kirche, bahnhof → Spielbegriff)
- Spezifisches Lebensmittel (schokolade, kaffee → Spielbegriff)
- Anglizismus / Lehnwort (computer, auto → Lehnwort)
- Fachjargon (system, abteilung → abstrakt)

**Aktuell**: 1.126 Lemmas, Stand v3.1

## 6. Sprachumschaltung DE/EN (v4.0)

- Toggle-Button im Header (rechts neben „Wortliste / Word list") schaltet live zwischen Deutsch und Englisch
- Vollständige UI-Lokalisierung: Zähler-Labels, Platzhalter, Modal-Titel, Suchfeld, Schließen-Button
- Eigene englische Wortliste (`words.en.json`, ~950 Lemmas, Munroe-Philosophie)
- Eigene EN-Morphologie-Engine: irreguläre Verben, Kontraktionen, Suffix-Stripping mit Konsonanten-Verdopplungs-Heuristik
- Sprachpräferenz wird in `localStorage` gespeichert; Default: Deutsch
- FOUC-Vermeidung: Inline-Skript im `<head>` setzt `<html lang>` direkt aus localStorage
- Beide Wortlisten offline verfügbar (Service Worker precacht beide JSON-Dateien)

## 7. Nicht im Scope

Multiplayer, Sync, Timer, Punkte, KI-Prüfung, Dritte Sprache (FR/ES), Komposita-Zerlegung, URL-basierte Sprachauswahl
