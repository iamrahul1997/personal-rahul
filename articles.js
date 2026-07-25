/* ============================================================
   YOUR ARTICLE LIST — this is the ONLY file you edit to make
   an article appear on the Home page and the Writing page.
   ------------------------------------------------------------
   TO ADD AN ARTICLE:
   1. Copy one { ... } block below (including the comma).
   2. Change the fields.
   3. Put the newest article FIRST in the list.

   Fields:
   - title:    the headline
   - url:      the essay link, e.g. "/articles/my-new-essay" (no .html)
   - category: "Geopolitics", "Technology", or "Nepal"
   - date:     e.g. "July 2026"
   - minutes:  reading time, just a number
   - excerpt:  1–2 sentence teaser
   - featured: true = big red card (only ONE should be true)
   ============================================================ */
const ARTICLES = [
  {
    title: "Why Nepal's voice matters in a multipolar world",
    url: "/articles/why-nepals-voice-matters",
    category: "Geopolitics",
    date: "July 2026",
    minutes: 8,
    excerpt:
      "An independent perspective on how small states can meet a more complex international landscape with confidence, context, and care.",
    featured: true,
  },
  {
    title: "Technology is changing diplomacy — are we paying attention?",
    url: "/articles/technology-is-changing-diplomacy",
    category: "Technology",
    date: "June 2026",
    minutes: 6,
    excerpt:
      "From digital public infrastructure to AI in foreign ministries, the tools of statecraft are being rewritten faster than the rulebooks.",
    featured: false,
  },
  {
    title: "A clearer lens on the region we call home",
    url: "/articles/a-clearer-lens-on-the-region",
    category: "Nepal",
    date: "May 2026",
    minutes: 7,
    excerpt:
      "South Asia is usually explained from the outside in. What changes when we start the story from Kathmandu instead?",
    featured: false,
  },
];

/* ============================================================
   Rendering code below — you don't need to touch anything
   under this line.
   ============================================================ */
(function () {
  function slugClass(category) {
    return "cat-" + category.toLowerCase().replace(/[^a-z]/g, "");
  }

  function card(a, opts) {
    var isFeatured = a.featured && opts.allowFeatured;
    var el = document.createElement("article");
    el.className =
      "story-card " + slugClass(a.category) + (isFeatured ? " is-featured" : "");
    el.dataset.category = a.category;
    el.setAttribute("data-reveal", "");
    el.innerHTML =
      '<p class="story-meta">' +
      (isFeatured ? "Featured essay <span>·</span> " : "") +
      a.category +
      " <span>·</span> " +
      a.minutes +
      " min read</p>" +
      "<h3>" + a.title + "</h3>" +
      '<p class="excerpt">' + a.excerpt + "</p>" +
      '<a class="story-link" href="' + opts.base + a.url + '">Read the essay <span aria-hidden="true">→</span></a>';
    return el;
  }

  function render(container) {
    var base = container.dataset.base || "";
    var limit = parseInt(container.dataset.limit || "0", 10);
    var allowFeatured = container.dataset.featured !== "off";
    var list = limit > 0 ? ARTICLES.slice(0, limit) : ARTICLES;
    list.forEach(function (a) {
      container.appendChild(card(a, { base: base, allowFeatured: allowFeatured }));
    });
  }

  function initFilters(bar) {
    var grid = document.querySelector(bar.dataset.target);
    if (!grid) return;
    bar.addEventListener("click", function (e) {
      var btn = e.target.closest(".filter-btn");
      if (!btn) return;
      bar.querySelectorAll(".filter-btn").forEach(function (b) {
        b.classList.toggle("active", b === btn);
      });
      var want = btn.dataset.filter;
      grid.querySelectorAll(".story-card").forEach(function (c) {
        c.style.display =
          want === "all" || c.dataset.category === want ? "" : "none";
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-articles]").forEach(render);
    document.querySelectorAll("[data-filter-bar]").forEach(initFilters);
  });
})();
