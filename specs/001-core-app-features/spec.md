# Feature Specification: Thing Explainer – Core App Features

**Feature Branch**: `001-core-app-features`  
**Created**: 2026-05-09  
**Status**: Implemented (v3.1)  
**Input**: Dokumentation der bestehenden Features der Thing Explainer PWA

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 – Erklärung tippen mit Echtzeit-Feedback (Priority: P1)

Eine erklärende Person tippt ihre Erklärung in das Textfeld. Jedes Wort wird sofort farblich markiert: grün, wenn es zu den 1000 häufigsten deutschen Wörtern gehört (inklusive Flexionsformen), rot, wenn nicht. Gleichzeitig aktualisiert sich ein Zähler, der anzeigt, wie viele Wörter erlaubt bzw. verboten sind.

**Why this priority**: Dies ist die Kernfunktion der App. Ohne Echtzeit-Feedback hat die App keinen Nutzen.

**Independent Test**: Kann vollständig getestet werden, indem man Text eintippt und beobachtet, ob Wörter korrekt markiert werden und sich der Zähler aktualisiert.

**Acceptance Scenarios**:

1. **Given** ein leeres Textfeld, **When** die Person „Haus" eintippt, **Then** erscheint „Haus" grün markiert und der erlaubt-Zähler zeigt 1.
2. **Given** ein leeres Textfeld, **When** die Person „Demokratie" eintippt, **Then** erscheint „Demokratie" rot markiert und der verboten-Zähler zeigt 1.
3. **Given** ein teilweise gefülltes Textfeld, **When** die Person ein weiteres Wort tippt, **Then** aktualisieren sich Markierungen und Zähler sofort ohne Verzögerung oder Seitenreload.
4. **Given** ein Textfeld mit Text, **When** die Person Text löscht, **Then** passen sich Markierungen und Zähler sofort an.

---

### User Story 2 – Flexionsformen werden als erlaubt erkannt (Priority: P2)

Die App erkennt gebeugte Wortformen (z. B. „lief", „schneller", „gebaut") als erlaubt, wenn ihre Grundform in der Wortliste steht. Dies gilt für Verben, Adjektive und Nomen.

**Why this priority**: Ohne Flexionserkennung würden viele alltägliche Wortformen fälschlicherweise als verboten markiert, was das Spielerlebnis stark beeinträchtigt.

**Independent Test**: Kann getestet werden, indem flektierte Formen bekannter Grundwörter eingegeben und auf grüne Markierung überprüft werden (z. B. „lief" → grün wegen „laufen", „schneller" → grün wegen „schnell").

**Acceptance Scenarios**:

1. **Given** dass „laufen" in der Wortliste steht, **When** „lief" eingegeben wird, **Then** wird „lief" grün markiert.
2. **Given** dass „schnell" in der Wortliste steht, **When** „schneller" eingegeben wird, **Then** wird „schneller" grün markiert.
3. **Given** dass „bauen" in der Wortliste steht, **When** „gebaut" eingegeben wird, **Then** wird „gebaut" grün markiert.
4. **Given** dass „sein" in der Wortliste steht, **When** „war" eingegeben wird, **Then** wird „war" grün markiert (irreguläre Form).
5. **Given** ein Wort, dessen Stamm nach Umlaut-Normalisierung in der Liste steht, **When** es eingegeben wird, **Then** wird es grün markiert (z. B. „älter" → „alt").

---

### User Story 3 – Erlaubte Wortliste einsehen (Priority: P3)

Die erklärende Person kann jederzeit alle erlaubten Grundwörter in einer alphabetisch sortierten Liste nachschlagen, um sich beim Formulieren der Erklärung zu orientieren.

**Why this priority**: Unterstützt das Spielerlebnis, ist aber kein Blocker für die Kernfunktion.

**Independent Test**: Kann getestet werden, indem der Wortliste-Button gedrückt und die Anzeige des Modals mit sortierten Wörtern überprüft wird.

**Acceptance Scenarios**:

1. **Given** die App ist geladen, **When** auf „Wortliste" geklickt wird, **Then** öffnet sich ein Modal mit allen erlaubten Grundwörtern in alphabetischer Reihenfolge.
2. **Given** das Wortlisten-Modal ist geöffnet, **When** auf das ✕-Symbol oder außerhalb des Modals geklickt wird, **Then** schließt sich das Modal.
3. **Given** das Modal ist geöffnet, **When** es angezeigt wird, **Then** sind die Wörter auf Deutsch alphabetisch sortiert (ä, ö, ü korrekt eingeordnet).

---

### User Story 4 – Offline-Nutzung nach erstem Laden (Priority: P4)

Spielende können die App auch ohne aktive Internetverbindung nutzen, nachdem sie sie einmal mit Verbindung geöffnet haben. Die App funktioniert dann vollständig offline.

**Why this priority**: Entscheidend für den Einsatz in Workshops mit unzuverlässiger WLAN-Verbindung, aber kein Blocker für den Online-Betrieb.

**Independent Test**: Kann getestet werden, indem die App einmal mit Verbindung geladen, dann die Verbindung getrennt und die App neu geladen wird.

**Acceptance Scenarios**:

1. **Given** die App wurde mindestens einmal mit Internetverbindung geöffnet, **When** die Verbindung getrennt und die App neu geladen wird, **Then** startet die App vollständig funktionsfähig.
2. **Given** Offline-Modus, **When** Text eingegeben wird, **Then** funktionieren Echtzeit-Markierung und Zähler normal.
3. **Given** Offline-Modus, **When** die Wortliste geöffnet wird, **Then** werden alle erlaubten Wörter angezeigt.

---

### User Story 5 – Mobile-optimierte Bedienung (Priority: P4)

Die App ist auf Smartphones komfortabel nutzbar: Das Textfeld ist gut erreichbar, die Farbmarkierungen gut lesbar und die Benutzeroberfläche passt sich an kleine Bildschirme an.

**Why this priority**: Da die App im Workshop auf Smartphones eingesetzt wird, ist mobile Nutzbarkeit essenziell, aber unabhängig von der Kernlogik testbar.

**Independent Test**: Kann auf einem realen Smartphone oder im Browser-DevTool im mobilen Emulationsmodus getestet werden.

**Acceptance Scenarios**:

1. **Given** ein Smartphone mit typischer Bildschirmbreite (360–430px), **When** die App geöffnet wird, **Then** sind alle Bedienelemente sichtbar und bedienbar ohne horizontales Scrollen.
2. **Given** die virtuelle Tastatur ist eingeblendet, **When** Text getippt wird, **Then** bleibt das Textfeld sichtbar und scrollt nicht unbeabsichtigt weg.
3. **Given** ein Smartphone, **When** die Wortliste geöffnet wird, **Then** ist das Modal scrollbar und vollständig bedienbar.

---

### Edge Cases

- Was passiert bei einem leeren Textfeld? → Beide Zähler zeigen 0, kein Fehler.
- Was passiert bei Sonderzeichen, Zahlen oder Interpunktion? → Nicht-Buchstaben werden nicht markiert, nur Wörter (Buchstabenfolgen) werden geprüft.
- Was passiert bei Großschreibung? → Wortprüfung ist case-insensitive; „Haus" und „haus" werden gleich behandelt.
- Was passiert bei Komposita (z. B. „Haustor")? → Komposita werden nicht automatisch aufgeteilt; nur das Gesamtwort wird geprüft.
- Was passiert, wenn words.json nicht geladen werden kann? → Die App bleibt nutzbar, markiert aber alle Wörter als verboten (wordSet ist leer).

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Die App MUSS jedes eingetippte Wort in Echtzeit (während des Tippens) farblich markieren: grün für erlaubt, rot für verboten.
- **FR-002**: Die App MUSS einen Echtzeit-Zähler anzeigen, der die Anzahl erlaubter und verbotener Wörter getrennt ausweist.
- **FR-003**: Die App MUSS flektierte Formen erkennen, wenn ihre Grundform in der Wortliste steht (Suffix-Stripping, Umlaut-Normalisierung, irreguläre Verben).
- **FR-004**: Die App MUSS eine vollständige Tabelle irregulärer Verbformen unterstützen, die auf ihre Infinitive zurückgeführt werden.
- **FR-005**: Die App MUSS eine alphabetisch sortierte Liste aller erlaubten Grundwörter in einem Modal anzeigen können.
- **FR-006**: Das Wortlisten-Modal MUSS durch Klick auf ✕ oder auf den Hintergrund schließbar sein.
- **FR-007**: Die App MUSS nach dem ersten Laden vollständig offline nutzbar sein (Service Worker, gecachte Assets und Wortliste).
- **FR-008**: Die App MUSS auf mobilen Browsern (Smartphone, moderner Browser) vollständig funktionieren.
- **FR-009**: Die Wortprüfung MUSS case-insensitive erfolgen.
- **FR-010**: Nicht-alphabetische Zeichen (Zahlen, Satzzeichen, Leerzeichen) MÜSSEN von der Wortprüfung ausgenommen werden und ungefärbt bleiben.
- **FR-011**: Die App MUSS ohne Backend, Build-Tool oder serverseitige Logik betreibbar sein (statische Dateien).

### Key Entities

- **Wort (Token)**: Eine zusammenhängende Folge von Buchstaben (inkl. ä, ö, ü, ß) im Eingabetext; wird einzeln geprüft.
- **Grundform (Lemma)**: Die Wörterbuchform eines Wortes, wie sie in der Wortliste (words.json) steht; immer lowercase.
- **Wortliste**: Das flache JSON-Array aller erlaubten deutschen Lemmas (ca. 1000 Einträge); wird einmalig beim Start geladen.
- **Irreguläre Form**: Eine Flexionsform, die nicht durch Suffix-Stripping erkennbar ist und daher in einer festen Tabelle nachgeschlagen wird.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Farbmarkierungen erscheinen innerhalb von 100 Millisekunden nach jeder Tastatureingabe (kein wahrnehmbarer Lag).
- **SC-002**: Korrekt erkannte Flexionsformen: mindestens 90 % der gebräuchlichsten Verb-, Adjektiv- und Nominalflexionen werden korrekt als erlaubt oder verboten klassifiziert.
- **SC-003**: Die App lädt nach dem ersten Besuch vollständig offline in unter 3 Sekunden.
- **SC-004**: Alle Bedienelemente sind auf Smartphones mit Bildschirmbreiten ab 360 px ohne Zoomen oder horizontales Scrollen erreichbar.
- **SC-005**: Die Wortliste öffnet sich und zeigt alle erlaubten Wörter in unter 500 Millisekunden.
- **SC-006**: Die App ist als PWA installierbar (erfüllt Browser-Mindestanforderungen: Manifest + Service Worker).

### User Story 6 – Versionsnummer sichtbar (Priority: P5)

Die App zeigt ihre aktuelle Version sowohl im Header als auch im Wortlisten-Modal an, damit Nutzende nach einem Update erkennen können, welche Version sie verwenden.

**Acceptance Scenarios**:

1. **Given** die App ist geladen, **When** der Header sichtbar ist, **Then** ist neben dem Titel eine kleine Versionsnummer zu sehen (z. B. `v3.1`).
2. **Given** das Wortlisten-Modal ist geöffnet, **When** es angezeigt wird, **Then** zeigt der Modal-Footer dieselbe Versionsnummer wie der Header.
3. **Given** eine neue Version deployed wird, **When** `APP_VERSION` in `script.js` erhöht wird, **Then** aktualisieren sich beide Anzeigen ohne weitere Code-Änderungen.

---

## Assumptions

- Zielgruppe sind erwachsene Spielende in einem Workshop-Umfeld, die Smartphones mit modernen Browsern verwenden.
- Die Wortliste umfasst ca. 1000 häufige deutsche Lemmas und wird nicht zur Laufzeit editiert.
- Komposita-Zerlegung ist explizit außerhalb des Scopes (kein automatisches Aufteilen zusammengesetzter Wörter).
- Es gibt keine Benutzerkonten, keine Datenpersistenz über Sessions hinaus und keinen Multiplayer-Modus.
- Die App wird über GitHub Pages oder per FTP auf einen einfachen Webserver deployed; kein serverseitiges Rendering.
- Sprachunterstützung ist ausschließlich Deutsch (keine Mehrsprachigkeit in v1).
- Die Wortprüfung behandelt Umlaute in ASCII-Kodierung (ae/oe/ue) und in Unicode-Form gleich.
