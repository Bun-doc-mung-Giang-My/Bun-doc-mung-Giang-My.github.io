/* ============================================================
   SITE CONFIG  —  edit this file, then commit + push.
   These are the only settings you should normally need to touch.
   ============================================================ */

window.SITE_CONFIG = {
  /* Business name shown in the header, footer and page titles. */
  businessName: "Bright Path Tutoring",

  /* Where booking requests should reach you. */
  contactEmail: "dana@example.com",
  contactPhone: "(555) 123-4567",

  /* ----- Booking delivery -----------------------------------
     Free form at https://formspree.io -> paste ONLY its ID here
     (looks like "xdorwkno"). Blank = plain e-mail fallback. */
  formspreeId: "",

  /* ----- Visitor insight (optional) — PostHog --------------
     Paste your PostHog Project API key (starts "phc_...") and
     set the host to your region. Blank key = nothing loads. */
  posthogKey: "",
  posthogHost: "https://us.i.posthog.com",
};
