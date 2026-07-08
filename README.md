# Difficult Translation Collection

An invitation-only web app for collecting examples of challenging machine
translation cases, built for academic research. It costs nothing to host:
the frontend is a static site on **GitHub Pages**, and the backend is a
**Google Apps Script** Web App writing to a **Google Sheet**.

```
React (GitHub Pages)  ──HTTP POST──▶  Google Apps Script Web App  ──▶  Google Sheet
     UI + Google Sign-In                 verifies token, validates        "database"
                                          data, appends a row
```

See [`docs/architecture.md`](docs/architecture.md) for a fuller diagram and
request-flow walkthrough.

## Contents

- [How it works](#how-it-works)
- [1. Create the Google Sheet](#1-create-the-google-sheet)
- [2. Create a Google OAuth Client ID](#2-create-a-google-oauth-client-id)
- [3. Set up the Apps Script backend](#3-set-up-the-apps-script-backend)
- [4. Configure the frontend](#4-configure-the-frontend)
- [5. Deploy to GitHub Pages](#5-deploy-to-github-pages)
- [Local development](#local-development)
- [Project structure](#project-structure)
- [Extending the app](#extending-the-app)
- [Troubleshooting](#troubleshooting)

## How it works

- **Authentication**: Google Sign-In (via Google Identity Services). No
  passwords, no invite codes. The frontend gets a signed Google ID token
  and sends it with every request; the backend independently verifies
  that token's signature and audience before trusting it.
- **Authorization**: the backend checks the signed-in email against a
  `Users` sheet. Anyone not listed sees a friendly "Access denied" page.
- **Storage**: a `Submissions` sheet, one row per example, with columns
  matching the spec (source/target text, languages, category, difficulty,
  tags, status, reviewer notes, etc). Submission IDs and timestamps are
  generated server-side.
- **Language detection** runs entirely in the browser using the
  [`franc`](https://github.com/wooorm/franc) library — no paid API, no
  server round-trip. Users can always override the detected language.

## 1. Create the Google Sheet

1. Create a new Google Sheet (e.g. "Difficult Translation Collection —
   Data"). Note its name; you won't need its ID since the script will be
   bound directly to it.
2. Rename the first tab to **`Users`** and add this header row:

   | Email | Name | Role |
   |-------|------|------|
   | jane@university.edu | Jane Doe | contributor |

   Add one row per person you're inviting. Only emails listed here can
   sign in and submit.
3. Create a second tab named **`Submissions`**. You can leave it empty —
   the Apps Script backend will add the header row automatically the
   first time it runs. If you'd rather create it yourself, use this header
   row (order matters):

   `Submission ID | Timestamp | User email | User name | Source language | Target language | Source text | Target text | Difficulty explanation | Category | Difficulty (1-5) | Tags | Status | Reviewer notes | Application version`

## 2. Create a Google OAuth Client ID

Google Sign-In needs an OAuth Client ID scoped to the domain your app is
served from (your GitHub Pages URL).

1. Go to the [Google Cloud Console](https://console.cloud.google.com/) and
   create a new project (or reuse one).
2. Go to **APIs & Services > OAuth consent screen** and configure it
   (External user type is fine for a research collaboration; keep it in
   "Testing" mode and add your invited contributors as test users, or
   publish it — either works since access is still gated by the `Users`
   sheet).
3. Go to **APIs & Services > Credentials > Create Credentials > OAuth
   client ID**.
   - Application type: **Web application**.
   - Authorized JavaScript origins: add your GitHub Pages origin, e.g.
     `https://your-username.github.io`.
   - You do **not** need an Authorized redirect URI for this flow.
4. Copy the generated **Client ID** (looks like
   `1234567890-abc123.apps.googleusercontent.com`). You'll need it twice:
   once in the Apps Script project, once in the frontend build.

## 3. Set up the Apps Script backend

1. Open your Google Sheet, then **Extensions > Apps Script**. This binds
   the script to the spreadsheet so `SpreadsheetApp.getActiveSpreadsheet()`
   just works with no configuration.
2. Delete the default `Code.gs` boilerplate and create the following
   files, copying the contents from this repo's `apps-script/` folder:
   - `Code.gs`
   - `Auth.gs`
   - `Sheets.gs`
3. Open **Project Settings** (gear icon) and, under **Script Properties**,
   add:

   | Property | Value |
   |----------|-------|
   | `GOOGLE_CLIENT_ID` | the OAuth Client ID from step 2 |

4. Click **Deploy > New deployment**.
   - Select type: **Web app**.
   - Description: e.g. "v1".
   - Execute as: **Me** (your account — this is what lets the script
     write to the Sheet on behalf of every signed-in contributor).
   - Who has access: **Anyone**.
5. Click **Deploy**, authorize the requested permissions, and copy the
   **Web app URL** (ends in `/exec`). This is your `VITE_APPS_SCRIPT_URL`.

   > Whenever you edit the Apps Script code, use **Deploy > Manage
   > deployments > Edit (pencil icon) > New version** to push the update —
   > the `/exec` URL stays the same.

## 4. Configure the frontend

Copy `.env.example` to `.env` and fill in the two values from the steps
above:

```bash
cp .env.example .env
```

```
VITE_APPS_SCRIPT_URL=https://script.google.com/macros/s/XXXXXXXX/exec
VITE_GOOGLE_CLIENT_ID=1234567890-abc123.apps.googleusercontent.com
```

## 5. Deploy to GitHub Pages

This repo includes a GitHub Actions workflow
(`.github/workflows/deploy.yml`) that builds the site and publishes it to
GitHub Pages automatically on every push to `main`.

1. Push this repository to GitHub.
2. In **Settings > Pages**, set **Source** to "GitHub Actions".
3. In **Settings > Secrets and variables > Actions**, add two repository
   secrets:
   - `VITE_APPS_SCRIPT_URL`
   - `VITE_GOOGLE_CLIENT_ID`
4. Push to `main` (or run the workflow manually from the Actions tab). The
   site will be published at `https://<your-username>.github.io/<repo>/`.
5. Go back to the Google Cloud Console and make sure that exact origin
   (`https://<your-username>.github.io`) is in the OAuth client's
   **Authorized JavaScript origins**.

## Local development

```bash
npm install
cp .env.example .env   # fill in real values
npm run dev
```

Note that Google Sign-In's "Authorized JavaScript origins" must include
`http://localhost:5173` (Vite's default dev port) if you want to test
sign-in locally — add it alongside your production origin.

## Project structure

```
src/
  components/     Presentational + form components (all reusable, typed)
  hooks/           useGoogleAuth, useDarkMode, useAutosaveDraft
  lib/             api.ts (backend client), detectLanguage.ts, languages.ts
  types/           Shared TypeScript types and constants
  config/          Typed environment variable access
apps-script/       Google Apps Script backend source (copy into the
                   Apps Script editor — see step 3 above)
docs/              Architecture notes and diagram
.github/workflows/ GitHub Actions deployment pipeline
```

## Extending the app

The code is deliberately structured so the following are additive, not
rewrites:

- **Reviewer dashboard / moderation**: add a `reviewer` role check in
  `Auth.gs` (the `Users` sheet already has a `Role` column) and a new
  `action: "listSubmissions"` route in `Code.gs`.
- **Editing / status changes**: add an `action: "updateSubmission"` route
  that looks up a row by Submission ID and updates `Status` /
  `Reviewer notes`.
- **CSV export**: Google Sheets already supports File > Download > CSV;
  a scripted export can be added as another Apps Script action if you
  want it available in-app.
- **Duplicate detection**: compare incoming `sourceText`/`targetText`
  against existing rows in `appendSubmission_` before inserting.
- **Multilingual UI**: the form's copy lives in JSX, not a separate
  strings file yet — extracting it into a small `i18n` map under `src/lib`
  is a self-contained change.

## Troubleshooting

- **"Access denied" for someone who should have access**: check for
  typos/extra whitespace in the `Users` sheet's `Email` column (matching
  is case-insensitive but must otherwise match exactly).
- **Sign-in button doesn't appear**: confirm your current origin
  (including the exact scheme/port) is listed in the OAuth client's
  Authorized JavaScript origins.
- **Submit fails with a network error**: open the Apps Script project's
  **Executions** log (left sidebar) to see the server-side error.
- **CORS-looking errors in the browser console**: the frontend
  intentionally sends `Content-Type: text/plain` to Apps Script to avoid
  a CORS preflight it can't answer; if you modify `src/lib/api.ts`, keep
  that header as-is.
