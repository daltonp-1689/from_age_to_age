# From Age to Age

A church history learning app built as a single self-contained HTML file. No build step, no backend, no dependencies beyond a CDN — just open the file in a browser.

## What it is

From Age to Age walks users through the full sweep of church history — from Pentecost to the present — through a structured track of readings and quizzes. Each lesson gates behind a short essay section covering the relevant era. Read first, then test what you know.

## Structure

The app is a single file: `from-age-to-age.html`. All CSS, JavaScript, and content live inline.

**Track 1 — The Story of the Church** (the only unlocked track) has four lessons, each with its own reading and quiz:

| Lesson | Era | Reading |
|--------|-----|---------|
| The Early Church & Persecution | c. AD 30–313 | Sections I–II |
| Councils & Creeds | AD 313–451 | Section III |
| Medieval Church & Schism | AD 500–1400 | Section IV |
| Reformation & Modern Era | AD 1517–present | Sections V–VI |

Tracks 2–4 (Reformation Era, Patristics, Baptist History) are locked placeholders for future content.

## How it works

- **Reading gates quizzes** — each lesson shows the relevant essay section first. A "Start Quiz" button appears after scrolling through it.
- **Quiz engine** — 8 questions drawn randomly from a larger pool per lesson. Multiple choice and true/false. Three lives; lose them all and retry.
- **Stars** — 3 stars for no wrong answers, 2 for one wrong, 1 for passing with more mistakes.
- **XP and levels** — correct answers and completed readings earn XP. Levels up every 50 XP (scaling).
- **Streaks** — daily study streaks tracked via localStorage.
- **Progress** — all state (XP, stars, reading completion) is saved to `localStorage` under the key `fromagetoage_v1`.

## Running it

Open `from-age-to-age.html` in any modern browser. No server required.

```
open from-age-to-age.html
```

Images are hosted on jsDelivr via the `daltonp-1689/from_age_to_age` GitHub repo. An internet connection is needed to load them; the rest of the app works offline.

## Tech

- **Fonts** — Lora (serif, body/headings) + Karla (sans-serif, UI) via Google Fonts
- **Icons** — Tabler Icons webfont (CDN)
- **Storage** — `localStorage` only; no accounts, no server
- **No framework** — vanilla JS and CSS

## Content

All question pools, essay text, and images are embedded in the HTML file. To add or edit questions, find the `L1_QUESTIONS()` through `L4_QUESTIONS()` functions in the script block. To edit essay content, find `L1_ARTICLE_HTML` through `L4_ARTICLE_HTML`.
