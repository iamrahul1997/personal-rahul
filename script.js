/* Shared behavior for every page: mobile menu + footer year.
   You should not need to edit this file. */
(function () {
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.getElementById("primary-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }
  document.querySelectorAll("#year").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* Scroll-reveal: anything with data-reveal fades up on first view. */
  document.addEventListener("DOMContentLoaded", function () {
    var revealed = document.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window) || revealed.length === 0) {
      revealed.forEach(function (el) { el.classList.add("revealed"); });
    } else {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("revealed");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 }
      );
      revealed.forEach(function (el) { io.observe(el); });
    }

    /* Stagger article cards inside any revealed grid. */
    document.querySelectorAll(".story-grid .story-card").forEach(function (card, i) {
      card.style.transitionDelay = (i * 90) + "ms";
    });
  });

  /* Contact form (contact.html) — sends submissions to your inbox
     via FormSubmit.co (free, no account).
     ------------------------------------------------------------
     ONE-TIME SETUP: the very first message triggers an activation
     email from FormSubmit to rahulpoudel2020@gmail.com. Click the
     link in it once, and every submission after that is delivered
     straight to your inbox.

     OPTIONAL (Supabase storage instead): swap the fetch below for
     a POST to  https://YOUR-PROJECT.supabase.co/rest/v1/messages
     with your anon key in the `apikey` and `Authorization` headers.
     ------------------------------------------------------------ */
  async function sendMessage(data) {
    var res = await fetch("https://formsubmit.co/ajax/rahulpoudel2020@gmail.com", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        topic: data.topic,
        message: data.message,
        _subject: "New message from your website (" + data.topic + ")",
        _template: "table",
        _captcha: "false",
      }),
    });
    if (!res.ok) throw new Error("Failed to send");
  }

  var form = document.querySelector("[data-contact-form]");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var note = form.querySelector(".form-note");
      var data = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        topic: form.topic.value,
        message: form.message.value.trim(),
      };
      if (!data.name || !data.email || !data.message || !/.+@.+\..+/.test(data.email)) {
        note.textContent = "Please fill in your name, a valid email, and a message.";
        note.classList.add("is-error");
        return;
      }
      note.classList.remove("is-error");
      note.textContent = "Sending…";
      Promise.resolve(sendMessage(data)).then(
        function () {
          form.reset();
          note.textContent = "Thanks — your message is on its way!";
        },
        function () {
          note.textContent = "Something went wrong. Please email me directly instead.";
          note.classList.add("is-error");
        }
      );
    });
  }

  /* Floating navbar condenses once the page is scrolled. */
  var navWrap = document.querySelector(".nav-wrap");
  if (navWrap) {
    var onScroll = function () {
      navWrap.classList.toggle("scrolled", window.scrollY > 24);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }
})();
