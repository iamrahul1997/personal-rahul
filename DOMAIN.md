# 🌐 Connecting your real domain (nothing will break)

The site was built domain-proof: every internal link is root-relative
(`/writing`, `/articles/...`), the contact + newsletter forms are email-based,
and the CMS talks to GitHub — not to your domain. So adding a domain is purely
additive; the `.vercel.app` addresses keep working alongside it.

## The plan

| What | Domain | Vercel project |
|---|---|---|
| Main site | `poudelrahul.com.np` (+ `www`) | personal-rahul |
| CMS | `cms.poudelrahul.com.np` | personal-rahul-cms |

## Step 1 — Main site

1. Vercel → **personal-rahul** project → Settings → Domains → Add
   → enter `poudelrahul.com.np` → also add `www.poudelrahul.com.np`
   (set the apex as primary; www will redirect).
2. Vercel shows you the DNS records to create. At your DNS provider
   (wherever poudelrahul.com.np's nameservers point — register.com.np
   or Cloudflare):
   - `A` record, host `@` → `76.76.21.21`
   - `CNAME` record, host `www` → `cname.vercel-dns.com`
3. Wait for DNS to propagate (minutes to a few hours). Vercel issues the
   SSL certificate automatically — this also permanently fixes the old
   expired-certificate problem on the domain.

## Step 2 — CMS on a subdomain

1. Vercel → **personal-rahul-cms** project → Settings → Domains → Add
   → `cms.poudelrahul.com.np`.
2. At your DNS provider:
   - `CNAME` record, host `cms` → `cname.vercel-dns.com`

Your login and publishing keep working unchanged — the CMS connects to
GitHub's API, which doesn't care what domain the CMS is served from.

## Step 3 — SEO URLs (after the domain is live)

The SEO files (canonical tags, `og:url`/`og:image`, `sitemap.xml`,
`robots.txt`) contain absolute URLs, which currently use the vercel.app
address. Once the domain works, do a find-and-replace across this repo:

> replace `https://personal-rahul.vercel.app` → `https://poudelrahul.com.np`

(GitHub web: search the repo for the old URL — it lists every file; edit
each with the pencil. Or ask Claude to do it in one commit.) Until you do
this, nothing is broken — the vercel.app URLs stay live — but search
engines will treat vercel.app as the "real" address, so do it soon after
the domain is up. Also submit `https://poudelrahul.com.np/sitemap.xml` in
[Google Search Console](https://search.google.com/search-console) to get
indexed fast.

## Step 4 — One line in the CMS (after the domain is live)

In the **personal-rahul-cms** repo, open `app.js` and change:

```js
var SITE_URL = "https://personal-rahul.vercel.app";
```

to:

```js
var SITE_URL = "https://poudelrahul.com.np";
```

This only affects the CMS's "View" buttons, image previews, and the
`og:image` URL stamped into newly published articles. Everything published
before the change keeps working either way, because the vercel.app URLs
stay live.

## What you do NOT need to touch

- Any page, link, or asset on the site — all root-relative
- The contact form / newsletter (FormSubmit is tied to your email, not the domain)
- The CMS login (`cms/auth.json` is fetched from GitHub, not your domain)
- GitHub tokens or Vercel settings beyond adding the domains
