# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Wordle clone with a Vue 3 + TypeScript frontend (`wordle-web/`) and an ASP.NET 7 backend (`Wordle.Api/`). Features include random/word-of-the-day modes, leaderboard, account creation/sign-in, word editor (admin), and a valid-word hint list.

## Frontend Commands (run from `wordle-web/`)

```bash
npm run dev          # Start Vite dev server (http://localhost:5173)
npm run build        # Type-check + build for production
npm run type-check   # vue-tsc type check only
npm run lint         # ESLint with auto-fix
npm run format       # Prettier format src/
npm run test:unit    # Run all Vitest tests
npx vitest run src/scripts/__tests__/wordleGame.spec.ts  # Run a single test file
```

## Backend Commands (run from `Wordle.Api/`)

```bash
dotnet run --project Wordle.Api   # Start API on http://localhost:5006
dotnet test                        # Run backend tests
dotnet ef migrations add <Name>    # Add EF migration
dotnet ef database update          # Apply migrations
```

## Architecture

### Frontend (`src/`)

**Core game logic** lives entirely in `src/scripts/`:
- `letter.ts` — `Letter` class + `LetterStatus` enum (NotGuessed/Correct/Misplaced/Wrong). `Letter.color` maps status to Vuetify theme color names.
- `word.ts` — `Word` class wraps `Letter[]`. `push`/`pop` mutate in-place. `check(secretWord)` runs the two-pass Wordle algorithm (first pass: exact matches; second pass: misplaced).
- `wordleGame.ts` — `WordleGame` owns the game state: array of `Word` guesses, current `guess`, `status`, `guessedLetters`. `submitGuess()` calls `word.check()` then checks win/loss.
- `wordsService.ts` — Static class with a hardcoded ~13k five-letter word list. `getRandomWord()`, `isValidWord()`, `validWords()` (hints filtered to ≤150 matching words).
- `signInService.ts` — Singleton. Stores JWT in `localStorage`, decodes the payload, attaches `Authorization` header to all Axios requests. `SignInService.instance` is the global reference.
- `player.ts` — Plain data model for leaderboard entries.
- `services.ts` — String keys (`SignInService`, `PlayerService`, `Display`) for Vue `provide`/`inject`.

**Views** (`src/views/`):
- `WordleView.vue` — Main game view. On mount, fetches the secret word from the API (`GET /word` or `GET /word/wordOfTheDay`). Handles keyboard input, timer, and posts game results to `Player/AddPlayer` or `Player/AddGameResult` when the game ends.
- `LeaderboardView.vue`, `LastTenWords.vue`, `WordEditor.vue` — Secondary views.

**API base URL**: Set in `src/main.ts`. Uses `http://localhost:5006/` locally and `https://wordle2023-nparkman.azurewebsites.net` in production.

**Theming**: Six Vuetify themes defined in `main.ts` (dark, light, and four colorblind-friendly variants). Letter color feedback uses theme color names `correct`/`misplaced`/`wrong` so they adapt automatically.

**Router** (`src/router/index.ts`): `/about` route is guarded — redirects to `/wordle` if not signed in. `/worldoftheday` reuses `WordleView` but sets `isWordOfTheDay = true`.

### Backend (`Wordle.Api/`)

ASP.NET 7 Web API with EF Core + Azure SQL and ASP.NET Core Identity.

**Key controllers**: `WordController`, `PlayerController`, `PlaysController`, `TokenController`.

**DB entities**: `Word`, `Player`, `DateWord` (maps a word to a calendar date), `Plays` (individual game play records), `AppUser` (Identity).

**Auth**: JWT-based. `TokenController` issues tokens. `Policies.EditWord` guards word add/remove endpoints.

## Key Patterns

- `WordleGame` is created with `reactive()` in `WordleView.vue` so Vue tracks mutations to nested objects.
- `SignInService` is a singleton provided at the app root via `app.provide(Services.SignInService, reactive(SignInService.instance))` — inject it with `inject(Services.SignInService)`.
- `WordsService` word list is a private static field — all filtering happens client-side.
- The `Word.check()` method mutates letter statuses in place, so calling it twice will give wrong results. `WordsService.validWords()` calls `guess.check()` internally — be aware of this side effect.
