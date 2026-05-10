# Kurz-Anleitung: Wortliste ändern

## Schnell-Links

- **Wort hinzufügen**: → `words.json` öffnen, Lemma eintragen, Version erhöhen
- **Wort entfernen**: → `words.json` öffnen, Zeile löschen, Version erhöhen
- **Testen**: → `node test.mjs` (57 Tests) + Browser-Test
- **Detailliert**: → `docs/WORTLISTE.md`
- **Technisch**: → `docs/ENTWICKLUNG.md`

---

## Wort hinzufügen

1. **words.json öffnen**, Lemma (Grundform, lowercase) hinzufügen:
   ```json
   ["haus", "gehen", "neueswort"]
   ```

2. **APP_VERSION erhöhen** — `script.js` Zeile 1:
   ```js
   const APP_VERSION = '3.2';  // ← hochzählen
   ```

3. **Versionssektion in `docs/WORTLISTE.md` anlegen** (Datum, was geändert, neue Lemmazahl)

4. **Lemmazahl aktualisieren** in `CLAUDE.md` und `README.md`

5. **Testen**:
   ```bash
   node test.mjs       # 57 Tests müssen GRÜN sein
   node test.stress.mjs  # informativ: Spielbegriffe erklärbar?
   python3 -m http.server  # Browser: neues Wort grün?
   ```

6. **Pushen und neue Version im PR-Text nennen**

---

## Wort entfernen

1. `words.json` öffnen, Zeile löschen
2. `APP_VERSION` erhöhen und Versionssektion in `WORTLISTE.md` anlegen
3. `node test.mjs` — alle grün?
4. Browser: Wort sollte jetzt ROT sein
5. Pushen

---

## Häufige Fragen

**F: Was wenn das Wort nicht erkannt wird, obwohl es in words.json steht?**
A: Flexionsformen prüfen — möglicherweise ist die Endung nicht im `suffixes`-Array. Siehe `docs/WORTLISTE.md` → Flexionsformen prüfen.

**F: Wie lange bis zum Live-Deploy?**
A: Nach Push auf `main` → 2–5 Min (GitHub Actions) → https://kosmonautica.github.io/ThingExplainer/

**F: Wo sehe ich die aktuelle Version der App?**
A: Im Header neben dem Titel (`Thing Explainer v3.1`) und im Footer des Wortlisten-Modals.

---

## Test-Checkliste vor dem Push

```bash
# 1. Automatisierte Tests
node test.mjs
# → Alle 57 Tests müssen GRÜN sein

# 2. Stresstest (informativ)
node test.stress.mjs
# → Bericht: wie viele Spielbegriffe erklärbar?

# 3. Manueller Browser-Test
python3 -m http.server
# → http://localhost:8000
# → Neues Wort grün, entferntes Wort rot
# → Header und Modal-Footer zeigen neue Versionsnummer
```

---

## Morphologie kurz erklärt

Die App erkennt **automatisch**:
- Plurale: `kinder` → `kind` ✓
- Verben: `baute` → `bauen`, `gelacht` → `lachen` ✓
- Adjektive: `größer` → `groß`, `roten` → `rot` ✓
- Umlaute: `häuser` = `haeuser` ✓
- Unregelmäßige Verben: `war` → `sein`, `kann` → `können` ✓

→ Siehe `docs/WORTLISTE.md` → **Morphologie-Engine**

---

**Fragen?** → `docs/WORTLISTE.md` oder `docs/ENTWICKLUNG.md`
