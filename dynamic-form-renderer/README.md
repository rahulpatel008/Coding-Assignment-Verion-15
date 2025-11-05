# Dynamic Form Renderer (Angular 15)

Requirements:
- Angular CLI 15
- Node 16.x
- npm 8.x

Install & Run:
1. npm install
2. ng serve
3. Open http://localhost:4200

What it does:
- Loads form schema JSON from `assets/schemas/*.json` via HttpClient (simulates fake API)
- Renders dynamic forms from JSON schema
- Applies validation & displays messages
- Sets disabled state at control creation to avoid Angular warnings
- Two schemas available: user-registration.json and feedback.json (use top buttons to switch)

Notes:
- No standalone components used — classic NgModule bootstrap
- No console warnings related to reactive form disabled attribute
