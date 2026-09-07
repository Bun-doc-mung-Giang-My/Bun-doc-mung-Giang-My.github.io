/* Shared behaviour for every page: mobile nav, business name, year. */
(function () {
  var cfg = window.SITE_CONFIG || {};

  /* Fill in business name anywhere it's requested. */
  document.querySelectorAll("[data-business-name]").forEach(function (el) {
    el.textContent = cfg.businessName || "Our Tutoring";
  });
  if (cfg.businessName) {
    document.title = document.title.replace("{business}", cfg.businessName);
  }

  /* Footer contact + year. */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
  document.querySelectorAll("[data-contact-email]").forEach(function (el) {
    if (cfg.contactEmail) {
      el.textContent = cfg.contactEmail;
      el.href = "mailto:" + cfg.contactEmail;
    }
  });
  document.querySelectorAll("[data-contact-phone]").forEach(function (el) {
    if (cfg.contactPhone) el.textContent = cfg.contactPhone;
  });

  /* Mobile nav toggle. */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.getElementById("nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      links.hidden = open;
    });
    /* Reset the toggle state when resizing back up to desktop. */
    var mq = window.matchMedia("(min-width: 721px)");
    mq.addEventListener("change", function (e) {
      if (e.matches) {
        links.hidden = false;
        toggle.setAttribute("aria-expanded", "false");
      } else if (toggle.getAttribute("aria-expanded") !== "true") {
        links.hidden = true;
      }
    });
    if (!mq.matches) links.hidden = true;
  }
})();
