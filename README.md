# Shaurya Tiwari - Portfolio

A data-driven, dependency-free portfolio for AI/ML systems and full-stack engineering. The site is designed to deploy as a free Render static site and auto-deploy after every push to the connected GitHub branch.

## What is included

- Advanced responsive layout with canvas motion, reveal animation, project filters, interactive project details, and mobile navigation.
- Clickable GitHub, LinkedIn, email, phone, resume, repository, and live-product links.
- Selected public GitHub projects plus CV-backed engineering and research case studies.
- A contact form that opens a pre-filled email draft. No server, database, API key, or GitHub token is required.
- `render.yaml` for one-click Render Blueprint deployment.

## Run locally

Because this is a native JavaScript module site, serve it over HTTP instead of opening `index.html` directly.

```bash
python -m http.server 8080
```

Open `http://localhost:8080`.

## Deploy on Render for free

### Blueprint method

1. Create a new GitHub repository.
2. Upload every file and folder from this project to the repository root.
3. In Render, choose **New > Blueprint**.
4. Connect the repository and approve the Blueprint.
5. Render reads `render.yaml` and publishes the repository root as a static site.

No environment variables, tokens, build dependencies, or paid services are needed for this portfolio.

### Static Site method

1. In Render choose **New > Static Site** and connect the GitHub repository.
2. Build command: `echo "Static portfolio ready"`
3. Publish directory: `.`
4. Deploy.

Render automatically redeploys after a push to the connected branch.

## Update content later

Most content is centralized in:

```text
assets/content.js
```

Edit these exported objects and arrays:

- `profile`: contact details, headline support copy, and social links.
- `proofPoints`: hero metrics.
- `projects`: project descriptions, tags, metrics, GitHub links, and live links.
- `capabilities`: about-section strengths.
- `stack`: technology groups.
- `timeline`: education and leadership.
- `achievements`: headline results.

The visual layout and interactions are in:

```text
assets/styles.css
assets/app.js
```

Replace `ShauryaCV.pdf` with a newer file using the same filename to update the resume everywhere automatically.

## Add a new project

Copy one object inside the `projects` array in `assets/content.js`, then update:

- `id`: unique lowercase identifier.
- `index`: display order.
- `title`, `short`, `type`, `source`, and `year`.
- `visual`: one of `signalboard`, `jobsignal`, `documents`, `meteorite`, `procurement`, or `grains`.
- `tags`, `metrics`, and `details`.
- `repo` and `live` when available.

No other file needs to change.

## Contact form behavior

The form intentionally uses `mailto:`. This keeps deployment completely free, avoids storing visitor data, and requires no backend. A future form provider can be connected inside `initContactForm()` in `assets/app.js` if required.
