/* ============================================================
   Optional analytics — PostHog.
   - If SITE_CONFIG.posthogKey is blank, NOTHING loads and
     track() quietly does nothing.
   - If it is set, we load posthog-js and send a handful of
     named events so Dana can see:
       view_tutor      -> which tutor profiles get looked at
       select_subject  -> which subjects parents filter for
       begin_booking   -> someone started the booking form
       submit_booking  -> someone finished it (returning: Yes/No)
     Page views are captured automatically (used for the
     "looked but didn't book" funnel).
   Autocapture and session recording are turned OFF. No names,
   emails or phone numbers are ever sent to analytics.
   ============================================================ */
(function () {
  var cfg = window.SITE_CONFIG || {};
  var key = (cfg.posthogKey || "").trim();
  var host = (cfg.posthogHost || "https://us.i.posthog.com").trim();

  /* Not configured -> track() is a no-op, nothing else happens. */
  if (!key) {
    window.track = function () {};
    return;
  }

  /* Queue any events fired before the library finishes loading. */
  var queue = [];
  window.track = function (name, params) {
    queue.push([name, params]);
  };

  var s = document.createElement("script");
  s.async = true;
  /* posthog serves its browser bundle from a "-assets" host. */
  s.src = host.replace(".i.posthog.com", "-assets.i.posthog.com") + "/static/array.js";

  s.onload = function () {
    try {
      window.posthog.init(key, {
        api_host: host,
        autocapture: false,
        disable_session_recording: true,
        capture_pageview: true,
        capture_pageleave: true,
        persistence: "localStorage+cookie",
      });
      window.track = function (name, params) {
        try {
          window.posthog.capture(name, params || {});
        } catch (e) {
          /* never let analytics break the page */
        }
      };
      queue.forEach(function (a) {
        window.track(a[0], a[1]);
      });
      queue.length = 0;
    } catch (e) {
      window.track = function () {};
    }
  };

  s.onerror = function () {
    window.track = function () {};
  };

  document.head.appendChild(s);
})();
