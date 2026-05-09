# Wortliste: Entstehung und Wartung

## Philosophie: Munroes Simple English

Die Wortliste folgt der Philosophie von **Randall Munroe** aus seinem Buch *Thing Explainer*:

- **Häufigkeit über Alltagssprache**: Wörter, die in Gesprächen, Kinderbüchern, Nachrichten und täglicher Kommunikation vorkommen
- **Klingt vertraut**: Ein deutsches Grundschulkind würde das Wort kennen
- **Keine Fremdwörter**: Keine Anglizismen (computer, internet, app, team, job) und keine Lehnwörter
- **Keine akademischen Begriffe**: Zu abstrakte oder formale Wörter (kompetenz, gesellschaft, struktur, prozess)

**Ziel**: ~1000 Lemmas (Grundformen) mit einfachen, konkret greifbaren Bedeutungen.

---

## Entstehung der aktuellen Wortliste (v2.0, 2026-05-09)

### Datenquelle

**hermitdave/FrequencyWords – `de_50k.txt`**
- URL: https://raw.githubusercontent.com/hermitdave/FrequencyWords/master/content/2018/de/de_50k.txt
- Lizenz: CC-BY
- Basis: Untertitel (Filme/Serien) → reflektiert gesprochene Alltagssprache statt Akademia
- Format: `wort häufigkeit` (nach Häufigkeit sortiert)
- Vorteil: Keine Anglizismen-Bias in den Top-Einträgen; all genuine deutsche Wörter

### Kurations-Prozess

**Schritt 1 – Rohliste generieren**
- Top-3.000 Wörter aus de_50k.txt extrahiert
- Automatisch gefiltert:
  - Großschreibung (Eigennamen)
  - Zahlen und Symbole
  - Offensichtliche Anglizismen (keine deutschen Suffixe, atypisches Muster)

**Schritt 2 – Anglizismus-Filter**
- Bekannte englische Wörter entfernt: `computer`, `laptop`, `tablet`, `handy`, `internet`, `app`, `software`, `server`, `website`, `email`, `chat`, `podcast`, `video`, `film`, `foto`, `grafik`, `diagramm`, `programm`, `kanal`, `radio`, `job`, `projekt`
- Lateinische Schein-Fremdwörter geprüft (z. B. `radio` hat deutsches Suffix `-dio`, aber bleibt problematisch)

**Schritt 3 – Einfachheits-Filter (Munroe-Kriterium)**
- Behalten:
  - Körperteile (auge, kopf, hand, bein)
  - Familie (mutter, vater, kind, bruder, schwester)
  - Farben (rot, blau, gruen, gelb, schwarz, weiss)
  - Zahlen und Mengenwörter (eins, zwei, drei, zehn, hundert, mehrere)
  - Wetter (sonne, regen, schnee, wind, wolke)
  - Essen/Trinken (wasser, brot, fleisch, obst, gemüse, milch, butter)
  - Alltagsgefühle (freude, angst, liebe, wut, trauer)
  - Häufige Verben (gehen, machen, denken, sagen, sehen, hoeren, nehmen, geben)
  - Grundadjektive (gross, klein, schnell, langsam, schoen, haesslich, alt, jung, neu)

- Entfernt: Zu abstrakt oder akademisch
  - `kompetenz`, `gesellschaft`, `individuum`, `prozess`, `kontext`, `struktur`, `funktion`, `rolle`, `prinzip`, `modell`, `standard`, `niveau`, `methode`, `verfahren`, `ablauf`, `situation`, `umstand`, `vergleich`, `ähnlichkeit`, `gemeinsamkeit`, `unterschied`, `zusammenfassung`, `beschreibung`, `leistung`, `bevölkerung`

**Schritt 4 – Abgleich mit vorheriger Liste**
- Gute Wörter aus der ursprünglichen words.json (1127 Wörter) beibehalten
- Fehlende einfache Wörter aus de_50k.txt ergänzt
- Redundante oder seltsam klingende Wörter gelöscht

**Schritt 5 – Manueller Review**
- Stichproben-Tests durchgeführt (z. B. "Computer" rot, "Haus" grün, "läuft" grün)
- Flektierte Formen validiert (das Morphologie-System erkennt automatisch Flexionen)

### Ergebnis

**Finale Wortliste**: 1.098 Lemmas (down from 1.127)

**Ausgeschlossene Kategorien**:
- ~30 Anglizismen / Fremdwörter
- ~25 zu abstrakte / akademische Begriffe
- ~20 seltsam klingende oder zu spezifische Wörter (spezialausdrücke, Jargon)

---

## Wartung und Nachjustierung

### Wort hinzufügen

1. `words.json` öffnen (JSON-Array von Strings, lowercase)
2. Neues Lemma am ende hinzufügen: `"neueswort"`
3. Keine besondere Sortierung nötig (App sortiert beim Anzeigen)
4. Testen: Suchfeld in der App öffnen, neues Wort sollte grün erscheinen

**Beispiel**:
```json
[
  "haus",
  "gehen",
  "rot",
  "neueswort"
]
```

### Wort entfernen

1. `words.json` öffnen
2. Zeile mit dem Wort löschen
3. Im Browser testen: Wort sollte jetzt rot markiert werden

### Flexionsformen prüfen

Die `isAllowed()`-Funktion in `script.js` erkennt automatisch Flexionsformen durch:

1. **Irregulare Tabelle** (z. B. `war` → `sein`)
2. **Direkter Treffer** (Infinitiv in der Liste)
3. **Suffix-Stripping** (z. B. `baute` → `bau` + Infinitiv `bauen`)
4. **Umlaut-Normalisierung** (ä↔a, ö↔o, ü↔u, ß↔s)

Wenn ein Lemma hinzugefügt wird (z. B. `lachen`), funktionieren automatisch:
- `lachte` (Präteritum)
- `gelacht` (Partizip II)
- `lachend` (Partizip I)
- `lache` (Präsens 1. Person)

**Wenn ein Wort nicht erkannt wird** (trotz gültigem Lemma in der Liste):
- Prüfen Sie `irregulars` Map in `script.js` (Zeile 6–57)
- Prüfen Sie `suffixes` Array (Zeile 58) – sind alle Endungen abgedeckt?
- Im Notfall: Irregular-Form manuell zur Map hinzufügen

---

## Testing

### Manuell im Browser

```bash
python3 -m http.server
# http://localhost:8000
```

**Testfälle**:
- Typisches Wort: `haus` (grün)
- Flexion: `häuser`, `hauser`, `haesuser` (alle grün – Umlaute und ASCII-Digraphen werden normalisiert)
- Irregular: `ging`, `war`, `baute` (grün)
- Anglizismus: `computer`, `internet` (rot)
- Abstrakt: `kompetenz`, `gesellschaft` (rot)
- Wortliste-Modal: Öffnet mit Fokus im Suchfeld, filtert in Echtzeit, A-Z-Navigation springt

### Automatisiert (Node.js)

```bash
node test.mjs
```

Dieser Test lädt `script.js` in einer VM, befüllt `wordSet` und führt 55 Tests durch:
- Datenintegrität (Strings, lowercase, keine Duplikate, Größe 900–1200, kein Anglizismen, Kernvokabular)
- Unicode-Umlaut-Normalisierung
- Flexionsformen (Substantive, Verben, Adjektive)
- Irreguläre Formen
- HTML-Escape-Funktion

**Alle Tests müssen grün sein** bevor die Wortliste gepusht wird.

---

## Morphologie-Engine (bei Änderungen Vorsicht!)

### `umlautBack(s)` – Zeile 59 in script.js

Normalisiert beide ASCII-Digraphen und Unicode-Umlaute:
```javascript
function umlautBack(s) {
  return s
    .replace(/ä/g,'a').replace(/ö/g,'o').replace(/ü/g,'u').replace(/ß/g,'s')  // Unicode
    .replace(/ae/g,'a').replace(/oe/g,'o').replace(/ue/g,'u').replace(/ss/g,'s');  // ASCII
}
```

Wichtig: Unicode-Normalisierungen müssen ZUERST erfolgen, sonst `ue→u` zerstört `ue` in `ü→u` Ketten.

### `checkStem(stem)` – Zeile 60 in script.js

Prüft, ob ein Stammwort erlaubt ist:
1. Lemma direkt (`wordSet.has(stem)`)
2. Mit Infinitiv-Endung (`stem + 'en'` oder `stem + 'n'`)
3. Mit Umlaut-Normalisierung

### `isAllowed(rawWord)` – Zeile 73 in script.js

Prüft ein Wort in dieser Reihenfolge:
1. Lowercase konvertieren
2. In `irregulars` Map nachschlagen (Präteritum, Partizipien irregulärer Verben)
3. Direkter Treffer in `wordSet`
4. Suffix-Stripping: `suffixes` Array von lang zu kurz durchgehen, Stammwort prüfen
5. `ge-`-Präfix entfernen (für Partizipien II: `gelacht` → `lacht`)
6. Umlaut-Normalisierung: Wenn `umlautBack` eine Änderung bewirkt, final in `wordSet` prüfen

---

## Deployment

Alle Änderungen in `words.json`:
- Committen auf `main`
- GitHub Actions deployt automatisch auf GitHub Pages
- Live unter: https://kosmonautica.github.io/ThingExplainer/

**Schnell-Check nach Deploy**:
1. https://kosmonautica.github.io/ThingExplainer/ öffnen
2. Text eingeben, grün/rot-Markierung prüfen
3. Wortliste-Button klicken, Suchfeld und A-Z-Navigation testen

---

## Häufige Fragen

### Warum wird Wort X als rot markiert, obwohl es ganz einfach ist?

- Möglicherweise nicht in der Datenquelle (FrequencyWords) vertreten
- Oder: Zu abstrakt, zu spezifisch, zu akademisch
- Lösung: Manuell zu words.json hinzufügen, Tests laufen lassen, pushen

### Warum werden Plurale erkannt, aber nicht alle Formen?

- Die `suffixes` Array deckt die häufigsten Endungen ab
- Seltene Flexionen (z. B. Duale, veraltete Dative) könnten fehlschlagen
- Lösung: Suffix zu Array hinzufügen oder Irregular-Form manuell mappen

### Kann ich die Wortliste ins Englische/Französische portieren?

- Nein – die `irregulars` Map und `suffixes` Array sind deutschsprachig
- Für andere Sprachen: Neue irregulars und suffixes definieren, neue words.json
- Das Suchfeld-System (Umlaut-Normalisierung etc.) ist sprachunabhängig

### Kann ich Komposita-Stripping implementieren?

- Nein, derzeit nicht im Scope
- Würde erfordern: Komposita-Wörterbuch, komplexe Logik zur Stammzerlegung
- Munroes Philosophie: Komposita sind legitime Konzepte (z. B. "Raumfahrt")

---

## Quellen

- Munroe, Randall (2015): *Thing Explainer*. Accessed via https://xkcd.com/thing-explainer/
- hermitdave (2018): *FrequencyWords* German corpus. https://github.com/hermitdave/FrequencyWords
- Wiktionary German Morphology Reference: https://de.wiktionary.org/
- Verein Deutsche Sprache – Anglizismen-Index (inoffiziell)

---

**Letztes Update**: 2026-05-09 (v2.0 curated list, Unicode umlaut support in morphology)