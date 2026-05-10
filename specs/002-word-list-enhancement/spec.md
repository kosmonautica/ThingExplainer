# Feature Specification: Wortlisten-Erweiterung

**Feature Branch**: `002-word-list-enhancement`  
**Created**: 2026-05-09  
**Status**: Implemented (v3.1)  
**Input**: Das Wortlisten-Modal erhält ein Suchfeld, eine A–Z-Navigation, Auto-Fokus beim Öffnen und eine Anzeige der Gesamtanzahl der erlaubten Wörter.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 – Wort per Suchfeld schnell finden (Priority: P1)

Eine erklärende Person öffnet die Wortliste und will sofort prüfen, ob ein bestimmtes Wort erlaubt ist. Das Suchfeld ist beim Öffnen bereits fokussiert – sie kann direkt tippen. Mit jedem Tastenanschlag aktualisiert sich die angezeigte Liste und zeigt nur noch Wörter, die die eingegebene Zeichenfolge enthalten.

**Why this priority**: Direktes Nachschlagen einzelner Wörter ist der häufigste Grund, die Wortliste zu öffnen. Auto-Fokus + Sofortsuche minimieren die nötige Interaktion.

**Independent Test**: Kann vollständig getestet werden, indem die Wortliste geöffnet und sofort Buchstaben getippt werden – ohne vorheriges Klicken in ein Feld.

**Acceptance Scenarios**:

1. **Given** das Wortlisten-Modal wird geöffnet, **When** das Modal erscheint, **Then** liegt der Fokus automatisch im Suchfeld und die Tastatur (mobil) kann sofort tippen.
2. **Given** das Suchfeld ist leer, **When** „haus" getippt wird, **Then** zeigt die Liste nur Wörter, die „haus" enthalten (z. B. „haus", „haushalt").
3. **Given** ein Suchbegriff ist eingegeben, **When** das Suchfeld geleert wird, **Then** zeigt die Liste wieder alle Wörter.
4. **Given** ein Suchbegriff ohne Treffer, **When** er eingegeben wird, **Then** zeigt die Liste einen Hinweis „Keine Wörter gefunden" und bleibt leer.
5. **Given** die Liste ist gefiltert, **When** ein weiterer Buchstabe getippt wird, **Then** aktualisiert sich die Liste sofort mit jedem Tastenanschlag ohne Verzögerung.

---

### User Story 2 – Per A–Z-Navigation zu einem Buchstaben springen (Priority: P2)

Eine Person will alle Wörter mit einem bestimmten Anfangsbuchstaben sehen. Über eine Leiste mit den Buchstaben A–Z kann sie mit einem Tipp/Klick direkt zu dem entsprechenden Abschnitt der Liste springen.

**Why this priority**: Ergänzt die Suche für den Fall, dass jemand Wörter aus einem bestimmten Buchstabenbereich erkunden möchte, anstatt gezielt zu suchen.

**Independent Test**: Kann getestet werden, indem auf einen Buchstaben in der A–Z-Leiste getippt wird und geprüft wird, ob die Liste an den richtigen Abschnitt springt.

**Acceptance Scenarios**:

1. **Given** die Wortliste ist geöffnet und ungefiltert, **When** auf „S" in der A–Z-Leiste getippt wird, **Then** scrollt die Liste zum ersten Wort, das mit „S" beginnt.
2. **Given** die Wortliste ist geöffnet, **When** ein Buchstabe in der A–Z-Leiste ausgewählt wird, der keine Einträge hat (z. B. „X"), **Then** springt die Liste zum nächsten verfügbaren Buchstaben oder gibt visuelles Feedback, dass kein Eintrag existiert.
3. **Given** ein Suchbegriff ist aktiv (gefilterte Liste), **When** auf einen Buchstaben in der A–Z-Leiste getippt wird, **Then** scrollt die gefilterte Liste zu Treffern, die mit diesem Buchstaben beginnen – oder gibt Feedback, wenn keine vorhanden sind.

---

### User Story 3 – Gesamtzahl der erlaubten Wörter sehen (Priority: P3)

Beim Öffnen der Wortliste sieht die Person sofort, wie viele Wörter insgesamt erlaubt sind. Dies schafft Transparenz und Orientierung.

**Why this priority**: Kleines, schnell implementierbares Feature, das das Vertrauen in die App stärkt.

**Independent Test**: Kann getestet werden, indem die Wortliste geöffnet und geprüft wird, ob eine Wortzahl-Anzeige sichtbar ist.

**Acceptance Scenarios**:

1. **Given** die Wortliste wird geöffnet, **When** das Modal erscheint, **Then** ist am oberen Rand eine Anzeige der Gesamtzahl sichtbar, z. B. „1.043 erlaubte Wörter".
2. **Given** ein Suchbegriff ist aktiv, **When** die Liste gefiltert ist, **Then** aktualisiert sich die Anzahl und zeigt die Anzahl der Treffer an, z. B. „12 von 1.043 Wörtern".
3. **Given** das Suchfeld wird geleert, **When** die Liste wieder alle Wörter zeigt, **Then** springt die Anzeige zurück zur Gesamtzahl.

---

### Edge Cases

- Was passiert bei Suche nach Umlauten (ä, ö, ü)? → Suche soll sowohl Unicode-Umlaute als auch ASCII-Ersatz (ae, oe, ue) finden.
- Was passiert, wenn die Wortliste noch nicht geladen ist und das Modal geöffnet wird? → Ladeindikator oder leere Liste, kein Absturz.
- Was passiert auf sehr kleinen Bildschirmen mit der A–Z-Leiste (26 Buchstaben)? → Leiste scrollt horizontal oder passt sich kompakt an, alle Buchstaben bleiben bedienbar.
- Was passiert, wenn während einer aktiven Suche auf einen A–Z-Buchstaben getippt wird, für den keine Treffer in der gefilterten Liste vorhanden sind? → Kein Scrollen, neutrales visuelles Feedback.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Das Wortlisten-Modal MUSS beim Öffnen den Tastaturfokus automatisch auf das Suchfeld setzen.
- **FR-002**: Das Suchfeld MUSS die Wortliste mit jedem Tastenanschlag in Echtzeit filtern (Substring-Suche, case-insensitive).
- **FR-003**: Die Suche MUSS sowohl Unicode-Umlaute (ä, ö, ü) als auch deren ASCII-Entsprechungen (ae, oe, ue) als gleichwertig behandeln.
- **FR-004**: Wenn kein Wort dem Suchbegriff entspricht, MUSS ein Hinweistext angezeigt werden.
- **FR-005**: Das Modal MUSS eine A–Z-Navigationsleiste enthalten, über die mit einem Tipp/Klick zum ersten Wort des gewählten Buchstabens gesprungen werden kann.
- **FR-006**: Buchstaben in der A–Z-Leiste, für die in der aktuellen (ggf. gefilterten) Liste keine Einträge existieren, MÜSSEN visuell als inaktiv dargestellt werden.
- **FR-007**: Am oberen Rand des Modals MUSS die Anzahl der aktuell angezeigten Wörter sichtbar sein (Gesamtzahl bei leerer Suche, Trefferanzahl bei aktiver Suche).
- **FR-008**: Alle bestehenden Schließmechanismen (✕-Button, Klick auf Hintergrund) MÜSSEN weiterhin funktionieren.
- **FR-009**: Die Wortliste MUSS weiterhin alphabetisch sortiert bleiben.

### Key Entities

- **Suchbegriff**: Die vom Nutzer eingegebene Zeichenfolge im Suchfeld; wird gegen alle Wörter der Wortliste als Substring geprüft.
- **Gefilterte Liste**: Die Teilmenge der Wortliste, deren Einträge den aktuellen Suchbegriff enthalten.
- **A–Z-Anker**: Ein Buchstabe in der Navigationsleiste, der einem Abschnitt der (gefilterten) Liste entspricht.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Nach dem Öffnen des Modals liegt der Fokus sofort im Suchfeld – ohne zusätzlichen Tipp oder Klick.
- **SC-002**: Die gefilterte Liste aktualisiert sich innerhalb von 100 Millisekunden nach jedem Tastenanschlag.
- **SC-003**: Ein Klick auf einen A–Z-Buchstaben scrollt die Liste innerhalb von 200 Millisekunden zur richtigen Position.
- **SC-004**: Die Wortzahl-Anzeige ist beim Öffnen und beim Filtern immer korrekt und sofort sichtbar.
- **SC-005**: Die A–Z-Leiste ist auf Smartphones mit Bildschirmbreiten ab 360 px vollständig bedienbar (alle 26 Buchstaben erreichbar).
- **SC-006**: Das Feature funktioniert vollständig offline (kein Netzwerk nötig nach dem ersten Laden).

---

## Assumptions

- Die Wortliste ist zum Zeitpunkt des Modal-Öffnens vollständig geladen (words.json wurde beim App-Start geladen).
- Die Wortliste enthält ausschließlich deutsche Kleinbuchstaben-Lemmas; keine Zahlen oder Sonderzeichen als Wortanfang.
- Die Suche prüft Substrings (nicht nur Präfixe), da Nutzende möglicherweise nach Wortteilen suchen.
- Keine Fuzzy-Suche oder Tippfehler-Toleranz in dieser Version – nur exakte Substring-Übereinstimmung.
- Die A–Z-Leiste zeigt alle 26 deutschen Buchstaben (inkl. Ä, Ö, Ü als Teil der alphabetischen Ordnung werden auf A, O, U gemappt oder separat behandelt).
- Mobile Tastatur beim Auto-Fokus: Das Verhalten (ob die Tastatur automatisch aufklappt) ist browser-/betriebssystemabhängig und liegt außerhalb der App-Kontrolle.
