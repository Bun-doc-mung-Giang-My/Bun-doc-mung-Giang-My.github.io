/* Renders the "Our tutors" listing + subject filter. */
(function () {
  var tutors = window.TUTORS || [];
  var grid = document.getElementById("tutor-grid");
  var chipRow = document.getElementById("subject-chips");
  var countEl = document.getElementById("result-count");
  if (!grid) return;

  /* Build the subject list from the tutor data. */
  var subjects = [];
  tutors.forEach(function (t) {
    t.subjects.forEach(function (s) {
      if (subjects.indexOf(s) === -1) subjects.push(s);
    });
  });
  subjects.sort();

  var params = new URLSearchParams(location.search);
  var active = params.get("subject") || "All";
  if (active !== "All" && subjects.indexOf(active) === -1) active = "All";

  function esc(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      }[c];
    });
  }

  function makeChip(label) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "chip";
    b.textContent = label;
    b.setAttribute("aria-pressed", String(label === active));
    b.addEventListener("click", function () {
      active = label;
      var url = new URL(location.href);
      if (label === "All") url.searchParams.delete("subject");
      else url.searchParams.set("subject", label);
      history.replaceState(null, "", url);
      render();
      if (label !== "All" && window.track) {
        window.track("select_subject", { subject: label });
      }
    });
    return b;
  }

  if (chipRow) {
    chipRow.appendChild(makeChip("All"));
    subjects.forEach(function (s) {
      chipRow.appendChild(makeChip(s));
    });
  }

  var seen = {};
  var io =
    "IntersectionObserver" in window
      ? new IntersectionObserver(
          function (entries) {
            entries.forEach(function (en) {
              if (!en.isIntersecting) return;
              var slug = en.target.getAttribute("data-slug");
              if (slug && !seen[slug]) {
                seen[slug] = true;
                if (window.track) window.track("view_tutor", { tutor: slug });
              }
              io.unobserve(en.target);
            });
          },
          { threshold: 0.6 }
        )
      : null;

  function card(t) {
    var el = document.createElement("article");
    el.className = "tutor-card";
    el.setAttribute("data-slug", t.slug);

    var bookUrl =
      "booking.html?tutor=" +
      encodeURIComponent(t.slug) +
      (active !== "All" ? "&subject=" + encodeURIComponent(active) : "");

    var tags = t.subjects
      .map(function (s) {
        return '<span class="tag">' + esc(s) + "</span>";
      })
      .join("");

    var slots = t.availability.length
      ? t.availability
          .map(function (s) {
            return esc(s);
          })
          .join(" &nbsp;·&nbsp; ")
      : "Fully booked — check back soon";

    el.innerHTML =
      '<img class="photo" src="' +
      esc(t.photo) +
      '" alt="Portrait of ' +
      esc(t.name) +
      '" loading="lazy" width="600" height="400">' +
      '<div class="body">' +
      "<h3>" +
      esc(t.name) +
      "</h3>" +
      '<p class="meta">' +
      esc(t.grades) +
      ' &nbsp;·&nbsp; <span class="rate">$' +
      t.rate +
      "/hr</span></p>" +
      '<div class="tag-row">' +
      tags +
      "</div>" +
      "<p>" +
      esc(t.blurb) +
      "</p>" +
      '<p class="avail"><strong>Open times:</strong> ' +
      slots +
      "</p>" +
      '<div class="actions">' +
      '<a class="btn btn-primary" href="' +
      bookUrl +
      '">Book with ' +
      esc(t.name.split(" ")[0]) +
      "</a>" +
      "</div>" +
      "</div>";

    el.querySelector(".btn-primary").addEventListener("click", function () {
      if (window.track)
        window.track("begin_booking", {
          tutor: t.slug,
          subject: active !== "All" ? active : undefined,
        });
    });

    if (io) io.observe(el);
    return el;
  }

  function render() {
    if (chipRow) {
      chipRow.querySelectorAll(".chip").forEach(function (c) {
        c.setAttribute("aria-pressed", String(c.textContent === active));
      });
    }
    var list =
      active === "All"
        ? tutors
        : tutors.filter(function (t) {
            return t.subjects.indexOf(active) !== -1;
          });

    grid.innerHTML = "";
    list.forEach(function (t) {
      grid.appendChild(card(t));
    });

    if (countEl) {
      countEl.textContent =
        list.length +
        (list.length === 1 ? " tutor" : " tutors") +
        (active === "All" ? "" : " for " + active);
    }
  }

  render();
})();
