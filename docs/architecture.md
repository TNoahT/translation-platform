# Architecture

## Components

| Layer | Technology | Cost |
|-------|-----------|------|
| Frontend hosting | GitHub Pages (static files) | Free |
| Frontend framework | React + TypeScript + Vite, Tailwind CSS | Free |
| Authentication | Google Identity Services (Sign in with Google) | Free |
| Backend / API | Google Apps Script Web App | Free |
| Database | Google Sheets | Free |
| CI/CD | GitHub Actions | Free (public repo minutes) |

No servers to patch, no database to back up, no hosting bill — everything
runs on infrastructure Google and GitHub already provide for free, which
is why this stack was chosen for a research tool with a small, trusted
user base.

## Request flow: signing in

```
┌──────────┐        1. Click "Sign in with Google"        ┌────────────────────┐
│  Browser │ ───────────────────────────────────────────▶ │ Google Identity     │
│ (React)  │ ◀─────────────────────────────────────────── │ Services            │
└────┬─────┘        2. Signed ID token (JWT)               └────────────────────┘
     │
     │ 3. POST { action: "verify", idToken }
     ▼
┌─────────────────────────┐   4. Verify signature + audience   ┌──────────────────┐
│ Google Apps Script       │ ──────────────────────────────────▶│ oauth2.googleapis │
│ Web App                  │ ◀──────────────────────────────────│ .com/tokeninfo    │
│                          │   5. Token payload (email, name)   └──────────────────┘
│  6. Look up email in     │
│     "Users" sheet        │
└────┬─────────────────────┘
     │ 7. { authorized: true/false, name, role }
     ▼
┌──────────┐
│  Browser │  Shows the submission form, or a friendly
│          │  "Access denied" screen
└──────────┘
```

## Request flow: submitting an example

```
┌──────────┐  1. Fill form; franc detects source/target   ┌──────────┐
│  Browser │     language client-side (no network call)   │  Browser │
└────┬─────┘                                               └──────────┘
     │ 2. POST { action: "submit", idToken, ...fields }
     ▼
┌───────────────────────────┐
│ Google Apps Script Web App │
│  3. Re-verify idToken       │
│  4. Re-check "Users" sheet  │  (never trusts the client's earlier check)
│  5. Validate required       │
│     fields server-side      │
│  6. Generate Submission ID  │
│     + server timestamp      │
│  7. Append row               │
└────┬────────────────────────┘
     │ 8. { submissionId, timestamp }
     ▼
┌────────────┐
│ Google      │  New row appended with Status = "Pending"
│ Sheet       │
│ (Submissions)│
└────────────┘
```

## Why verification happens twice (once per request)

The `verify` action (used right after sign-in) exists purely for UX — it
lets the app show "Access denied" immediately rather than waiting until
the user has filled out the whole form. It is **not** treated as an
authorization decision by the backend: `submit` independently re-verifies
the ID token and re-checks the `Users` sheet, so there is no path to
writing a row without a currently-valid, allow-listed Google account.

## Why Apps Script instead of a "real" backend

Apps Script's free tier, tight integration with Sheets (no client library,
credentials, or connection pooling to manage), and per-Google-account
execution model make it a good fit for a small, invite-only research
tool. The trade-off is Apps Script's quirky CORS behavior, which is why
`src/lib/api.ts` sends requests as `text/plain` (see comment in that
file) rather than `application/json`.

## Extensibility

`Code.gs` is a thin router over `action` values, and the React app already
separates the API client (`src/lib/api.ts`) from the form UI. Adding a
reviewer dashboard, CSV export, or search/filter is a matter of adding new
`action` values on the backend and new routes/components on the frontend —
no restructuring required. See the "Extending the app" section of the main
[`README.md`](../README.md) for concrete starting points.
