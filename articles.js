/* ============================================================
   ARTICLE RENDERING
   ------------------------------------------------------------
   The article list now lives in content/index.json and each
   essay's content in content/articles/<slug>.json — both are
   managed by your CMS (or editable by hand on GitHub).
   This file only renders them; you shouldn't need to touch it.
   ============================================================ */
(function () {
  function slugClass(category) {
    return "cat-" + category.toLowerCase().replace(/[^a-z]/g, "");
  }

  function reveal(el) {
    if (window.__observeReveal) window.__observeReveal(el);
    else el.classList.add("revealed");
  }

  function card(a, allowFeatured, index) {
    var isFeatured = a.featured && allowFeatured;
    var el = document.createElement("article");
    el.className =
      "story-card " + slugClass(a.category) + (isFeatured ? " is-featured" : "");
    el.dataset.category = a.category;
    el.setAttribute("data-reveal", "");
    el.style.transitionDelay = (index % 6) * 90 + "ms";
    var thumb =
      a.image && !isFeatured
        ? '<img class="card-thumb" src="' + a.image + '" alt="" loading="lazy" />'
        : "";
    el.innerHTML =
      thumb +
      '<p class="story-meta">' +
      (isFeatured ? "Featured essay <span>·</span> " : "") +
      a.category +
      " <span>·</span> " +
      a.minutes +
      " min read</p>" +
      "<h3>" + a.title + "</h3>" +
      '<p class="excerpt">' + a.excerpt + "</p>" +
      '<a class="story-link" href="/articles/' + a.slug + '">Read the essay <span aria-hidden="true">→</span></a>';
    reveal(el);
    return el;
  }

  function render(container, list) {
    var limit = parseInt(container.dataset.limit || "0", 10);
    var allowFeatured = container.dataset.featured !== "off";
    var shown = limit > 0 ? list.slice(0, limit) : list;
    shown.forEach(function (a, i) {
      container.appendChild(card(a, allowFeatured, i));
    });
  }

  function buildFilters(bar, list) {
    var cats = [];
    list.forEach(function (a) {
      if (cats.indexOf(a.category) === -1) cats.push(a.category);
    });
    bar.innerHTML =
      '<button class="filter-btn active" data-filter="all" type="button">All</button>' +
      cats
        .map(function (c) {
          return '<button class="filter-btn" data-filter="' + c + '" type="button">' + c + "</button>";
        })
        .join("");
    bar.addEventListener("click", function (e) {
      var btn = e.target.closest(".filter-btn");
      if (!btn) return;
      bar.querySelectorAll(".filter-btn").forEach(function (b) {
        b.classList.toggle("active", b === btn);
      });
      var want = btn.dataset.filter;
      var grid = document.querySelector(bar.dataset.target);
      if (!grid) return;
      grid.querySelectorAll(".story-card").forEach(function (c) {
        c.style.display =
          want === "all" || c.dataset.category === want ? "" : "none";
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var grids = document.querySelectorAll("[data-articles]");
    var bars = document.querySelectorAll("[data-filter-bar]");
    if (!grids.length && !bars.length) return;
    fetch("/content/index.json")
      .then(function (r) { return r.json(); })
      .then(function (list) {
        grids.forEach(function (g) { render(g, list); });
        bars.forEach(function (b) { buildFilters(b, list); });
      })
      .catch(function (err) {
        console.error("Could not load articles:", err);
      });
  });
})();
