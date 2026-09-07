/* ============================================================
   SITE CONFIG  —  edit this file, then commit + push.
   These are the only settings you should normally need to touch.
   ============================================================ */

window.SITE_CONFIG = {
  /* Business name shown in the header, footer and page titles. */
  businessName: "Bright Path Tutoring",

  /* Where booking requests should reach you.
     Used for the footer link and as the fallback if Formspree
     (below) is not set up yet. */
  contactEmail: "dana@example.com",
  contactPhone: "(555) 123-4567",

  /* ----- Booking delivery -------------------------------------
     Recommended: create a free form at https://formspree.io
     (one form, pointed at your email). It gives you an ID that
     looks like "xdorwkno". Paste ONLY that ID here.
     Formspree e-mails you every request with all the details,
     and can forward to your phone as a text via its
     notification settings / a Zapier "SMS" step.
     Leave blank ("") to use a plain e-mail fallback instead. */
  formspreeId: "",

  /* ----- Visitor insight (optional) --------------------------
     Paste a Google Analytics 4 Measurement ID ("G-XXXXXXXXXX")
     to see which tutors and subjects parents look at most and
     how many who start a booking actually finish it.
     Leave blank ("") and NO tracking scripts load at all. */
  gaMeasurementId: "",
};
