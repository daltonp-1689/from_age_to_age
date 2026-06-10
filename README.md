# From Age to Age

A church history learning app built with Vite and vanilla JavaScript, backed by Supabase for auth and progress tracking.

## What it is

From Age to Age walks users through the full sweep of church history — from Pentecost to the present — through a structured track of readings, fill-in-the-blank exercises, and quizzes. Each lesson gates behind a short essay covering the relevant era. Read first, then test what you know.

## Structure

**Track 1 — The Story of the Church** (the only unlocked track) has four lessons:

| Lesson | Era |
|--------|-----|
| The Early Church & Persecution | c. AD 30–313 |
| Councils & Creeds | AD 313–451 |
| Medieval Church & Schism | AD 500–1400 |
| Reformation & Modern Era | AD 1517–present |

Tracks 2–4 (Reformation Era, Patristics, Baptist History) are locked placeholders for future content.

## How it works

- **Reading gates quizzes** — each lesson shows the relevant essay first. The quiz unlocks after reading.
- **Learn mode** — fill-in-the-blank sentences across three tiers of difficulty before the quiz.
- **Quiz engine** — 8 questions drawn randomly from a larger pool per lesson. Three lives; lose them all and retry.
- **Question types:**
  - *Multiple choice* — pick one of four options
  - *True / False* — binary answer
  - *Quote* — a pull-quote is shown; identify who said it
  - *Timeline* — tap five events in chronological order; a wrong tap resets and costs a life
- **Stars** — 3 stars for a clean run, 2 for one wrong answer, 1 for passing with more mistakes.
- **XP and levels** — correct answers and completed readings earn XP. Levels scale upward (Catechumen → Acolyte → … → Doctor Ecclesiae).
- **Streaks** — daily study streaks tracked in Supabase.
- **Track examination** — after all four lessons are complete with at least 1 star each, a Final Examination unlocks. 20 random questions from the full pool across all lessons, no lives. Pass threshold: 60%. Stars: 90%+ = 3, 75%+ = 2, 60%+ = 1.
- **Progress sync** — all state (XP, stars, reading completion, exam results) is saved to Supabase. localStorage is used as a fallback when signed out.

## Running locally

```sh
npm install
npm run dev
```

Or use `dev.sh`, which bootstraps Node from `/tmp` if it isn't installed:

```sh
./dev.sh
```

Requires a `.env.local` file with:

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

## Building

```sh
npm run build   # outputs to dist/
npm run preview # serve the dist build locally
```

## Source layout

```
src/
  main.js        — app logic, UI rendering, routing between screens
  questions.js   — all quiz question data (L1–L4)
  auth.js        — Supabase auth overlay (sign in / create account)
  storage.js     — Supabase read/write + localStorage fallback
  supabase.js    — Supabase client init
  style.css      — all styles
public/images/   — lesson images served by Vite
```

## Supabase schema

Three tables store user state:

| Table | Key columns |
|-------|-------------|
| `user_progress` | `id` (user), `xp`, `level`, `streak`, `last_studied` |
| `lesson_progress` | `user_id`, `track_id`, `lesson_id`, `stars`, `read_complete` |
| `exam_results` | `user_id`, `track_id`, `passed`, `score`, `stars`, `taken_at` |

## Content

- **Questions** — `src/questions.js` — four exported functions (`L1_QUESTIONS` through `L4_QUESTIONS`), each returning an array of question objects.
- **Essay text** — `src/main.js` — `L1_ARTICLE_HTML` through `L4_ARTICLE_HTML` constants.
- **Learn exercises** — `src/main.js` — `L1_LEARN` through `L4_LEARN` arrays.
- **Images** — `public/images/` (also mirrored on jsDelivr via `daltonp-1689/from_age_to_age` for the legacy HTML build).

## Tech

- **Build** — Vite 6
- **Auth & database** — Supabase
- **Fonts** — Lora (serif) + Karla (sans-serif) via Google Fonts
- **Icons** — Tabler Icons webfont (CDN)
- **Framework** — none; vanilla JS and CSS
