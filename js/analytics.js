/* ============================================================
   Lightweight, optional analytics.
   - If SITE_CONFIG.gaMeasurementId is blank, NOTHING loads and
     track() quietly does nothing.
   - If it is set, we load Google Analytics 4 and send a handful
     of named events so Dana can see:
       * which tutors get viewed most      -> "view_tutor"
       * which subjects parents filter for -> "select_subject"
       * how many start vs finish a booking-> "begin_booking" / "submit_booking"
       * repeat families                   -> "returning" param on submit_booking
   No names, emails or phone numbers are ever sent to analytics.
   ============================================================ */
(function () {
  var id =
    (window.SITE_CONFIG && window.SITE_CONFIG.gaMeasurementId || "").trim();

  if (!id) {
    window.track = function () {};
    return;
  }

  var s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(id);
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", id, { anonymize_ip: true });

  window.track = function (eventName, params) {
    try {
      gtag("event", eventName, params || {});
    } catch (e) {
      /* never let analytics break the page */
    }
  };
})();
