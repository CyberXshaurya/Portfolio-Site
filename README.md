# Shaurya Tiwari — Portfolio

A cinematic, cross-browser portfolio for AI/ML systems, full-stack products and applied ML research.

## Deploy

This is a static site. Upload the repository-root files to GitHub and connect the repository through Render **New → Blueprint** or **New → Static Site**.

Manual Render settings:

```text
Build command: echo "Portfolio ready"
Publish directory: .
Environment variables: none
```

## Update content

All profile, project, stack and timeline content is centralised in:

```text
assets/content.js
```

The interface is in `index.html`, visual system in `assets/styles.css`, and interactions in `assets/app.js`.

Replace `ShauryaCV.pdf` with a newer PDF using the same filename to update every CV link.
