# English Word List: Origin and Maintenance

*Sister document to `docs/WORTLISTE.md` (German word list). See that file for the Munroe philosophy overview.*

## Philosophy

The English word list follows the same principle as the German list, but uses the **original Munroe vocabulary** (Up Goer Five / Thing Explainer) as the primary skeleton:

> **Is this word a *tool for explaining*, or is it itself something that needs to be explained?**

- `machine` → **in**: needed to explain "a machine that makes heat"
- `telephone` → **out**: game term; explain it as "a small thing that lets you speak with people far away"
- `push`, `pull`, `lift`, `cut` → **in**: basic actions, explanation tools
- `airplane` → **out**: game term; explain it as "a large thing with wide arms that flies through the air"

---

## Word Count

**953 lemmas**, Stand v4.0.

---

## Sources (Triangulation)

A word is included if it appears in **at least 2 of 3 sources** AND passes the explanation-tool test:

1. **Munroe-1000** (Up Goer Five / Thing Explainer original list) — explanation-tool skeleton
2. **NGSL 2.0** (New General Service List, Browne et al.) — curated ESL vocabulary, top ~2800
3. **FrequencyWords en_50k.txt** (hermitdave/FrequencyWords, OpenSubtitles, top 3000) — spoken everyday language

Additionally: **Dolch/Fry Sight Words** used to validate function words (pronouns, determiners, conjunctions).

---

## Category Filters (Game Terms — Out)

| Category | Examples excluded | Rationale |
|---|---|---|
| Concrete animal species | dog, cat, horse, bird, fish, whale | Game term |
| Concrete job title | doctor, teacher, soldier, officer, nurse, pilot | Game term |
| Concrete device | television, telephone, camera, computer, car, bicycle, airplane | Game term |
| Building type | church, hotel, school, hospital, station, airport, factory | Game term |
| Specific food | coffee, wine, beer, bread, chocolate | Game term |
| Brand names / proper nouns | — | excluded by definition |

---

## Explanation Tools — In

Words that are needed to explain other things:

- **Actions**: push, pull, lift, cut, break, bend, throw, fold, pour, mix, wrap, tie, hold, carry, build, grow, burn, freeze, melt, float, sink
- **Properties**: big, small, long, short, hot, cold, hard, soft, fast, slow, heavy, light, round, flat, sharp, rough, smooth, thick, thin, straight, curved
- **Space/geometry**: top, bottom, side, edge, center, middle, front, back, corner, inside, outside, above, below, between, around
- **Matter/nature**: air, water, ground, light, fire, heat, cold, earth, sky, cloud, wind, rain, snow, ice, stone, iron, wood, glass, metal, sand, coal, dust, steam
- **Structure/shape**: line, circle, square, ring, frame, layer, tube, pipe, chain, thread, cord, rod, sheet, bar, block
- **People/relations**: person, people, child, children, man, woman, boy, girl, mother, father, son, daughter, grandfather, grandmother, friend, family
- **Thinking/feeling**: think, know, feel, want, need, learn, understand, remember, believe, hope, fear, love, trust
- **Scale**: tiny, huge, single, many, few, all, some, no, every

---

## Morphology Engine (EN)

The `isAllowed_en` function in `script.js` checks a word in this order:

1. **Contractions map** (~36 entries): `don't→do`, `can't→can`, `won't→will`, `i'm→be`, `it's→be`, `you're→be`, `they're→be`, `haven't→have`, `i'll→will`, `wouldn't→will`, `let's→let`, etc.
2. **Irregulars map** (~180 entries for 65+ verbs): `was/were/been→be`, `went/gone→go`, `ate/eaten→eat`, `said→say`, `made→make`, `thought→think`, `bought→buy`, `taught→teach`, `fought→fight`, `slept→sleep`, `could→can`, `would→will`, `should→shall`, `might→may`, etc.
3. **Direct match** in wordSet
4. **Possessive `'s`** strip: `water's` → `water`
5. **Suffix stripping** (24 suffixes, long→short): `ation`, `ness`, `tion`, `ion`, `ment`, `less`, `able`, `ible`, `ful`, `ish`, `ous`, `ive`, `iest`, `ier`, `ied`, `ies`, `ing`, `est`, `ed`, `er`, `ly`, `es`, `s`, `e`

**`checkStem_en(stem)`** after each strip:
- `wordSet.has(stem)` → match
- `wordSet.has(stem + 'e')` → match *(loving → love)*
- `wordSet.has(stem + 'y')` → match *(tries → try)*
- Doubled-consonant dedoubling: if `stem[-1] === stem[-2]` and it's a consonant → try `stem.slice(0,-1)` *(running → run)*

---

## Version History

### v4.0 (2026-05-10) — Initial English list

**953 lemmas.** First English word list for Thing Explainer.

**Sources**: Munroe-1000 (Up Goer Five) as skeleton; cross-validated with NGSL 2.0 and FrequencyWords en_50k.txt.

**Key design decisions:**
- Kept all Munroe explanation tools: push, pull, lift, cut, bend, break, pour, wrap, tie, throw
- Kept all basic adjective pairs: big/small, hot/cold, hard/soft, fast/slow, heavy/light
- Kept all function words: pronouns, determiners, conjunctions, prepositions, modal verbs
- Excluded all game terms (animals, jobs, devices, buildings, specific foods)
- Included irregular verb lemmas so inflected forms are accepted: be, have, do, say, go, get, make, know, think, take, see, come, give, find, tell, become, leave, feel, bring, begin, keep, hold, write, stand, hear, mean, meet, run, pay, sit, speak, lead, read, grow, lose, fall, send, build, understand, draw, break, spend, rise, drive, buy, wear, choose, catch, teach, throw, fight, forget, eat, shake, sleep, swim, wake, shoot, ride, sing, hide, bite, blow, fly, cost, cut, hit, hurt, put, set, shut, let, lay, lend, feed, can, will, shall, may

**Tests**: `node test.en.mjs` — 120 tests (all passing).
**Stress test**: `node test.stress.en.mjs` — 14/25 game terms fully explainable.

---

## Maintenance

### Adding a word

1. Open `words.en.json` (JSON array, lowercase, ASCII only)
2. Add the lemma in alphabetical position
3. Verify: is it an *explanation tool*? Or is it a game term?
4. Run `node test.en.mjs` — all 120 tests must pass
5. Run `node test.stress.en.mjs` — check if explainability improves
6. Bump `APP_VERSION` in `script.js`, add a version section here, update `CLAUDE.md` and `README.md`

### Removing a word

1. Remove from `words.en.json`
2. Run `node test.en.mjs` — ensure no test breaks (the data-integrity test checks for required core words)

### Checking inflected forms

The engine handles automatically:
- `running` → run (suffix -ing + doubled consonant)
- `loved` → love (suffix -ed + restore e)
- `tries` → try (suffix -ies → +y)
- `bigger` → big (suffix -er + dedouble)
- `quickly` → quick (suffix -ly)
- `was` → be (irregulars map)
- `don't` → do (contractions map)

If a word is not recognised despite a valid lemma:
1. Check `words.en.json` — is the lemma present (lowercase)?
2. In `script.js`: is the suffix in `suffixes_en`?
3. Irregular form? → add to `irregulars_en` map
4. Contraction? → add to `contractions_en` map
