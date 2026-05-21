# Wordle Clone

A full-stack Wordle clone built with **Vue 3 + TypeScript** and **ASP.NET 8**. Includes user authentication, a daily word-of-the-day mode, a global leaderboard, an admin word editor, and accessibility-focused colorblind themes.

**Live demo:** [wordleclone.lol](https://wordleclone.lol) &nbsp;|&nbsp; **API:** [api.wordleclone.lol](https://api.wordleclone.lol/swagger)

---

## Features

- **Core game** — Full Wordle algorithm with exact-match and misplaced-letter detection across up to 6 guesses
- **Word of the Day** — Daily shared word synced via the backend; compete against other players on the same word
- **Leaderboard** — Ranked player stats with game history persisted in Azure SQL
- **Authentication** — Account creation and JWT-based sign-in via ASP.NET Core Identity
- **Hint system** — Client-side valid-word filtering narrows the ~13k word list to ≤150 candidates based on current guess state
- **Admin word editor** — Role-gated UI to add or remove words from the word bank
- **Colorblind themes** — Six Vuetify themes including Protanopia/Deuteranopia and Tritanopia variants in both light and dark mode

---

## Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | Vue 3, TypeScript, Vuetify 3, Vite, Axios |
| Testing | Vitest, Vue Test Utils |
| Backend | ASP.NET 8, C#, Entity Framework Core 8 |
| Auth | ASP.NET Core Identity, JWT Bearer |
| Database | Azure SQL (EF Core migrations) |
| DevOps | Azure App Service, Azure Static Web Apps, GitHub Actions |

---

## Architecture Highlights

- **Reactive game state** — `WordleGame` class managed with Vue's `reactive()` for deep mutation tracking across the board, keyboard, and hint components
- **Two-pass Wordle algorithm** — `Word.check()` runs an exact-match pass then a misplaced-letter pass, correctly handling duplicate letters
- **Client-side hint filtering** — `WordsService` ships a full word list in the bundle; all hint computation runs in the browser with no extra API calls
- **JWT singleton** — `SignInService` decodes the JWT payload client-side, stores it in `localStorage`, and automatically attaches the `Authorization` header to every Axios request
- **Role-based access** — Backend policies (`EditWord`, `RandomAdmin`) guard admin endpoints; frontend router guards block the word editor for unauthenticated users
- **Vite dev proxy** — Local development proxies API calls through Vite to avoid CORS, with no code changes needed between dev and production

---

## Getting Started

### Frontend

```bash
cd wordle-web
npm install
npm run dev          # http://localhost:5173
```

### Backend

```bash
cd Wordle.Api
dotnet run --project Wordle.Api   # http://localhost:5006
```

Requires a SQL Server connection string in `appsettings.json` under `ConnectionStrings:DefaultConnection`. The app auto-migrates and seeds test users on startup.

### Test Users (seeded automatically)

| Email | Password | Role |
|---|---|---|
| Admin@intellitect.com | P@ssw0rd123 | Admin |
| meg@intellitect.com | P@ssw0rd123 | Special |

---

## Running Tests

```bash
# Frontend unit tests
cd wordle-web && npm run test:unit

# Backend tests
cd Wordle.Api && dotnet test
```
