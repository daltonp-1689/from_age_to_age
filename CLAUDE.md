# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
npm run dev       # start Vite dev server
npm run build     # production build → dist/
npm run preview   # serve the dist build locally
```

Requires a `.env.local` file with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.

There is no test suite and no linter configured.

## Architecture

Vanilla JavaScript SPA built with Vite. No framework. App **logic** lives in `src/main.js`; lesson **content** lives in `src/content/*.js`.

### Data flow

1. `supabase.js` — creates and exports the Supabase client.
2. `auth.js` — `initAuth(onSuccess)` checks for an existing session; if absent, renders a full-screen overlay. Calls `onSuccess(user)` once the user is authenticated.
3. `storage.js` — `loadState(userId)` fetches from Supabase (`user_progress`, `lesson_progress`, `exam_results`) and writes to `localStorage` as a cache. `saveState(S)` writes to localStorage immediately and fires an async Supabase upsert. `logExamResult(...)` inserts a new row each time an exam is completed (all attempts are preserved).
4. `main.js` — holds all state in a single object `S`, renders every screen imperatively via `innerHTML`, and calls `save()` after any mutation.

### Track config in `main.js`, content in `src/content/*.js`

- `TRACKS` — array of track configs; each track has a `lessons` array with `questions` already resolved by calling the question-pool functions.
- `DIFFICULTY_GROUPS` — groups `TRACKS` and `COMING_SOON_TRACKS` entries into Foundations / Eras / Traditions / Deep Dives for the home screen.
- Lesson content is one module per track — `survey.js` (L1–L4), `intro.js` (I1–I10), `medieval.js` (M0–M31), `america.js` (A1–A32). Each exports its `*_ARTICLE_HTML` (essay), `*_LEARN` (fill-in-the-blank), and `*_STUDY` (study card) constants plus an `attach…(TRACKS)` function. `main.js` calls those four attach functions right after `TRACKS` is defined to hang the data (incl. `coldOpen`) onto each lesson.

### Question data (`questions.js`, `questions_america.js`)

Each file exports functions (`L1_QUESTIONS()`, etc.) returning arrays of question objects. Four types:

| type | key fields |
|------|-----------|
| `mc` | `q`, `correct`, `wrong[]`, `explain` |
| `tf` | `q`, `answer` (bool), `explain` |
| `quote` | `quote`, `cite`, `q`, `correct`, `wrong[]`, `explain` |
| `timeline` | `q`, `events[]` (`{label, year}`), `explain` |

Questions are drawn randomly per session (8 per lesson quiz, 20 for the final exam).

### Progression rules

- Reading must be completed before the quiz unlocks.
- Learn mode (fill-in-blank) is optional but awards XP.
- Stars: 3 = perfect, 2 = one wrong answer, 1 = passed with more mistakes. Quiz uses 3 lives.
- Final Exam unlocks after all four Track 1 lessons have ≥ 1 star. Pass threshold: 60%.
- XP thresholds and level titles are defined near the top of `main.js` (`XP_THRESHOLDS`, `LEVEL_TITLES`).

## Supabase schema

| Table | Key columns |
|-------|------------|
| `user_progress` | `id` (user UUID), `xp`, `level`, `streak`, `last_studied` |
| `lesson_progress` | `user_id`, `track_id`, `lesson_id`, `stars`, `read_complete`, `learn_tier`, `study_complete` — unique on `(user_id, track_id, lesson_id)` |
| `exam_results` | `user_id`, `track_id`, `passed`, `score`, `stars`, `taken_at` — one row per attempt |
| `problem_reports` | `user_id`, `track_id`, `track_name`, `lesson_id`, `lesson_name`, `content_snippet`, `note` — written by the in-app "Report a problem" widget; triaged by the `fix-problem-reports` skill |

## Keep README.md up to date

Update `README.md` whenever you change the source file layout (`src/`), Supabase schema, dev/build workflow, or question/essay/learn data structure.
