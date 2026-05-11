# Thing Explainer

Eine mobile-first PWA zum Erklaeren von Begriffen — ausschliesslich mit den haeufigsten deutschen oder englischen Woertern.

**Live:** https://kosmonautica.github.io/ThingExplainer/

## Inspiration

Das Projekt ist inspiriert vom Buch [**Thing Explainer**](https://xkcd.com/thing-explainer/) von Randall Munroe (bekannt fuer [xkcd](https://xkcd.com)). In dem Buch erklaert der Autor komplizierte Begriffe unserer modernen Welt — von Atomkraftwerken bis zur Raumstation — und beschraenkt sich dabei konsequent auf die 1000 haeufigsten einfachen englischen Woerter. Diese App uebtraegt das Prinzip ins Deutsche und macht daraus ein Spiel fuer Gruppen.

## Was ist das?

Ein Wort-Erklaer-Spiel fuer Workshops und Gruppen:

1. Moderator nennt einen Begriff verbal
2. Erklaerende Person oeffnet die App auf dem Smartphone
3. Sie tippt die Erklaerung — die App markiert jedes Wort sofort **gruen** (erlaubt) oder **rot** (nicht erlaubt)
4. Andere Spielende hoeren zu und raten den Begriff

Kein Login, kein Server, kein Sync — laeuft komplett im Browser.

## Features

- Echtzeit-Pruefung beim Tippen
- Zaehler: wie viele Woerter erlaubt / verboten
- Flektierte Formen werden erkannt ("baute", "laufend", "fester" etc.)
- **Wortliste**-Button zeigt alle erlaubten Woerter
- **DE/EN-Toggle** im Header — schaltet Sprache live um; Wahl wird gemerkt
- Offline-faehig (Service Worker / PWA)
- Installierbar auf iOS und Android

## Wortliste

**v4.1.0: 1.126 deutsche Lemmas** (`words.de.json`) + **1.242 englische Lemmas** (`words.en.json`) nach der Munroe-Philosophie (EN als Hybrid aus Munroe Top-1000 + Erklär-Werkzeugen):

- **Kategorie-Filter**: Konkrete Tiere, Berufe, Geräte, Gebäudetypen und spezifisches Essen sind grundsätzlich raus — das sind Spielbegriffe, die umschrieben werden sollen
- **Erklär-Werkzeuge rein**: hammer, seil, ecke, kreis, wolke, dampf, klettern, zahn, lunge — Wörter die man braucht um andere Dinge zu beschreiben
- **Keine Anglizismen**: Kein Computer, Internet, App, Team, Job, etc.
- **Keine akademischen Begriffe**: Fokus auf Konkretheit (Haus, Farbe, Gefühl) statt Abstraktion (Kompetenz, Struktur, Prozess)
- **Aufnahme-Kriterium**: Wörter rein wenn *Werkzeug zum Erklären*; raus wenn selbst spielerklärbar (hotel → "ein Haus wo man schläft und bezahlt")
- **Quellen**: Munroe-1000 (Up-Goer-Five ins Deutsche) + DWDS-Kernwortschatz + FrequencyWords de_50k.txt
- **Inhalt**:
  - Funktionswörter, Pronomen, Präpositionen
  - Häufige Verben (inkl. Modalverben und Unregelmässige: gehen, sein, haben, kommen, etc.)
  - Adjektive + alle Farben
  - Alltagsnomen (Menschen, Familie, Körper, Werkzeuge, Natur, Gefühle, Wetter)

**Flexionsformen** (Konjugation, Deklination, Komparation) werden automatisch erkannt:
- `kinder` → `kind` ✓
- `baute` → `bauen` ✓
- `größer` → `groß` ✓
- `war` → `sein` ✓

→ Detaillierte Dokumentation: **`docs/WORTLISTE.md`** (DE) und **`docs/WORDLIST-EN.md`** (EN)

## Lokale Entwicklung

```bash
git clone https://github.com/kosmonautica/ThingExplainer.git
cd ThingExplainer
python3 -m http.server
# http://localhost:8000
```

Kein Build-Schritt noetig.

## Deployment

GitHub Actions deployt automatisch auf GitHub Pages bei jedem Push auf `main`.

## Tech-Stack

- Vanilla JS ES6+ — keine Frameworks
- HTML5 / CSS3
- Service Worker fuer Offline-Support
- PWA Manifest
- Statisch, kein Backend