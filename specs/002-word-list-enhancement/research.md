# Research: Wortlisten-Erweiterung

**Phase**: 0 – Outline & Research  
**Date**: 2026-05-09

---

## 1. Echtzeit-Filterung der Wortliste

**Decision**: `Array.filter()` + `String.includes()` bei jedem `input`-Event auf dem Suchfeld.

**Rationale**: Die Wortliste hat ~1000 Einträge. `Array.filter` über 1000 Strings ist synchron in < 1 ms – kein Debouncing, kein Web Worker nötig. DOM-Aktualisierung durch Neu-Rendern der sichtbaren Wörter als `<span>`-Elemente (gleich wie bisher).

**Alternatives considered**:
- Debouncing (300 ms): Unnötige Latenz bei so kleiner Datenmenge; abgelehnt.
- Virtuelles Scrollen: Overkill für 1000 Einträge; abgelehnt.
- Index-basierte Suche (Trie): Komplexität nicht gerechtfertigt; abgelehnt.

---

## 2. Umlaut-Normalisierung in der Suche

**Decision**: Vor dem Vergleich werden Suchbegriff und Wort durch dieselbe `umlautBack`-Funktion normalisiert, die bereits im Code existiert (`ae→a`, `oe→o`, `ue→u`, `ss→s`). Zusätzlich: Unicode-Umlaute (ä, ö, ü) im Suchbegriff werden ebenfalls normalisiert.

**Rationale**: Konsistent mit der bestehenden Morphologie-Logik in `script.js`. Nutzer können sowohl „haus" als auch „Haus" tippen und erhalten gleiche Ergebnisse.

**Alternatives considered**:
- Nur exakte Substring-Suche ohne Normalisierung: Würde „ä" und „ae" unterschiedlich behandeln; abgelehnt.
- Separate Normalisierungsfunktion: Nicht nötig – bestehende `umlautBack()` wiederverwendbar.

---

## 3. A–Z-Navigation

**Decision**: Jedem Abschnittskopf in der gerenderten Liste wird ein `id`-Attribut mit dem Anfangsbuchstaben gegeben (z. B. `id="wl-letter-s"`). Klick auf einen Buchstaben-Button ruft `document.getElementById('wl-letter-X').scrollIntoView({ behavior: 'smooth' })` auf.

**Rationale**: Natives Browser-Scrollen, kein JavaScript-Scroll-Berechnung. Funktioniert offline, barrierefrei, performant.

**Alternatives considered**:
- `scrollTop`-Berechnung: Fehleranfällig bei unterschiedlichen Elementhöhen; abgelehnt.
- URL-Hash-Anchors (`#wl-letter-s`): Würde die Browser-URL ändern und ggf. History beeinflussen; abgelehnt.

---

## 4. Inaktive Buchstaben in der A–Z-Leiste

**Decision**: Nach jedem Filter-Render wird geprüft, welche Anfangsbuchstaben in der gefilterten Liste vorhanden sind. Buchstaben ohne Treffer erhalten die CSS-Klasse `disabled` (ausgegraut, `pointer-events: none`).

**Rationale**: Visuelles Feedback für den Nutzer, welche Buchstaben anspringbar sind. Einfache DOM-Klassen-Toggle-Logik ohne zusätzliche State-Verwaltung.

---

## 5. Auto-Fokus beim Modal-Öffnen

**Decision**: Im `click`-Handler von `#btnWordlist` wird nach dem Rendern der Wortliste `searchInput.focus()` aufgerufen.

**Rationale**: Direkter Aufruf nach DOM-Insertion. Auf Desktop setzt dies den Cursor sofort. Auf Mobilgeräten ist das Verhalten browser-abhängig (iOS Safari öffnet Tastatur nur auf direkten User-Gesture-Events) – dies ist eine bekannte Einschränkung, dokumentiert in der Spec.

**Alternatives considered**:
- `autofocus`-Attribut auf dem Input: Funktioniert nur beim initialen Seitenlade, nicht beim dynamischen Einblenden; abgelehnt.
- `setTimeout(() => input.focus(), 100)`: Nicht nötig, da das Modal synchron eingeblendet wird.

---

## 6. Wortzähler-Anzeige

**Decision**: Ein `<span>` im Modal-Header zeigt die Anzahl aktuell sichtbarer Wörter. Bei leerer Suche: „X erlaubte Wörter". Bei aktiver Suche: „Y von X Wörtern". Der Text wird nach jedem Filter-Render aktualisiert.

**Rationale**: Einfachste Umsetzung – kein separater State, Zähler wird direkt aus dem gefilterten Array abgeleitet.

---

## 7. Responsive A–Z-Leiste auf kleinen Bildschirmen

**Decision**: CSS `display: flex; flex-wrap: wrap; justify-content: center` mit kleinen Buchstaben-Buttons (min 28×28 px Touch-Target). Bei sehr schmalen Screens (< 360 px) `font-size` reduzieren.

**Rationale**: Alle 26+ Buchstaben (ggf. Ä, Ö, Ü) müssen auf 360 px Breite sichtbar und tippbar sein. Flex-Wrap ist die einfachste native CSS-Lösung.

**Alternatives considered**:
- Horizontales Scrollen der Leiste: Schlechte Entdeckbarkeit; abgelehnt.
- Nur die vorhandenen Anfangsbuchstaben zeigen: Würde die Leiste inkonsistent machen; abgelehnt (alle 26 Buchstaben werden gezeigt, inaktive ausgegraut).
