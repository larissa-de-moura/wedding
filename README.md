# Larissa & Nihal — Wedding Website

A single-page, static wedding website. No build step — edit the files and refresh your browser.

## Structure

```
wedding/
├── index.html              # all page content and section markup
├── css/style.css           # design tokens (colors/fonts) + all styling
├── js/config.js            # the few things you'll actually edit in JS: wedding date/time, RSVP link
├── js/main.js               # countdown timer, nav, RSVP embed logic — shouldn't need edits
├── images/
│   ├── hero.jpg             # web-optimized hero photo (used by the site)
│   └── originals/           # full-resolution source photos (not used directly by the site)
├── scripts/optimize_image.py  # resize/compress a new photo for the web
└── favicon.svg
```

## Editing content

- **Prose sections** (Our Story, Details, Travel, Registry, FAQ): edit directly in `index.html`.
  Every placeholder is wrapped in `[brackets]` with an `<!-- EDIT: ... -->` comment above it —
  search the file for `EDIT` to find every spot that needs your info.
- **Wedding date/time & RSVP link**: edit `js/config.js` — the countdown and RSVP section
  both read from there.
- **Colors/fonts**: edit the `:root` variables at the top of `css/style.css`.

## RSVP

By default the RSVP section shows a fallback button + email link. To embed a real form:
1. Create a Google Form (or a Tally.so form) for RSVPs.
2. Get its shareable/embed URL.
3. Paste it into `RSVP_EMBED_URL` in `js/config.js`.

## Swapping in a new photo

```
python3 scripts/optimize_image.py path/to/new-photo.jpg images/hero.jpg
```

This resizes to a sensible web width and compresses it — keeps the site fast even with
large source photos straight from a camera.

## Previewing locally

```
python3 -m http.server 8000
```

Then open http://localhost:8000 in a browser.

## Deploying

This is a plain static site, so it can be hosted anywhere that serves static files.
Recommended: push this folder to a GitHub repo, then connect it to
[Cloudflare Pages](https://pages.cloudflare.com/) (or Netlify/Vercel) for automatic
deploys on every push. See `~/wedding-website-plan.md` for the full write-up of hosting
options and a custom-domain recommendation.
