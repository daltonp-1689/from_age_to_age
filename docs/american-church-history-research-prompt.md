# Research Prompt: American Church History Track
## For use with a deep research AI

---

## Context

I'm building a church history learning app called *From Age to Age*. Each lesson has five components: a **cold open** (cinematic intro), a **reading article**, a **learn** exercise (tiered fill-in-the-blank), a **study** review (flashcard summaries), and a **quiz** drawn from a larger question pool. There is also a **final exam** that draws from all lesson question pools.

I need you to research and output everything required for a new track: **American Church History**.

---

## Track Overview

```js
{
  id: 'track5',
  name: 'American Church History',
  eyebrow: 'Track 5 — American Christianity',
  desc: 'From the Puritan settlers to the present — how Christianity shaped, and was shaped by, the American experiment.',
  icon: 'ti-map-pin',
  pills: ['Puritans', 'Awakenings', 'Civil War', 'Modern America'],
  lessons: [ /* 8 lessons — see below */ ]
}
```

---

## Lesson Structure (8 lessons required)

Divide American Church History into these eight eras. Each one is historically distinct and should not be merged with a neighbor — the Founding era's deism-vs-Christianity tension, the Civil War as theological crisis, and the Fundamentalist-Modernist split each deserve their own space.

| Lesson | Name | Era | Era Label (for UI) |
|--------|------|-----|--------------------|
| L1 | Colonial Foundations | 1607–1700 | c. 1607–1700 |
| L2 | The First Great Awakening | 1700–1770 | c. 1700–1770 |
| L3 | Christianity & the American Founding | 1770–1800 | c. 1770–1800 |
| L4 | The Second Awakening & Frontier Christianity | 1800–1840 | c. 1800–1840 |
| L5 | Slavery, Abolition & the Civil War | 1840–1870 | c. 1840–1870 |
| L6 | Gilded Age, Revival & the Social Gospel | 1870–1910 | c. 1870–1910 |
| L7 | Fundamentalism, Modernism & Mid-Century Christianity | 1910–1960 | c. 1910–1960 |
| L8 | Contemporary American Christianity | 1960–Present | c. 1960–Present |

---

## What You Need to Output

### A. For each lesson — a QUESTION POOL

Each lesson needs **at least 20 questions** (the quiz draws 8 at random; the final exam draws from all pools).

There are 4 question types. Use a good mix across all 4 types for each lesson.

---

#### Type 1: Multiple Choice (`mc`)
```js
{
  type: 'mc',
  era: 'Colonial',  // short era label, used as a tag
  q: 'Question text here?',
  correct: 'The correct answer (full text)',
  wrong: [
    'Wrong answer 1',
    'Wrong answer 2',
    'Wrong answer 3',
    'Wrong answer 4',
    'Wrong answer 5',
    'Wrong answer 6',
    'Wrong answer 7',
  ],  // 7 wrong answers — the app picks 3 at random to display alongside the correct one
  explain: 'Explanation shown after the user answers — 1–3 sentences, historically rich.'
}
```

---

#### Type 2: True / False (`tf`)
```js
{
  type: 'tf',
  era: 'Colonial',
  q: 'Statement that is either true or false.',
  answer: true,  // or false
  explain: 'Explanation shown after the user answers — correct the misconception or confirm the fact.'
}
```

---

#### Type 3: Quote Identification (`quote`)
```js
{
  type: 'quote',
  era: 'Awakenings',
  quote: '"The exact quote text goes here."',
  cite: '— Source / context, c. YEAR',
  q: 'Who said / wrote this?',
  correct: 'Full name of the person',
  wrong: [
    'Wrong person 1',
    'Wrong person 2',
    'Wrong person 3',
    'Wrong person 4',
    'Wrong person 5',
    'Wrong person 6',
    'Wrong person 7',
  ],  // 7 wrong names — app picks 3 at random
  explain: 'Explanation of who said it and why it matters historically.'
}
```

Use well-known, verifiable quotes from real historical figures. Do not invent quotes.

---

#### Type 4: Timeline Ordering (`timeline`)
```js
{
  type: 'timeline',
  era: 'Civil War',
  q: 'Tap these events in chronological order, earliest first.',
  events: [
    { label: 'Short event description', year: 1741 },
    { label: 'Short event description', year: 1776 },
    { label: 'Short event description', year: 1801 },
    { label: 'Short event description', year: 1833 },
    { label: 'Short event description', year: 1859 },
  ],  // exactly 5 events, each with a year (integer)
  explain: 'Brief explanation of the correct order and why each event matters.'
}
```

Each lesson should include **at least 2 timeline questions** with 5 events each.

---

### B. For each lesson — a READING ARTICLE (HTML)

The article is rendered directly into the page. Write it as raw HTML following this structure exactly:

```html
<div class="article-eyebrow">
  <span class="art-tag">Lesson N Reading · Section X</span>
  <span class="art-time"><i class="ti ti-clock"></i> ~X min read</span>
</div>
<h1 class="article-title">Lesson Title Here</h1>
<p class="article-sub">A one-sentence italic subtitle that previews what the lesson covers.</p>
<div class="art-divider"></div>
<div class="article-body">

<h3>Section Title (Year–Year)</h3>
<p>Body text. Use <strong>bold</strong> to highlight key names and events on first mention. Keep paragraphs 3–5 sentences. Write at a college-educated general audience level — authoritative but not academic.</p>

<!-- Use portrait figure layout for individual people: -->
<figure class="art-fig portrait">
  <div class="fig-img-wrap">
    <!-- No src needed — leave as a placeholder. Write a data-person attribute with the person's full name so I can find the image -->
    <img data-person="Jonathan Edwards" style="width:100%;height:100%;object-fit:cover;object-position:top center;display:block;">
  </div>
  <div class="fig-body">
    <div class="fig-label">Role · Birth–Death</div>
    <div class="fig-title">Person's Full Name</div>
    <div class="fig-desc">2–3 sentence description of this person's historical significance.</div>
  </div>
</figure>

<!-- Use landscape figure layout for events, places, or groups: -->
<figure class="art-fig">
  <div class="fig-img-wrap" style="min-height:220px;">
    <img data-scene="Cane Ridge Revival 1801" style="width:100%;max-height:360px;object-fit:cover;display:block;">
  </div>
  <figcaption><strong>Caption title.</strong> 1–2 sentence caption explaining what the image shows and why it matters.</figcaption>
</figure>

<!-- Use this box for compact date-based reference lists: -->
<div class="atl-box">
  <div class="atl-label">Key dates / Key figures / etc.</div>
  <div class="atl-row"><div class="atl-year">1741</div><div class="atl-text">Event description</div></div>
  <div class="atl-row"><div class="atl-year">1776</div><div class="atl-text">Event description</div></div>
</div>

<!-- Use pull-quotes sparingly (1 per article max) for famous quotes: -->
<div class="pull-quote">
  <p>"The quote text."</p>
  <cite>— Person, Source, Year</cite>
</div>

</div>
```

**Article guidelines:**
- Each article should be **~400–600 words of body text** (not counting HTML tags), roughly 3–5 paragraphs
- Include **2–3 figure elements** per article (mix of portrait and landscape)
- Include **1 atl-box** with 4–6 key dates or people
- Highlight major names and terms in `<strong>` on first mention only
- Read time: estimate honestly (~2–4 min reads)

---

### C. For each lesson — a LEARN array

The Learn screen is a tiered fill-in-the-blank exercise. Each item is a sentence with one blank (`_____`) and a small word bank. Questions are grouped into 3 tiers of increasing difficulty — Tier 1 is accessible and foundational, Tier 2 requires more specific knowledge, Tier 3 demands precise recall of details, vocabulary, or nuance.

Each lesson needs **at least 25–28 Learn items** distributed roughly as:
- Tier 1: ~10 items (broad facts, dates, famous names)
- Tier 2: ~10 items (more specific knowledge, cause/effect, terminology)
- Tier 3: ~8 items (precise details, quotes, fine distinctions)

```js
const L1_LEARN = [
  // ── Tier 1 ──────────────────────────────────────────────────────────────
  {
    sentence: "The Puritans who founded Massachusetts Bay Colony in 1630 were led by Governor John _____.",
    answer: "Winthrop",
    options: ["Winthrop", "Bradford", "Williams", "Penn"],  // always 4 options: 1 correct + 3 plausible wrong
    explanation: "John Winthrop led the Puritan migration and delivered the 'city on a hill' sermon aboard the Arbella — framing America as a divine experiment.",
    tier: 1
  },
  // ── Tier 2 ──────────────────────────────────────────────────────────────
  {
    sentence: "Roger Williams was expelled from Massachusetts for arguing that the civil government had no authority over matters of _____.",
    answer: "conscience",
    options: ["conscience", "taxation", "land", "Scripture"],
    explanation: "Williams insisted the state had no right to enforce religious belief — a radical idea at the time that led to his founding of Rhode Island as a haven for religious dissenters.",
    tier: 2
  },
  // ── Tier 3 ──────────────────────────────────────────────────────────────
  {
    sentence: "Harvard College was founded in 1636 primarily to train a literate _____.",
    answer: "ministry",
    options: ["ministry", "government", "military", "merchant class"],
    explanation: "Harvard's original purpose was to ensure a trained ministry for New England — the founders feared leaving 'an illiterate ministry to the churches when our present ministers lie in the dust.'",
    tier: 3
  },
];
```

**Learn guidelines:**
- Every sentence must have **exactly one blank** marked with `_____`
- The blank should test a meaningful word — not filler. The sentence without the blank should make grammatical sense as a statement.
- **4 options always**: 1 correct + 3 wrong that are plausible but clearly distinguishable
- Wrong options should be **same part of speech** as the correct answer
- Explanations should add historical context, not just confirm the answer
- Distribute tiers as described — do not front-load Tier 1

---

### D. For each lesson — a STUDY object

The Study screen presents summary cards, each with key terms and review Q&A. It appears after Learn and before the Quiz. Each lesson needs **3 Study cards**.

```js
const L1_STUDY = {
  cards: [
    {
      text: "2–4 sentence summary paragraph covering the core narrative of this card's sub-topic. This is what the learner reads first — make it punchy and clear.",
      terms: [
        { word: "Term", def: "Definition — 1–2 sentences. Precise, informative, memorable." },
        { word: "Another Term", def: "Definition." },
        // 2–4 terms per card
      ],
      questions: [
        { q: "A review question the learner should be able to answer after reading this card?", a: "The answer — 1–3 sentences, complete and accurate." },
        { q: "Another review question?", a: "Answer." },
        { q: "A third review question?", a: "Answer." },
        // 2–4 questions per card
      ]
    },
    // card 2 ...
    // card 3 ...
  ],
  questions: [
    // Optional: 3–5 broader review questions spanning all 3 cards
    { q: "Broader synthesis question across the lesson?", a: "Answer." },
  ]
};
```

**Study guidelines:**
- Each of the 3 cards should cover a distinct **sub-topic** within the lesson era — not just repeat the same material
- Terms should be genuinely important vocabulary — theological terms, names, or concepts a student might look up
- Questions should build from recall to comprehension — not just "what year did X happen" but "why did X matter"
- The top-level `questions` array (outside `cards`) covers synthesis across the whole lesson — include 3–5 of these

---

### E. For each lesson — a COLD OPEN

The Cold Open is a cinematic intro shown before the reading article loads. It's a sequence of 6 dramatic title cards displayed against a full-screen background image. The tone is propulsive and narrative — like a documentary cold open. Each card has a short label and a punchy line of text.

The 6 cards always follow this dramatic arc:
1. **The World Before** — set the scene. What was the world like just before this era?
2. **The Crisis** — what happened, or what question was being forced?
3. **The Stakes** — why did this matter enormously?
4. **The Key Figures** — drop 3–4 names. Spare. No explanation yet.
5. **The Surprise** — a counterintuitive or ironic twist about how this era turned out.
6. **The Bridge** — invite the learner in. "Here's the story of…"

Each card also has a `size` property — `'lg'`, `'xl'`, or `'md'` — which controls text size. Use `'xl'` for the most dramatic single-sentence lines, `'lg'` for substantial statements, `'md'` for more nuanced setup lines.

```js
// One entry per lesson — 8 total
{
  _bg: 'BACKGROUND_IMAGE_PLACEHOLDER',  // leave as this string — I will supply the image
  cards: [
    { label: 'The World Before', text: 'Set the scene in one vivid sentence.', size: 'lg' },
    { label: 'The Crisis',       text: 'The inciting tension or question — one sentence.', size: 'xl' },
    { label: 'The Stakes',       text: 'Why this mattered enormously — one sentence.', size: 'lg' },
    { label: 'The Key Figures',  text: 'Name 1. Name 2. Name 3. Spare noun phrases only.', size: 'xl' },
    { label: 'The Surprise',     text: 'The counterintuitive twist — one sentence.', size: 'xl' },
    { label: 'The Bridge',       text: 'Here\'s the story of… — one sentence invitation.', size: 'md' },
  ]
}
```

**Cold Open guidelines:**
- Each card is **one sentence only** — no exceptions
- The Key Figures card is **names only** — no verbs, no descriptions. Just the names, separated by periods or a short connector.
- The Surprise card should genuinely surprise — not just summarize. Find the irony, the reversal, the unexpected outcome.
- The Bridge card always begins with "Here's…" or "This is…"
- Tone: cinematic, propulsive, present tense where possible

---

## Historical Scope & Content Guidelines

For each lesson, research the most historically significant people, events, and themes within that era yourself. Do not limit yourself to any pre-supplied list — bring your own deep knowledge of American church history to bear.

The only fixed information per lesson is the **name, date range, and era tag** to use:

| Lesson | Name | Date Range | Era tag |
|--------|------|------------|---------|
| L1 | Colonial Foundations | 1607–1700 | `'Colonial'` |
| L2 | The First Great Awakening | 1700–1770 | `'First Awakening'` |
| L3 | Christianity & the American Founding | 1770–1800 | `'Founding'` |
| L4 | The Second Awakening & Frontier Christianity | 1800–1840 | `'Second Awakening'` |
| L5 | Slavery, Abolition & the Civil War | 1840–1870 | `'Civil War'` |
| L6 | Gilded Age, Revival & the Social Gospel | 1870–1910 | `'Gilded Age'` |
| L7 | Fundamentalism, Modernism & Mid-Century Christianity | 1910–1960 | `'Fundamentalism'` |
| L8 | Contemporary American Christianity | 1960–Present | `'Contemporary'` |

---

## Output Format

Please output the following, in this order. Complete all 8 lessons for each section before moving to the next section.

**Section 1 — Question Pools**
1. `L1_QUESTIONS()` — min 20 questions, Lesson 1
2. `L2_QUESTIONS()` — min 20 questions, Lesson 2
3. `L3_QUESTIONS()` — min 20 questions, Lesson 3
4. `L4_QUESTIONS()` — min 20 questions, Lesson 4
5. `L5_QUESTIONS()` — min 20 questions, Lesson 5
6. `L6_QUESTIONS()` — min 20 questions, Lesson 6
7. `L7_QUESTIONS()` — min 20 questions, Lesson 7
8. `L8_QUESTIONS()` — min 20 questions, Lesson 8

**Section 2 — Reading Articles**
9. `L1_ARTICLE_HTML`
10. `L2_ARTICLE_HTML`
11. `L3_ARTICLE_HTML`
12. `L4_ARTICLE_HTML`
13. `L5_ARTICLE_HTML`
14. `L6_ARTICLE_HTML`
15. `L7_ARTICLE_HTML`
16. `L8_ARTICLE_HTML`

**Section 3 — Learn Arrays**
17. `const L1_LEARN = [...]`
18. `const L2_LEARN = [...]`
19. `const L3_LEARN = [...]`
20. `const L4_LEARN = [...]`
21. `const L5_LEARN = [...]`
22. `const L6_LEARN = [...]`
23. `const L7_LEARN = [...]`
24. `const L8_LEARN = [...]`

**Section 4 — Study Objects**
25. `const L1_STUDY = {...}`
26. `const L2_STUDY = {...}`
27. `const L3_STUDY = {...}`
28. `const L4_STUDY = {...}`
29. `const L5_STUDY = {...}`
30. `const L6_STUDY = {...}`
31. `const L7_STUDY = {...}`
32. `const L8_STUDY = {...}`

**Section 5 — Cold Opens**
33. `const AMERICAN_COLD_OPEN_CARDS = [...]` — a single array of 8 cold open objects, one per lesson, in order L1→L8

---

## Quality Standards

- **Every fact must be historically accurate.** Do not invent events, misattribute quotes, or conflate people.
- **Questions must be substantive** — test genuine historical knowledge, not trivia guessing. A well-read person should be able to reason toward the right answer.
- **Wrong answer options must be plausible** — they should look like reasonable guesses, not obvious jokes.
- **Explanations must add value** — they should teach something, not just restate the question.
- **Quote questions only use verifiable, real quotes** — if you're uncertain of a quote's authenticity, don't use it.
- **Timeline events must have accurate years** (integers, not ranges).
- **Balance the question types** — each lesson should have a mix of mc, tf, quote, and timeline. Aim for roughly: 10 mc, 5 tf, 3 quote, 2 timeline per lesson.
- **Era tags** should be short and consistent within each lesson — e.g. `'Colonial'`, `'Awakenings'`, `'Civil War'`, `'Modern'`.

---

## Example Question (for reference — do not reuse)

```js
// mc example:
{
  type: 'mc',
  era: 'Awakenings',
  q: 'What was the title of Jonathan Edwards\'s most famous sermon, preached in 1741?',
  correct: '"Sinners in the Hands of an Angry God"',
  wrong: [
    '"The Nature of True Virtue"',
    '"Freedom of the Will"',
    '"A Faithful Narrative of the Surprising Work of God"',
    '"The End for Which God Created the World"',
    '"Distinguishing Marks of a Work of the Spirit of God"',
    '"Religious Affections"',
    '"God Glorified in Man\'s Dependence"',
  ],
  explain: 'Edwards preached "Sinners in the Hands of an Angry God" at Enfield, Connecticut on July 8, 1741 — it became the most famous sermon of the First Great Awakening, a vivid call to repentance that reportedly caused congregants to weep and cry out.'
}
```

---

Begin your output with L1_QUESTIONS(). Take your time — accuracy and depth matter more than speed.
