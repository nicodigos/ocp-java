# Java 21 Review Lab

A Netlify-ready static quiz app built from the review tests in the OCP Oracle Certified Professional Java SE 21 Developer Study Guide.

## Run locally

Start the project server:

```powershell
npm start
```

Then open `http://localhost:8890`. Progress is saved remotely in the configured Supabase Postgres project.

## Deploy to Netlify

Create a new Netlify site from this folder or repository. No build command is needed for the static files. The local server API uses Supabase Postgres; a Netlify deployment will need equivalent serverless API routes and the same environment variables configured in Netlify.

## Content assets

Each chapter is stored independently under `assets/review-tests/`. The app loads the chapter manifest from `index.json`, then parses each chapter Markdown file at runtime.

To regenerate the Markdown assets from the local source PDF, run:

```powershell
python scripts/extract_review_tests.py
```
