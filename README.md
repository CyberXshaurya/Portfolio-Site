# Shaurya Tiwari — Space Journey Portfolio

A cinematic, scroll-controlled portfolio that turns the project list into a guided space mission.

## Experience

- Pre-flight loading sequence and animated launch scene
- Procedural starfield with scroll-velocity warp trails
- A spacecraft that travels through the complete portfolio route
- Six project destinations with custom procedural artwork
- Scroll-controlled navigation plus optional cinematic Auto Pilot mode
- Project mission briefs with metrics, engineering details, repository links, and live links
- Orbital About section, payload-style technology modules, flight-log timeline, and final contact transmission
- Desktop and mobile layouts with reduced-motion support

No backend, database, token, API key, build framework, or paid service is required.

## Run locally

```bash
python -m http.server 8080
```

Open:

```text
http://localhost:8080
```

## Deploy on Render

The included `render.yaml` is configured as a Render static site.

1. Replace the files in the GitHub repository root with this project.
2. Commit and push to `main`.
3. The connected Render site will redeploy automatically.

For a fresh deployment, use **New → Blueprint** and connect the repository.

No environment variables or Start Command are required.

## Update content later

All primary content remains centralized in:

```text
assets/content.js
```

Edit these exports:

- `profile` — contact links, role, introduction, and availability
- `proofPoints` — launch-screen metrics
- `projects` — project titles, descriptions, metrics, tags, details, repository links, and live links
- `capabilities` — About-section strengths
- `stack` — payload modules
- `timeline` — education and leadership flight log

Project-specific space visuals and mission colours are mapped by project `id` inside:

```text
assets/app.js
```

The six supported visual IDs are:

```text
signalboard
jobsignal
document-intelligence
meteorite
third-eye
grain-segmentation
```

## Main files

```text
index.html          Page structure
assets/content.js   Editable portfolio data
assets/app.js       Canvas, spacecraft, Auto Pilot, rendering, and interactions
assets/styles.css   Complete responsive visual system
ShauryaCV.pdf       Downloadable CV
render.yaml         Free Render deployment configuration
```

## Replace the CV

Replace `ShauryaCV.pdf` while keeping the same filename. Every CV link will continue working.
