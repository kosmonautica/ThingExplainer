# Wortliste: Entstehung und Wartung

## Philosophie: Munroes Simple English

Die Wortliste folgt der Philosophie von **Randall Munroe** aus seinem Buch *Thing Explainer*:

- **Häufigkeit über Alltagssprache**: Wörter, die in Gesprächen, Kinderbüchern, Nachrichten und täglicher Kommunikation vorkommen
- **Klingt vertraut**: Ein deutsches Grundschulkind würde das Wort kennen
- **Keine Fremdwörter**: Keine Anglizismen (computer, internet, app, team, job) und keine Lehnwörter
- **Keine akademischen Begriffe**: Zu abstrakte oder formale Wörter (kompetenz, gesellschaft, struktur, prozess)
- **Werkzeug, nicht Ziel**: Wörter rein wenn sie zum Erklären dienen; raus wenn sie selbst erklärt werden sollen

**Ziel**: ~1000–1200 Lemmas (Grundformen) mit einfachen, konkret greifbaren Bedeutungen.

---

## Das Aufnahme-Kriterium

**Kernfrage**: Ist dieses Wort ein *Werkzeug zum Erklären*, oder ist es selbst etwas das erklärt werden soll?

- `maschine` → **rein**: Man braucht es um andere Dinge zu erklären ("eine Maschine die Wärme erzeugt")
- `hotel` → **raus**: Das ist selbst ein Begriff den Spielende erklären müssen ("ein Haus in dem man bezahlt um darin zu schlafen")
- `motor` → **rein**: Allgemeines Hilfswort, kein Spielbegriff
- `polizist` → **raus**: Ein Beruf den man umschreiben kann und soll

---

## Entstehung der Wortliste

### Version 2.0 (2026-05-09)

#### Datenquelle

**hermitdave/FrequencyWords – `de_50k.txt`**
- URL: https://raw.githubusercontent.com/hermitdave/FrequencyWords/master/content/2018/de/de_50k.txt
- Lizenz: CC-BY
- Basis: Untertitel (Filme/Serien) → reflektiert gesprochene Alltagssprache statt Akademia
- Format: `wort häufigkeit` (nach Häufigkeit sortiert)
- Vorteil: Keine Anglizismen-Bias in den Top-Einträgen

#### Kurations-Prozess

**Schritt 1 – Rohliste generieren**
- Top-3.000 Wörter aus de_50k.txt extrahiert
- Automatisch gefiltert: Großschreibung (Eigennamen), Zahlen, offensichtliche Anglizismen

**Schritt 2 – Anglizismus-Filter**
- Entfernt: `computer`, `laptop`, `tablet`, `handy`, `internet`, `app`, `software`, `server`, `website`, `email`, `chat`, `podcast`, `video`, `film`, `foto`, `grafik`, `diagramm`, `programm`, `kanal`, `radio`, `job`, `projekt`

**Schritt 3 – Einfachheits-Filter (Munroe-Kriterium)**
- Behalten: Körperteile, Familie, Farben, Zahlen, Wetter, Essen/Trinken, Alltagsgefühle, häufige Verben, Grundadjektive
- Entfernt (zu abstrakt/akademisch): `kompetenz`, `gesellschaft`, `individuum`, `prozess`, `kontext`, `struktur`, `funktion`, `rolle`, `prinzip`, `modell`, `standard`, `niveau`, `methode`, `verfahren`, `ablauf`, `situation`, `umstand`, `vergleich`, `ähnlichkeit`, `gemeinsamkeit`, `unterschied`, `zusammenfassung`, `beschreibung`, `leistung`, `bevölkerung`

**Schritt 4 – Abgleich mit vorheriger Liste**
Gute Wörter aus der ursprünglichen words.json (1127 Einträge) beibehalten; Fehlende ergänzt.

**Ergebnis**: 1.098 Lemmas

---

### Version 2.1 (2026-05-09) — 21 Wörter ergänzt

Nach Review wurden 39 Wörter als fälschlich gefiltert identifiziert. Davon wurden 21 aufgenommen:

**Kategorie 1 — echte deutsche Wörter** (hätten nie fehlen dürfen):
`turm`, `boot`, `bauer`, `fahrer`, `richter`, `waffe`, `schild`, `pumpe`, `schalter`, `strom`, `hitze`, `kaelte`

**Kategorie 2 — vollständig eingebürgerte Lehnwörter als Hilfswörter**:
`maschine`, `motor`, `musik`, `energie`, `gummi`, `sosse`, `essig`, `instrument`, `soldat`

**Bewusst draußen gelassen** (spielerklärbar):
`hotel`, `restaurant`, `polizist`, `pilot`, `batterie`, `garage`, `tunnel`, `balkon`, `traktor`, `gitarre`, `klavier`, `trommel`, `geige`, `bäcker`, `metzger`, `chef`, `magnet`

**Ergebnis**: 1.119 Lemmas

---

## Wartung und Nachjustierung

### Wort hinzufügen

1. `words.json` öffnen (JSON-Array von Strings, lowercase)
2. Neues Lemma hinzufügen
3. Prüfen: Ist es ein Werkzeug zum Erklären? Oder selbst erklärbar?
4. `node test.mjs` ausführen — alle 57 Tests müssen grün sein
5. Committen und pushen

### Wort entfernen

1. `words.json` öffnen, Zeile löschen
2. `node test.mjs` ausführen
3. Im Browser testen: Wort sollte jetzt rot erscheinen

### Flexionsformen prüfen

Die `isAllowed()`-Funktion in `script.js` erkennt automatisch:
1. **Irregulare Tabelle** (z. B. `war` → `sein`)
2. **Direkter Treffer** (Infinitiv in der Liste)
3. **Suffix-Stripping** (z. B. `baute` → `bau` + Infinitiv `bauen`)
4. **ge-Präfix** (Partizipien II: `gelacht` → `lachen`)
5. **Umlaut-Normalisierung** (ä↔a, ö↔o, ü↔u, ß↔s)

**Wenn ein Wort nicht erkannt wird** (trotz gültigem Lemma):
- `irregulars` Map in `script.js` Zeile 6–57 prüfen
- `suffixes` Array Zeile 58 prüfen
- Im Notfall: Irregular-Form manuell zur Map hinzufügen

---

## Testing

```bash
node test.mjs   # 57 Tests, alle müssen grün sein
```

Test-Suites:
- Datenintegrität (Strings, lowercase, keine Duplikate, Größe 1100–1200)
- Kein Anglizismus, keine spielerklärbaren Wörter
- Ergänzte Grundwörter vorhanden
- Unicode-Umlaut-Normalisierung
- Flexionsformen (Substantive, Verben, Adjektive, Irreguläre)
- HTML-Escape-Funktion

---

## Morphologie-Engine (bei Änderungen Vorsicht!)

### `umlautBack(s)` – Zeile 59 in script.js

```javascript
function umlautBack(s) {
  return s
    .replace(/ä/g,'a').replace(/ö/g,'o').replace(/ü/g,'u').replace(/ß/g,'s')  // Unicode zuerst!
    .replace(/ae/g,'a').replace(/oe/g,'o').replace(/ue/g,'u').replace(/ss/g,'s');  // dann ASCII
}
```

Wichtig: Unicode-Normalisierungen müssen ZUERST erfolgen.

### `isAllowed(rawWord)` – Zeile 73 in script.js

1. Lowercase konvertieren
2. `irregulars` Map (Präteritum, Partizipien irregulärer Verben)
3. Direkter Treffer in `wordSet`
4. Suffix-Stripping (`suffixes` Array, lang zu kurz)
5. `ge-`-Präfix entfernen (Partizipien II)
6. Umlaut-Normalisierung → final in `wordSet` prüfen

---

## Deployment

Push auf `main` → GitHub Actions → GitHub Pages (2–5 Min)

Live: https://kosmonautica.github.io/ThingExplainer/

**Schnell-Check nach Deploy**: Anglizismus rot (computer), Grundwort grün (haus), Flexion grün (läuft).

---

## Häufige Fragen

**Warum ist Wort X rot, obwohl es einfach klingt?**
Prüfen: Ist es ein Werkzeug zum Erklären (→ rein) oder selbst spielerklärbar (→ raus)? Falls echtes Lücke: manuell zu words.json hinzufügen.

**Warum werden nicht alle Flexionsformen erkannt?**
Die `suffixes` Array deckt die häufigsten Endungen ab. Seltene Formen: Suffix ergänzen oder in `irregulars` eintragen.

**Portierung auf andere Sprachen?**
Nicht direkt — `irregulars` und `suffixes` sind deutschsprachig. Neue Sprache = neue Map + neues Array + neue words.json.

---

## Quellen

- Munroe, Randall (2015): *Thing Explainer*. https://xkcd.com/thing-explainer/
- hermitdave (2018): *FrequencyWords* German corpus. https://github.com/hermitdave/FrequencyWords
- Wiktionary Morphologie-Referenz: https://de.wiktionary.org/

---

**Version**: 2.1 | **Letztes Update**: 2026-05-09