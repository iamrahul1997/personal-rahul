# Rahul Poudel — personal site

A responsive, multi-page static website for Rahul Poudel's writing on
geopolitics, technology, and Nepal. No build step, no dependencies —
plain HTML, CSS, and a little JavaScript.

## Pages

- `index.html` — Home (hero, latest writing, approach)
- `writing.html` — All essays with category filters
- `articles/*.html` — One page per essay (`_TEMPLATE.html` = copy-paste starter)
- `about.html` — Bio and approach
- `contact.html` — Contact

## How it fits together

- `styles.css` — all styling; site colors are 6 variables at the top
- `articles.js` — the article list; edit this one file and the Home +
  Writing pages update automatically
- `script.js` — mobile menu + footer year

## ✏️ Editing

See **[EDITING.md](EDITING.md)** — a step-by-step guide for making every
common change straight from the GitHub website (new essay, colors, text,
menu items).

## Run locally

Open `index.html` in a browser.

## Publish

Works as-is on GitHub Pages, Netlify, Vercel, or any static host.
