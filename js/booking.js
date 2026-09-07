/* Booking form: prefill tutor/subject, fill time slots from the
   chosen tutor, validate, and deliver the request (Formspree if
   configured, otherwise a pre-filled e-mail). */
(function () {
  var cfg = window.SITE_CONFIG || {};
  var tutors = window.TUTORS || [];
  var form = document.getElementById("booking-form");
  if (!form) return;

  var tutorSel = form.elements.tutor;
  var subjectSel = form.elements.subject;
  var timeSel = form.elements.time;
  var statusEl = document.getElementById("form-status");
  var submitBtn = form.querySelector('button[type="submit"]');
  var params = new URLSearchParams(location.search);

  /* ----- Populate the tutor dropdown ----- */
  tutors.forEach(function (t) {
    var o = document.createElement("option");
    o.value = t.slug;
    o.textContent = t.name + "  ($" + t.rate + "/hr)";
    tutorSel.appendChild(o);
  });

  /* ----- Populate the subject dropdown from the tutor data ----- */
  var subjects = [];
  tutors.forEach(function (t) {
    t.subjects.forEach(function (s) {
      if (subjects.indexOf(s) === -1) subjects.push(s);
    });
  });
  subjects.sort().forEach(function (s) {
    var o = document.createElement("option");
    o.value = s;
    o.textContent = s;
    subjectSel.appendChild(o);
  });

  /* ----- Apply prefills from the URL (?tutor=&subject=) ----- */
  var wantTutor = params.get("tutor");
  if (wantTutor && tutors.some(function (t) { return t.slug === wantTutor; })) {
    tutorSel.value = wantTutor;
  }
  var wantSubject = params.get("subject");
  if (wantSubject && subjects.indexOf(wantSubject) !== -1) {
    subjectSel.value = wantSubject;
  }

  /* ----- Fill the time dropdown for the selected tutor ----- */
  function currentTutor() {
    return tutors.filter(function (t) {
      return t.slug === tutorSel.value;
    })[0];
  }

  function fillTimes() {
    var t = currentTutor();
    timeSel.innerHTML = "";
    var placeholder = document.createElement("option");
    placeholder.value = "";
    if (!t) {
      placeholder.textContent = "Choose a tutor first";
      timeSel.appendChild(placeholder);
      timeSel.disabled = true;
      return;
    }
    if (!t.availability.length) {
      placeholder.textContent = "No open times right now — try another tutor";
      timeSel.appendChild(placeholder);
      timeSel.disabled = true;
      return;
    }
    placeholder.textContent = "Select a time…";
    timeSel.appendChild(placeholder);
    t.availability.forEach(function (slot) {
      var o = document.createElement("option");
      o.value = slot;
      o.textContent = slot;
      timeSel.appendChild(o);
    });
    timeSel.disabled = false;
  }

  fillTimes();
  updateSummary();

  tutorSel.addEventListener("change", function () {
    fillTimes();
    updateSummary();
  });
  [subjectSel, timeSel].forEach(function (el) {
    el.addEventListener("change", updateSummary);
  });

  /* ----- Live summary panel ----- */
  function updateSummary() {
    var t = currentTutor();
    set("sum-tutor", t ? t.name : "—");
    set("sum-rate", t ? "$" + t.rate + "/hr" : "—");
    set("sum-subject", subjectSel.value || "—");
    set("sum-time", timeSel.value || "—");
  }
  function set(id, val) {
    var el = document.getElementById(id);
    if (el) el.textContent = val;
  }

  /* ----- Count "started a booking" once ----- */
  var began = false;
  form.addEventListener(
    "input",
    function () {
      if (began) return;
      began = true;
      if (window.track) {
        window.track("begin_booking", {
          tutor: tutorSel.value || undefined,
          subject: subjectSel.value || undefined,
        });
      }
    },
    { once: false }
  );

  function showStatus(kind, msg) {
    if (!statusEl) return;
    statusEl.hidden = false;
    statusEl.dataset.kind = kind;
    statusEl.textContent = msg;
  }

  function goToThanks(data) {
    try {
      sessionStorage.setItem("lastBooking", JSON.stringify(data));
    } catch (e) {}
    location.href = "thank-you.html";
  }

  function mailtoFallback(data) {
    var to = cfg.contactEmail || "";
    var lines = [
      "New booking request from the website",
      "",
      "Parent / guardian: " + data.parent_name,
      "Email: " + data.parent_email,
      "Phone: " + data.parent_phone,
      "",
      "Student: " + data.student_name + "  (" + data.student_grade + ")",
      "Subject: " + data.subject,
      "Tutor: " + data.tutor_name,
      "Requested time: " + data.time,
      "Booked with us before: " + data.returning,
      "",
      "Notes: " + (data.notes || "(none)"),
    ];
    var href =
      "mailto:" +
      encodeURIComponent(to) +
      "?subject=" +
      encodeURIComponent("New booking request — " + data.tutor_name) +
      "&body=" +
      encodeURIComponent(lines.join("\n"));
    window.location.href = href;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    var t = currentTutor();
    var fd = new FormData(form);
    var data = {
      parent_name: (fd.get("parent_name") || "").toString().trim(),
      parent_email: (fd.get("parent_email") || "").toString().trim(),
      parent_phone: (fd.get("parent_phone") || "").toString().trim(),
      student_name: (fd.get("student_name") || "").toString().trim(),
      student_grade: fd.get("student_grade") || "",
      subject: fd.get("subject") || "",
      tutor_name: t ? t.name : tutorSel.value,
      time: fd.get("time") || "",
      returning: fd.get("returning") || "Not sure",
      notes: (fd.get("notes") || "").toString().trim(),
    };

    if (window.track) {
      window.track("submit_booking", {
        tutor: tutorSel.value,
        subject: data.subject,
        returning: data.returning,
      });
    }

    var id = (cfg.formspreeId || "").trim();

    /* No Formspree yet -> open a pre-filled e-mail, then confirm. */
    if (!id) {
      mailtoFallback(data);
      goToThanks(data);
      return;
    }

    /* Formspree path. */
    submitBtn.disabled = true;
    showStatus("success", "Sending your request…");

    var payload = new FormData(form);
    payload.append("_subject", "New booking request — " + data.tutor_name);
    payload.set("tutor", data.tutor_name); // send the readable name, not the slug

    fetch("https://formspree.io/f/" + encodeURIComponent(id), {
      method: "POST",
      body: payload,
      headers: { Accept: "application/json" },
    })
      .then(function (res) {
        if (res.ok) {
          goToThanks(data);
        } else {
          return res.json().then(function (j) {
            throw new Error(
              (j && j.errors && j.errors[0] && j.errors[0].message) ||
                "That didn't go through."
            );
          });
        }
      })
      .catch(function (err) {
        submitBtn.disabled = false;
        showStatus(
          "error",
          "Sorry — " +
            err.message +
            " Please email us at " +
            (cfg.contactEmail || "our address") +
            " and we'll sort it out."
        );
      });
  });
})();
