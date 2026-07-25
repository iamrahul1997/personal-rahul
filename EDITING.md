# ✏️ How to edit this site (from GitHub, no coding tools needed)

> **New:** articles are now managed by your CMS (the `personal-rahul-cms`
> repo/app) — write, edit, upload images, and set categories there, and it
> publishes to this repo automatically. The article data lives in
> `content/index.json` (the list) and `content/articles/<slug>.json`
> (each essay). Everything below still works for manual edits.

Everything below can be done in your browser at github.com — open a file, tap the
pencil icon (✏️), make the change, press **Commit changes**.

---

## 1. Publish a new essay (the most common task)

**Step 1 — create the article page**
1. Open the `articles/` folder → open `_TEMPLATE.html`.
2. Copy the whole file.
3. Back in `articles/`, click **Add file → Create new file**.
4. Name it like `my-new-essay.html` (lowercase, dashes, no spaces).
5. Paste the template and edit every line marked `⬅ EDIT`
   (headline, category, date, read time, and the essay text itself).
6. Commit.

**Step 2 — add it to the article list**
1. Open `articles.js` (in the main folder).
2. Copy one of the `{ ... },` blocks and paste it **at the top of the list**.
3. Fill in the same title, `articles/my-new-essay.html`, category, date,
   minutes, and a 1–2 sentence excerpt.
4. Commit.

That's it — the essay now appears on the Home page and the Writing page
automatically, including in the category filters.

**Tip:** exactly **one** article should have `featured: true` — that's the big
red card. Move the `true` to your newest best essay when you want to swap it.

---

## 2. Change the site's colors

Open `styles.css` — the first block at the very top looks like this:

```css
--paper: #f5f1e8;   /* warm cream page background */
--ink: #10251f;     /* deep forest text */
--amber: #f1b649;   /* primary accent (buttons, highlights) */
--coral: #e66c4d;   /* featured card, italic accents */
--moss: #376152;    /* secondary accent (eyebrows, links) */
--mist: #eae3d3;    /* soft panels */
--slate: #4c5a52;   /* muted text */
```

Change those hex codes and **the entire site re-colors itself**. Nothing else
to touch.

---

## 3. Edit text on a page

| What you want to change | File to edit |
|---|---|
| Home page headline / intro / focus areas | `index.html` |
| Writing page intro | `writing.html` |
| Your bio, quick facts | `about.html` |
| Email address, contact cards | `contact.html` |
| An essay | its file inside `articles/` |

The text is plain English inside the HTML — search for the sentence you want
to change and retype it. Don't delete the `<tags>` around it.

---

## 4. Add or rename a menu item

The navbar is the `<nav id="primary-nav">` block near the top of **every**
.html file. If you add a page, add the same link line in each file (there are
6: index, writing, about, contact, and each article + the template).

The highlighted "you are here" pill is the link with `aria-current="page"` —
each page marks its own link.

---

## 5. Add a new category (e.g. "Economy")

1. In `articles.js`, just use the new name in an article's `category:` field.
2. In `writing.html`, copy one filter button line and change both the
   `data-filter="..."` value and the label to the new name (must match exactly).

---

## 6. Change your social links

Your Instagram and GitHub links appear in the **footer of every page** (all 8
.html files) and once in the crimson band on `contact.html`. To change a
handle, search the repo for `instagram.com/rahul.poudel_` or
`github.com/iamrahul1997` and replace every occurrence with the new URL.
(GitHub's search box at the top of the repo finds them all instantly.)

---

## 7. The contact form → your email

The form on `contact.html` emails every submission to
**rahulpoudel2020@gmail.com** via FormSubmit.co (free, no account needed).

**One-time activation:** the first message anyone sends triggers an
activation email from FormSubmit to your inbox. Click the link in it once —
after that, all messages arrive automatically.

To change the destination address, open `script.js` and replace the email in
the `formsubmit.co/ajax/...` line. (The same file has a comment showing how
to switch to Supabase storage instead, if you ever prefer that.)

---

## ⚠️ Things not to touch

- The bottom half of `articles.js` (below the "don't touch" line) — that's the
  code that draws the cards.
- `script.js` — powers the mobile menu.
- The `<link ...>` and `<script ...>` lines in the HTML files.

If something breaks, GitHub keeps every old version: open the file → History →
pick the last good version → restore it.
