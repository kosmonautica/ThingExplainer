# Spec 003: English Version (i18n + EN Word List)

## User Stories

### US-01: Language Toggle
**As a** user who prefers English,
**I want** to switch the app to English with one click,
**so that** I can play the game in my preferred language.

**Acceptance Criteria:**
- [ ] A DE/EN toggle is visible in the header, to the right of the word list button
- [ ] Clicking EN switches all UI labels to English immediately (no reload required)
- [ ] Clicking DE switches back to German immediately
- [ ] The active language button is visually highlighted
- [ ] The `<html lang>` attribute updates when the language changes

### US-02: Language Persistence
**As a** returning user,
**I want** the app to remember my language choice,
**so that** I don't have to switch every time I open it.

**Acceptance Criteria:**
- [ ] Language preference is stored in `localStorage` under key `lang`
- [ ] On reload, the app starts in the previously selected language
- [ ] Default language for first-time users is German
- [ ] No FOUC (flash of untranslated content): `<html lang>` is set before `script.js` loads

### US-03: English Word Validation
**As an** English-speaking user,
**I want** the app to validate my text against an English word list,
**so that** I can play the explanation game in English.

**Acceptance Criteria:**
- [ ] English UI shows English word list (~950 lemmas, Munroe philosophy)
- [ ] Irregular verb forms are accepted: `was` → be, `went` → go, `ate` → eat
- [ ] Contractions are accepted: `don't` → do, `can't` → can, `i'm` → be
- [ ] Inflected forms are accepted: `running` → run, `bigger` → big, `loved` → love
- [ ] Game terms are rejected: `telephone`, `computer`, `airplane` → red
- [ ] Possessives are accepted: `water's` → water

### US-04: English Word List Modal
**As a** user in English mode,
**I want** the word list modal to show English words with English UI,
**so that** I can browse the allowed vocabulary.

**Acceptance Criteria:**
- [ ] Modal title shows "Allowed words" (not "Erlaubte Wörter")
- [ ] Search placeholder shows "Search …"
- [ ] Close button label is "Close"
- [ ] Counter shows "N words" / "N of M words"
- [ ] A-Z navigation covers a–z (no umlauts)
- [ ] Word count shows 953 (the EN lemma count)

### US-05: Offline Language Switch
**As a** user playing offline,
**I want** to switch between DE and EN without network access,
**so that** I can play in either language even without internet.

**Acceptance Criteria:**
- [ ] Both `words.de.json` and `words.en.json` are precached by the Service Worker
- [ ] Language switch works when the browser is offline
- [ ] Service Worker cache version is bumped to invalidate old caches

## Out of Scope

- Third language (FR, ES, …) — architecture supports it, no implementation
- URL-based language selection (`?lang=en`)
- Server-side language detection
