# Implementation Plan: Wortlisten-Erweiterung

**Branch**: `002-word-list-enhancement` | **Date**: 2026-05-09 | **Spec**: [spec.md](./spec.md)

## Summary

Das Wortlisten-Modal wird um ein Echtzeit-Suchfeld (mit Auto-Fokus), eine A–Z-Navigationsleiste und eine Wortzähler-Anzeige erweitert. Die Umsetzung erfolgt ausschließlich in Vanilla JS / HTML5 / CSS3 direkt in den bestehenden Dateien `index.html`, `script.js` und `style.css` – ohne Frameworks, Build-Tools oder neue Abhängigkeiten.

## Technical Context

**Language/Version**: JavaScript ES6+, HTML5, CSS3  
**Primary Dependencies**: Keine (Vanilla JS, keine Frameworks)  
**Storage**: Wortliste bereits als `Set` im Speicher geladen (`wordSet`)  
**Testing**: Manuell im Browser (Chrome DevTools Mobile Emulation + reales Gerät)  
**Target Platform**: Moderne Mobilbrowser (iOS Safari, Android Chrome) + Desktop  
**Project Type**: Statische PWA (Single-Page, kein Backend)  
**Performance Goals**: Filter-Update < 100 ms, A–Z-Sprung < 200 ms  
**Constraints**: Offline-fähig, keine externen Abhängigkeiten, FTP-deploybar  
**Scale/Scope**: ~1000 Wörter in der Wortliste

## Constitution Check

*Constitution noch nicht ausgefüllt – keine projektspezifischen Gates definiert.*

Allgemeine Checks:
- ✅ Keine neue Abhängigkeit eingeführt
- ✅ Bestehende Offline-Fähigkeit (Service Worker) nicht berührt
- ✅ Keine neuen Dateien nötig – Änderungen in bestehenden Dateien
- ✅ Mobile-first bleibt gewahrt

## Project Structure

### Documentation (this feature)

```text
specs/002-word-list-enhancement/
├── plan.md              # Dieses Dokument
├── research.md          # Phase 0 Ergebnisse
├── data-model.md        # Phase 1: Datenmodell
└── tasks.md             # Phase 2 (/speckit-tasks – noch nicht erstellt)
```

### Source Code (repository root)

```text
index.html     ← Modal-Markup erweitern (Suchfeld, A–Z-Leiste, Zähler)
script.js      ← Filter-Logik, A–Z-Navigation, Auto-Fokus, Zähler-Update
style.css      ← Styles für Suchfeld, A–Z-Leiste, Zähler, inaktive Buchstaben
```

Keine neuen Dateien, keine neue Verzeichnisstruktur.

## Complexity Tracking

Keine Constitution-Verstöße – kein Eintrag nötig.
