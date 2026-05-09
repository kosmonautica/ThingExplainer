# Thing Explainer

Eine mobile-first PWA zum Erklaeren von Begriffen — ausschliesslich mit den haeufigsten deutschen Woertern.

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
- Offline-faehig (Service Worker / PWA)
- Installierbar auf iOS und Android

## Wortliste

Enthält die häufigsten deutschen Wörter als Lemmas (Grundformen), darunter:
- Funktionswörter, Pronomen, Präpositionen
- Häufige Verben (inkl. Modalverben und Unregelmässige)
- Adjektive inkl. aller Farben
- Alltagsnomen (Menschen, Orte, Gegenstände, Gefühle ...)

Flexionsformen (Konjugation, Deklination, Komparation) werden automatisch auf die Grundform zurueckgefuehrt.

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
