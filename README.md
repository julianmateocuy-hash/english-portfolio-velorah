# Velorah® — English Academic Portfolio

A cinematic, responsive React + Vite + TypeScript + Tailwind CSS portfolio inspired by the provided Velorah hero specification.

## Included

- Fullscreen looping video hero
- Glassmorphic navigation
- Instrument Serif + Inter typography
- Dark HSL theme
- Responsive mobile navigation
- About section
- Dynamic skills with percentage sliders
- English project portfolio
- Project search
- Local front-end CRUD-style project creation/removal
- Local front-end skill creation and percentage adjustment
- Contact form UI
- Dark cinematic visual language
- Reduced-motion support

## Run locally

```bash
npm install
npm run dev
```

Then open the URL shown by Vite.

## Production backend

The current package intentionally keeps the visual/front-end experience self-contained. To make the CRUD persistent, connect the existing project/skill operations and contact form to a PHP 8 + MySQL API.

Recommended production tables:

- users
- projects
- skills
- files
- messages

The supplied project is structured so those operations can be connected without changing the visual direction.

## Video

The hero uses the video URL supplied in the design specification. For production, consider hosting a local optimized MP4/WebM fallback if the remote CDN changes availability or CORS behavior.
