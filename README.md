# Practice Quiz

A simple, static practice quiz website built with React, Vite, TypeScript, and Tailwind CSS. Students can take a timed 30-question exam with automatic scoring and answer review.

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Adding or Editing Questions

Quiz questions are stored as JSON data files in:

```text
src/data/questions*.json
```

Each file is a separate quiz set. There are several files (`questions0.json`, `questions1.json`, `questions3.json`, `questions4.json`, etc.), and all are loaded automatically via `src/data/index.ts`. Each file **must** be wrapped in an object with a `description` and a `questions` array:

```json
{
  "description": "Introduction to Marketing",
  "questions": [
    {
      "id": 1,
      "question": "Your question text here?",
      "answers": [
        { "option": "Answer A", "is_correct": true },
        { "option": "Answer B", "is_correct": false }
      ],
      "explanation": "Optional explanation shown in the review."
    }
  ]
}
```

### File structure

```text
{
  "description": "string",        // shown as the quiz title
  "questions": [                   // array of question objects
    {
      "id": 1,                     // number, unique within the file
      "question": "string",        // the question text
      "answers": [                 // array of answer objects
        {
          "option": "string",      // answer text
          "is_correct": boolean    // whether this answer is correct
        }
      ],
      "explanation": "string"      // optional; shown in the review
    }
  ]
}
```

Important:

- The top level **must** be an object with both `description` and `questions`.
- Always use `"is_correct"` (with underscore) for marking correct answers.
- Each question must have at least one correct answer.
- The `explanation` field is optional.
- Question count and any grouping are calculated automatically from the JSON file.
- `id` values should be unique within each file.

## Automatic Multiple-Answer Detection

You do **not** need to specify whether a question is single-answer or multiple-answer.

The app detects the type automatically:

| Correct answers | Type | UI label |
|---|---|---|
| Exactly 1 | Single-answer | `[Select ONE]` — radio buttons |
| 2 or more | Multiple-answer | `[Select ALL that apply]` — checkboxes |

### Scoring

- Each question is worth **1 mark**.
- **Single-answer:** 1 mark if the selected answer is correct; otherwise 0.
- **Multiple-answer:** 1 mark only if the user selects **all** correct answers and **no** incorrect answers.

## Deploy to Vercel

1. Push this project to a Git repository (GitHub, GitLab, or Bitbucket).
2. Go to [vercel.com](https://vercel.com) and import the repository.
3. Vercel will auto-detect Vite. Default settings work:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Click **Deploy**.

No environment variables or backend configuration is required.

## Project Structure

```text
src/
├── components/     # UI components
├── data/           # questions*.json quiz data files
├── types/          # TypeScript interfaces
├── utils/          # Scoring and helper functions
├── App.tsx         # Main quiz logic
└── main.tsx        # Entry point
```

## License

MIT
