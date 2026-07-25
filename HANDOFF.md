# 📦 Project Handoff — Rahul's Personal Site + CMS

_Everything you need to know to run, edit, and grow this project. July 2026._

## The two repos (account: iamrahul1997)

| Repo | What | Deployed at |
|---|---|---|
| `personal-rahul` | The website (static HTML/CSS/JS, no build step) | personal-rahul.vercel.app |
| `personal-rahul-cms` | The CMS (static app, publishes via GitHub API) | your CMS Vercel project |

Local working copies live in `~/Projects/` on the Mac.

## Daily use

1. Open the CMS → sign in with **admin + your password**
2. Write in the rich-text editor; set category (or create one), feature image,
   excerpt, meta title/description, featured toggle
3. **Publish** → four commits land in `personal-rahul` → Vercel deploys →
   live in ~30 seconds (page, home/writing cards, category filters, sitemap
   — all automatic)
4. **Delete** from the dashboard removes page, card, and sitemap entry cleanly

## Key files

- `content/index.json` — the article list (CMS-managed, hand-editable)
- `content/articles/<slug>.json` — each essay's content + meta
- `articles/<slug>.html` — generated article pages
- `styles.css` — all styling; site colors are 7 variables at the top
  (current palette: Editorial Forest — cream/forest/amber/coral/moss)
- `articles.js` / `script.js` — rendering + behavior (don't need touching)
- `EDITING.md` — how to edit anything from the GitHub website
- `DOMAIN.md` — exact steps for connecting poudelrahul.com.np + cms subdomain
- CMS `app.js` — `SITE_URL` constant at the top: change once when domain is live

## Forms → your Gmail (rahulpoudel2020@gmail.com)

Contact form + newsletter both use FormSubmit.co (free, no account).
**One-time**: the first submission triggers an activation email — click its
link once and everything flows afterward. To change the address, edit the
two `formsubmit.co/ajax/...` URLs in the site's `script.js`.

## CMS login (how it works / recovery)

Your password encrypts the GitHub token (AES-256 in the browser); only the
encrypted blob is stored, at `cms/auth.json` in the site repo. Forgot the
password or token revoked? Just run **Settings → Create login & connect**
again with a fresh fine-grained token (Repository access: only
`personal-rahul`; Permissions: Contents → Read and write) — it overwrites
the old login.

## SEO state

- `robots.txt` (site: crawlable, `/cms/` hidden) · CMS is fully blocked
  from Google (robots + noindex)
- `sitemap.xml` — auto-maintained by the CMS on every publish/delete
- Canonical + og/twitter tags on every page; articles get them generated
- Branded 404 page
- After connecting the real domain: follow DOMAIN.md Step 3 (find/replace
  the vercel.app URL) and submit the sitemap to Google Search Console

## Nice-to-haves for later (not blocking anything)

Vercel Analytics (free toggle) · newsletter platform (Buttondown/Mailchimp)
when volume grows · CMS draft/preview mode · replace old Blogger site by
pointing poudelrahul.com.np at Vercel (also fixes its expired SSL).
