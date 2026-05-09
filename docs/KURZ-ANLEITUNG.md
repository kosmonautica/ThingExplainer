# Kurz-Anleitung: Wortliste ändern

## Schnell-Links

- 🎯 **Wort hinzufügen**: → `words.json` öffnen, eine Zeile `"neueswort"` hinzufügen
- 🎯 **Wort entfernen**: → `words.json` öffnen, Zeile löschen
- 🧪 **Testen**: → `node test.mjs` (lokal) oder Browser-Test (http://localhost:8000)
- 📚 **Detailliert**: → `docs/WORTLISTE.md`
- 🛠 **Technisch**: → `docs/ENTWICKLUNG.md`

---

## Wort hinzufügen (5 Min)

1. **words.json öffnen**
   ```bash
   code words.json
   # oder: Texteditor öffnen
   ```

2. **Lemma eintragen** (Grundform, lowercase)
   ```json
   [
     "haus",
     "gehen",
     "neueswort"  ← hier hinzufügen
   ]
   ```

3. **Testen** (lokal)
   ```bash
   python3 -m http.server
   # Browser: http://localhost:8000
   # Text eingeben, neues Wort sollte GRÜN sein
   ```

4. **Pushen**
   ```bash
   git add words.json
   git commit -m "Wort 'neueswort' hinzugefügt"
   git push
   ```

---

## Wort entfernen (3 Min)

1. **words.json öffnen**, Wort löschen
2. **Testen**: Browser-Test, Wort sollte ROT sein
3. **Pushen**: `git add words.json && git commit -m "..." && git push`

---

## Häufige Fragen

**F: Was wenn das Wort nicht erkannt wird, obwohl es in words.json steht?**  
A: Prüfen Sie die Flexionsformen – möglicherweise ist der Suffix nicht abgedeckt. Siehe `docs/WORTLISTE.md` → Flexionsformen prüfen.

**F: Kann ich mehrere Wörter auf einmal ändern?**  
A: Ja – alle Einträge in `words.json` ändern, `node test.mjs` ausführen (alle Tests müssen grün sein), dann pushen.

**F: Wo ist die Englische Version?**  
A: Derzeit nur Deutsch. Für andere Sprachen: Neue `words.json`, neue `irregulars` Map, neue `suffixes` Array nötig.

**F: Wie lange bis zum Live-Deploy?**  
A: Nach Push auf `main` → 2–5 Min (GitHub Actions) → https://kosmonautica.github.io/ThingExplainer/

---

## Test-Checkliste vor dem Push

```bash
# 1. Automatisierte Tests laufen
node test.mjs
# → Alle 55 Tests müssen GRÜN sein

# 2. Manueller Browser-Test
python3 -m http.server
# → http://localhost:8000
# → Ein paar Wörter eingeben, grün/rot prüfen
# → Wortliste-Modal öffnen, Suche testen

# 3. Wenn alles OK:
git add words.json
git commit -m "Beschreibung der Änderung"
git push
```

---

## Morphologie kurz erklärt

Die App erkennt **automatisch**:
- Plurale: `kinder` → `kind` ✓
- Verben: `baute` → `bauen`, `gelacht` → `lachen` ✓
- Adjektive: `größer` → `groß`, `roten` → `rot` ✓
- Umlaute: `häuser` = `haeuser` = `hauser` ✓
- Unregelmäßige Verben: `war` → `sein`, `ging` → `gehen` ✓

→ Siehe `docs/WORTLISTE.md` → **Morphologie-Engine**.

---

**Fragen?** → `docs/WORTLISTE.md` oder `docs/ENTWICKLUNG.md`