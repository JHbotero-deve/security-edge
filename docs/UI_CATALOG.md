# UI Catalog

Use this document to register UI elements (buttons, login forms, tables, routes, etc.) so they are discoverable by the team.

How to use

- Add an entry per component or UI area under the appropriate tag(s).
- Fields:
  - Name: short name
  - Path: location in repo
  - Description: what it is / where used
  - Tags: comma-separated tags (button, login, table, route, auth, form, navbar)
  - Notes: any additional notes or guidance

Example entry

- Name: ButtonPrimary
- Path: src/components/ButtonPrimary.jsx
- Description: Primary button used across forms and modals.
- Tags: button, primary, form
- Notes: Uses CSS variable --btn-primary

Sections

- # login
- # button
- # table
- # route
- # form
- # navbar
- # other

Maintaining the index

A Node script is included at tools/ui-indexer.js that scans the repository for common keywords (login, auth, button, table, route, router, navbar, form) and produces docs/ui-search/ui-index.json. Run:

npm run build-ui-index

This will update docs/ui-search/ui-index.json. Add that file to commits or run it in CI if you prefer dynamic generation.
