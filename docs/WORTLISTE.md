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

### Version 3.0 — radikale Munroe-Konsolidierung

**Anlass**: v2.1 war intern inkonsistent. `polizist`, `pilot`, `klavier` waren korrekt ausgeschlossen, aber dutzende vergleichbarer Spielbegriffe (`hund`, `katze`, `arzt`, `lehrer`, `flugzeug`, `fernseher`, `bahnhof`, `kirche`) waren noch enthalten. Gleichzeitig fehlten klassische Munroe-Erklär-Werkzeuge (`hammer`, `seil`, `ecke`, `kreis`, `wolke`, `dampf`, `klettern`).

**Ursache**: Die Quelle `de_50k.txt` (Untertitel-Frequenz) liefert Drama-/Konversations-Wortschatz statt Werkstatt-/Physik-/Erklär-Wortschatz.

#### Methodische Änderungen

**1. Kategorie-Filter statt Wort-für-Wort-Bewertung**

Ein Wort kommt automatisch raus, wenn es in eine dieser Kategorien fällt:

| Kategorie | Beispiele | Logik |
|---|---|---|
| Konkrete Tierart | hund, katze, kuh, fuchs, fisch | Spielbegriff; ersetzbar durch „tier, das …" |
| Konkreter Beruf | arzt, lehrer, richter, fahrer, soldat | Spielbegriff; „person, die …" |
| Konkretes Gerät | flugzeug, fernseher, telefon, fahrrad | Spielbegriff; „ding, das …" |
| Gebäudetyp | bahnhof, kirche, krankenhaus, hafen | Spielbegriff; „haus, in dem …" |
| Spezifisches Lebensmittel | schokolade, kaffee, käse, kuchen | Spielbegriff; „essen, das …" |
| Musikinstrument / -werk | instrument, lied, musik | Spielbegriff |
| Anglizismus / Lehnwort | auto, taxi, sport, gummi, band | Lehnwort, oft Spielbegriff |
| Fachjargon | system, abteilung, behandlung | abstrakt-akademisch |

**Aufnahme-Regel**: Wort rein, wenn alle drei zutreffen:
1. Kommt mehrfach als Hilfsmittel in kindgerechten Erklärungen vor
2. Konkret-greifbar, nicht abstrakt
3. Nicht durch zwei einfachere Wörter ersetzbar

**2. Quellen-Stack (statt Single-Source)**

Jedes Wort muss in **mindestens zwei** Quellen vorkommen:

1. **Munroe-1000** (Up-Goer-Five-Liste, ins Deutsche übersetzt) — das Erklärwerkzeug-Skelett
2. **DWDS-Kernwortschatz** (~2.000 deutsche Hochfrequenzwörter, redaktionell kuratiert) — deutsche Spezifika
3. **`de_50k.txt`** (FrequencyWords) — Plausibilitäts-Schicht

Wörter, die nur in (3) vorkommen, sind Verdachtsfälle.

**3. Stresstest** (`test.stress.mjs`)

Verifiziert für 25 typische Spielbegriffe (klavier, gitarre, flugzeug, pilot, polizist, hund, …), ob jeweils eine 1–3-Satz-Erklärung mit der aktuellen Wortliste auskommt. Nicht-blockierend; rein informativ. Aktuell: **24 von 25 voll erklärbar**.

#### Konkrete Änderungen v3.0

**Entfernt (~80 Wörter):**
- Tiere: `bär, fisch, fuchs, hase, huhn, hund, katze, kuh, pferd, ratte, schaf, schwein, vogel, wolf, ziege`
- Berufe: `arzt, bauer, fahrer, lehrer, professor, richter, soldat`
- Geräte/Verkehr: `auto, bahn, boot, fahrrad, fernseher, flugzeug, instrument, schiff, taxi, telefon, zug`
- Gebäude/Orte: `bahnhof, brücke, garten, hafen, kirche, krankenhaus, laden, markt, park, schule, turm, wohnung`
- Spez. Essen: `bier, butter, eis, essig, kaffee, kuchen, käse, reis, saft, schokolade, sosse, suppe, tee, wein`
- Musik/Kunst: `lied, musik, theater`
- Anglizismen: `band, gummi, sport`
- Plätze/Events: `fest, reise`
- Beziehungen: `gast, kunde`
- Möbel-Räume: `bad, küche, schrank`
- Jargon: `abteilung, behandlung, beruf, entscheidung, erfahrung, erfolg, firma, gelegenheit, system, titel`

**Bewusst behalten** (mehrfach-nutzbar als Erklär-Bauteil): `motor, maschine, pumpe, schalter, waffe, schild, strom, energie, hitze` — diese sind durch andere Erklärungen oft Hilfsmittel, nicht Ziel.

**Neu hinzugekommen (~85 Wörter):**
- Werkzeuge: `hammer, säge, zange, schraube, faden, draht, seil, kette, nadel, schere, messer, gabel, löffel, topf, pfanne, tasse, flasche, schlüssel, eimer`
- Geometrie: `ecke, kante, rand, spitze, kreis, dreieck, winkel, loch, linie, fläche`
- Natur/Physik: `wolke, blitz, donner, dampf, rauch, asche, schaum, blase, schatten, licht, wärme, kälte, eisen, leder, sand, wolle`
- Körperteile: `zahn, lunge, knie, brust, daumen, lippe, zunge, stirn, wange`
- Verben: `klettern, greifen, biegen, binden, brechen, rollen, schneiden, schmelzen, kleben, gießen, mischen, falten, tun`
- Familie: `oma, opa, sohn, tochter`
- Pflanzen: `wurzel, samen, busch, korn`
- Munroe-Grundwörter: `kiste, stock, gott, schwanz, draußen, kabel, flügel, taste, wagen, ander`

**Nebenfix** in `script.js`: Die `irregulars`-Map enthielt Lemma-Werte in ASCII-Form (`koennen`, `muessen`, `heissen`), während `words.json` Unicode-Form (`können`, `müssen`, `heißen`) führte. Ergebnis: Formen wie `kann`, `muss`, `hieß` wurden fälschlich als rot markiert. Lemma-Werte sind jetzt auf Unicode umgestellt; ASCII-Schlüssel bleiben für Tipper ohne Umlaut-Tastatur weiter erkannt.

**Ergebnis**: 1.125 Lemmas (Größenkorridor weiterhin schmal, aber Inhalt deutlich Munroe-näher).

---

### Version 3.1 (2026-05-09)

- **`rad` hinzugefügt**: Klassisches Munroe-Erklär-Werkzeug ("ein Ding mit zwei Rädern") — war fälschlich nie in der Liste, obwohl Munroe "wheel" in seiner englischen Originalliste führt.
- **Versionsanzeige**: `APP_VERSION` in `script.js` Zeile 1 ist die einzige Quelle der Wahrheit. Wird beim Laden automatisch in Header (`#appVersion`) und Modal-Footer (`#wlVersion`) geschrieben.

**Ergebnis**: 1.126 Lemmas

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
node test.mjs          # 57 Tests, alle müssen grün sein
node test.stress.mjs   # informativ: Erklärbarkeit von 25 Spielbegriffen
```

`test.mjs` (blockierend) Test-Suites:
- Datenintegrität (Strings, lowercase, keine Duplikate, Größe 1050–1150)
- Kein Anglizismus, keine spielerklärbaren Wörter
- Munroe-Erklärwerkzeuge vorhanden (v3.0 Kategorien)
- Unicode-Umlaut-Normalisierung
- Flexionsformen (Substantive, Verben, Adjektive, Irreguläre)
- HTML-Escape-Funktion

`test.stress.mjs` (informativ) prüft:
- Ob 25 typische Spielbegriffe (klavier, fahrrad, hotel, polizist, hund, …) sich mit der aktuellen Wortliste in 1–3 Sätzen erklären lassen
- Welche Wörter in den Beispiel-Erklärungen fehlen → Hinweise für Wortlisten-Wartung oder bessere Erklärungen
- Aktuell: 24 von 25 voll erklärbar

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

**Version**: 3.0 | **Letztes Update**: 2026-05-09