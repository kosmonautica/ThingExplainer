# Data Model: Wortlisten-Erweiterung

**Phase**: 1 – Design  
**Date**: 2026-05-09

---

## Entitäten & State

Da die App kein Backend und kein persistentes State-Management hat, beschreibt dieses Dokument den **Laufzeit-State im Browser**.

### WordListState (Laufzeit, in-memory)

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `wordSet` | `Set<string>` | Alle erlaubten Lemmas (bereits vorhanden, aus `words.json` geladen) |
| `searchQuery` | `string` | Aktuell eingegebener Suchbegriff (lowercase, normalisiert) |
| `filteredWords` | `string[]` | Sortierte Teilmenge von `wordSet`, die `searchQuery` enthält |
| `totalCount` | `number` | `wordSet.size` – ändert sich nie zur Laufzeit |
| `filteredCount` | `number` | `filteredWords.length` – wird nach jedem Filter-Render aktualisiert |

### LetterIndex (abgeleitet, kein eigener State)

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `activeLetters` | `Set<string>` | Anfangsbuchstaben, die in `filteredWords` vorhanden sind |

Wird nach jedem Render neu berechnet – kein separater State.

---

## State-Übergänge

```
Modal geschlossen
    │
    ▼ Nutzer klickt „Wortliste"
Modal offen, searchQuery = "", filteredWords = alle Wörter
    │
    ▼ Nutzer tippt in Suchfeld
searchQuery aktualisiert → filteredWords neu berechnet → DOM neu gerendert
    │
    ▼ Nutzer leert Suchfeld
searchQuery = "" → filteredWords = alle Wörter
    │
    ▼ Nutzer klickt ✕ oder Hintergrund
Modal geschlossen, searchQuery = "" (zurückgesetzt)
```

---

## DOM-Elemente (neu / geändert)

| Element | ID / Klasse | Beschreibung |
|---------|-------------|--------------|
| Wortzähler | `#wlCount` | `<span>` im Modal-Header, zeigt „X erlaubte Wörter" / „Y von X" |
| Suchfeld | `#wlSearch` | `<input type="search">` oben im Modal |
| A–Z-Leiste | `#wlAZ` | `<div>` mit 26 `<button>`-Elementen (A–Z) |
| Buchstaben-Abschnittsköpfe | `.wl-letter-heading` | `<div id="wl-letter-X">` vor jeder Buchstabengruppe |
| Wortliste (bestehend) | `#wordlistContent` | Bleibt; Inhalt wird durch neue Render-Funktion befüllt |

---

## Keine externen Schnittstellen

Das Feature ist rein client-seitig. Es gibt keine API-Aufrufe, keine neuen Netzwerkzugriffe und keine Änderungen am Service Worker oder an `words.json`.
