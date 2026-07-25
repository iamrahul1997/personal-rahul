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

  /* Scroll-reveal: anything with data-reveal fades up on first view.
     window.__observeReveal lets articles.js register cards it adds later. */
  var revealObserver = null;
  if ("IntersectionObserver" in window) {
    revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
  }
  window.__observeReveal = function (el) {
    if (revealObserver) revealObserver.observe(el);
    else el.classList.add("revealed");
  };
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-reveal]").forEach(function (el) {
      window.__observeReveal(el);
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

  /* Newsletter form — subscribers land in your inbox via FormSubmit
     (same service and one-time activation as the contact form). */
  var newsletter = document.querySelector("[data-newsletter]");
  if (newsletter) {
    newsletter.addEventListener("submit", function (e) {
      e.preventDefault();
      var note = newsletter.parentElement.querySelector(".form-note");
      var email = newsletter.email.value.trim();
      if (!/.+@.+\..+/.test(email)) {
        note.textContent = "Please enter a valid email address.";
        note.classList.add("is-error");
        return;
      }
      note.classList.remove("is-error");
      note.textContent = "Subscribing…";
      fetch("https://formsubmit.co/ajax/rahulpoudel2020@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          email: email,
          _subject: "New newsletter subscriber",
          _template: "table",
          _captcha: "false",
        }),
      }).then(
        function (res) {
          if (!res.ok) throw new Error();
          newsletter.reset();
          note.textContent = "You're on the list — welcome!";
        }
      ).catch(function () {
        note.textContent = "Something went wrong. Please try again later.";
        note.classList.add("is-error");
      });
    });
  }

  /* Floating navbar: condenses when scrolled, hides once you're past
     the first screen and scrolling down, returns when you scroll up. */
  var navWrap = document.querySelector(".nav-wrap");
  if (navWrap) {
    var lastY = window.scrollY;
    var onScroll = function () {
      var y = window.scrollY;
      navWrap.classList.toggle("scrolled", y > 24);
      var goingDown = y > lastY + 4;
      var goingUp = y < lastY - 4;
      if (y > window.innerHeight * 0.9 && goingDown) {
        navWrap.classList.add("nav-hidden");
      } else if (goingUp || y <= window.innerHeight * 0.9) {
        navWrap.classList.remove("nav-hidden");
      }
      if (goingDown || goingUp) lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }
})();
