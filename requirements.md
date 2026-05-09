# Thing Explainer - Anforderungen

## 1. Projektuebersicht
Thing Explainer ist eine mobile-first PWA inspiriert von Randall Munroes Buch *Thing Explainer*. Spielende erklaeren Begriffe ausschliesslich mit den ~1.000 haeufigsten, alltaeglichsten deutschen Woertern (nach Munroe-Philosophie: keine Anglizismen, keine akademischen Begriffe). Die App prueft den Text in Echtzeit und erkennt Flexionsformen automatisch.

## 2. Workshop-Spielablauf
1. Moderator nennt einen Begriff verbal
2. Erklaerende Person oeffnet die App auf dem Smartphone
3. Sie tippt die Erklaerung in das Textfeld
4. Die App markiert jedes Wort sofort: gruen = erlaubt, rot = nicht erlaubt
5. Andere Spielende hoeren zu und raten den Begriff verbal
6. Kein digitaler Sync zwischen den Geraeten noetig

## 3. Funktionale Anforderungen
- Jedes Wort wird beim Tippen in Echtzeit geprueft
- Flektierte Formen zaehlen als erlaubt wenn ihre Grundform in der Liste steht
- Komposita werden nicht automatisch aufgeteilt
- Echtzeit-Zaehler: n erlaubt / m verboten
- Morphologie via Suffix-Stripping, Umlaut-Normalisierung, Irregulae-Tabelle
- Keine externe NLP-Bibliothek

## 3b. Wortlisten-Modal (v1.1)
- Suchfeld mit Auto-Fokus: Modal oeffnet direkt mit Cursor im Suchfeld
- Echtzeit-Filter: Substring-Suche, case-insensitiv, Umlaut-normalisiert (ae/oe/ue und Unicode-Umlaute gleichwertig)
- A-Z-Navigationsleiste: Klick springt zum jeweiligen Buchstabenabschnitt; inaktive Buchstaben ausgegraut
- Wortzaehler im Modal-Header: Gesamtanzahl erlaubter Woerter; bei aktiver Suche Trefferanzahl
- Leerzustand: Hinweistext wenn Suche keine Treffer liefert

## 4. Nicht-funktionale Anforderungen
- Web/PWA, laeuft in jedem modernen Mobilbrowser
- Offline nach erstem Laden (Service Worker)
- Vollstaendig statisch, FTP-deploybar
- Vanilla JS, keine Frameworks

## 5. Nicht im Scope v1
Multiplayer, Sync, Timer, Punkte, KI-Pruefung, Mehrsprachigkeit, Komposita-Zerlegung