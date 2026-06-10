# From Age to Age

A church history learning app built with Vite and vanilla JavaScript, backed by Supabase for auth and progress tracking.

## What it is

From Age to Age walks users through the full sweep of church history — from Pentecost to the present — through structured tracks of readings, fill-in-the-blank exercises, and quizzes. Each lesson gates behind a short essay covering the relevant era. Read first, then test what you know.

## Structure

The home screen organizes tracks into four groups — **Foundations**, **Eras**, **Traditions**, and **Deep Dives**. Four tracks currently have content:

| Track | Group | Lessons | Span |
|-------|-------|---------|------|
| Introduction to Church History | Foundations | 10 (I1–I10) | Why church history matters |
| Survey of Church History | Foundations | 4 (L1–L4) | Pentecost → present |
| The Medieval Church | Eras | 31 (M0–M31) | c. 500–1500 |
| History of the Church in America | Traditions | 32 (A1–A32) | 1607 → present |

Two registered tracks — **The Reformation Era** and **Baptist History** — are empty placeholders, alongside several "coming soon" tracks shown on the home screen for future content.

## How it works

- **Reading gates quizzes** — each lesson shows the relevant essay first. The quiz unlocks after reading.
- **Learn mode** — fill-in-the-blank sentences before the quiz (Track 1 spans three difficulty tiers; later tracks use a flat 12-item set). Optional, but awards XP.
- **Study cards** — an optional flip-through of summary text, key terms, and self-check questions between reading and the quiz.
- **Quiz engine** — 8 questions drawn randomly from a larger pool per lesson. Three lives; lose them all and retry.
- **Question types:**
  - *Multiple choice* — pick one of four options
  - *True / False* — binary answer
  - *Quote* — a pull-quote is shown; identify who said it
  - *Timeline* — tap five events in chronological order; a wrong tap resets and costs a life
- **Stars** — 3 stars for a clean run, 2 for one wrong answer, 1 for passing with more mistakes.
- **XP and levels** — correct answers and completed readings earn XP. Levels scale upward (Catechumen → Acolyte → … → Doctor Ecclesiae).
- **Streaks** — daily study streaks tracked in Supabase.
- **Track examination** — once a track's lessons are complete with at least 1 star each, a Final Examination unlocks. 20 random questions from the full pool across the track, no lives. Pass threshold: 60%. Stars: 90%+ = 3, 75%+ = 2, 60%+ = 1.
- **Practice modes** — Practice and Quick Practice draw questions across lessons/tracks for review outside the gated flow.
- **Era & Person checks** — the America track interleaves timed "Era Check" and "Person Check" interludes between lesson groups.
- **Report a problem** — an in-app widget lets users flag a content issue, written to the `problem_reports` table (triaged separately via the `fix-problem-reports` workflow).
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
  main.js              — app logic, UI rendering, routing between screens
  content/             — lesson content (essay/learn/study/cold-open), one module per track
    survey.js          —   Track 1 (L1–L4)
    intro.js           —   Track 6 — Introduction (I1–I10)
    medieval.js        —   Track 3 — Medieval (M0–M31)
    america.js         —   Track 5 — America (A1–A32)
  questions.js         — quiz question pools (Track 1 + Medieval)
  questions_america.js — quiz question pools (America)
  auth.js              — Supabase auth overlay (sign in / create account)
  storage.js           — Supabase read/write + localStorage fallback
  supabase.js          — Supabase client init
  style.css            — all styles
public/images/         — lesson images served by Vite
```

## Supabase schema

Four tables store user state:

| Table | Key columns |
|-------|-------------|
| `user_progress` | `id` (user UUID), `xp`, `level`, `streak`, `last_studied` |
| `lesson_progress` | `user_id`, `track_id`, `lesson_id`, `stars`, `read_complete`, `learn_tier`, `study_complete` — unique on `(user_id, track_id, lesson_id)` |
| `exam_results` | `user_id`, `track_id`, `passed`, `score`, `stars`, `taken_at` — one row per attempt |
| `problem_reports` | `user_id`, `track_id`, `track_name`, `lesson_id`, `lesson_name`, `content_snippet`, `note` — written by the in-app "Report a problem" widget |

## Content

- **Questions** — `src/questions.js` (Track 1 `L*` + Medieval `M*`) and `src/questions_america.js` (America `A*`) — one exported function per lesson (`L1_QUESTIONS()`, `M4_QUESTIONS()`, `A5_QUESTIONS()`, …) returning an array of question objects.
- **Essays, learn & study** — `src/content/*.js` — one module per track (`survey`, `intro`, `medieval`, `america`) exporting the `*_ARTICLE_HTML`, `*_LEARN`, and `*_STUDY` constants, each wired onto its lessons by the module's `attach…(TRACKS)` function (called from `main.js`).
- **Images** — `public/images/`, served locally by Vite. (A jsDelivr mirror of `daltonp-1689/from_age_to_age` exists on GitHub but the app no longer references it.)

## Tech

- **Build** — Vite 6
- **Auth & database** — Supabase
- **Fonts** — Fraunces, Newsreader, and Lora (serifs) + Karla (sans-serif), via Google Fonts
- **Icons** — Tabler Icons webfont (CDN)
- **Framework** — none; vanilla JS and CSS
