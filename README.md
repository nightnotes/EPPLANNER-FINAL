
# EP Planner (React + Vite + Tailwind) — Netlify-ready

## Netlify (simpelste manier)
- Connect je GitHub repo in Netlify: **Build command:** `npm run build`, **Publish directory:** `dist`.
- Klaar. `vite.config.ts` heeft `base: ""` en `public/_redirects` regelt SPA routes.

## Lokaal testen (optioneel)
```bash
npm install
npm run dev
```

## Data-generator
Het releaseschema wordt automatisch gegenereerd t/m 31-12-2026. Pas artiesten & mapping aan in `src/utils/schedule.ts`.
