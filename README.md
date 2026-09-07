# Bright Path Tutoring — website

A small, static website for a tutoring service. Parents browse tutors, then
send a booking request for one tutor and one time. Every request goes to Dana,
who confirms it personally and then tells the tutor.

Built as plain HTML/CSS/JS so it can be hosted free on **GitHub Pages** with no
server to run.

---

## Pages

| File | What it is |
|------|------------|
| `index.html` | Home — welcome, how it works, a note from Dana |
| `tutors.html` | The six tutors, with a subject filter |
| `booking.html` | Booking form (a tutor can be pre-selected from the tutors page) |
| `thank-you.html` | Confirmation shown after a request is sent |

---

## First-time setup (about 10 minutes)

Everything you need to change is in **`js/config.js`**. Open it, edit the values
in quotes, then commit and push (see "Editing the site" below).

### 1. Your name, email and phone
```js
businessName: "Bright Path Tutoring",
contactEmail: "dana@example.com",
contactPhone: "(555) 123-4567",
```
These show in the header and footer, and the email is where fallback booking
requests go.

### 2. Where booking requests are delivered — Formspree (recommended)
GitHub Pages can't send email by itself, so the form hands off to a free service.

1. Go to <https://formspree.io> and create a free account.
2. Create **one form**, set its address to your email.
3. Formspree gives you an endpoint like `https://formspree.io/f/xdorwkno`.
   Copy **only the last part** (`xdorwkno`) into `config.js`:
   ```js
   formspreeId: "xdorwkno",
   ```
4. Send yourself a test booking from `booking.html`. Formspree will ask you to
   confirm the address once.

**Text (SMS) notifications:** in Formspree's form settings you can add extra
notification emails — many phone carriers accept an email-to-text address
(e.g. `5551234567@vtext.com`). For a true SMS, connect the form to a free
Zapier "SMS by Zapier" step.

**Until `formspreeId` is filled in**, the form still works: it opens a
pre-filled email in the parent's mail app addressed to `contactEmail`.

### 3. Visitor insight (optional)
If you want to see which tutors and subjects parents look at most, and how many
who start a booking actually finish:

1. Create a free Google Analytics 4 property at <https://analytics.google.com>.
2. Copy its Measurement ID (`G-XXXXXXXXXX`) into `config.js`:
   ```js
   gaMeasurementId: "G-XXXXXXXXXX",
   ```

If you leave it blank, **no tracking scripts load at all.** No names, emails or
phone numbers are ever sent to analytics — only these events:

| Event | Tells you |
|-------|-----------|
| `view_tutor` | which tutor profiles get looked at |
| `select_subject` | which subjects parents filter for |
| `begin_booking` | someone started the booking form |
| `submit_booking` | someone finished it (includes a "returning: Yes/No" value) |

`begin_booking` vs `submit_booking` is your "did they book or just leave?" number.
The **returning?** question on the form is your repeat-family count — you also see
it in every Formspree email.

---

## Day-to-day: tutors and available times

All of this lives in **`js/data.js`**. Each tutor has a name, photo, subjects,
grade range, hourly rate, a short blurb, and a list of open times.

### When a booking is confirmed, remove that time
Open `js/data.js`, find the tutor, and delete the time from their
`availability` list. Example — Maya's Tuesday slot is now taken:

```js
availability: [
  "Mon 4:00 PM",
  "Tue 5:00 PM",   // <- delete this whole line
  "Thu 4:00 PM",
],
```

Keep the quotes and the square brackets. Commit and push, and that time stops
showing on the site. Add a line back the same way to re-open a time.

### Real tutor photos
Replace the placeholder files in `images/tutors/` with real photos. Keep the
same file names (e.g. `maya-ellison.svg` → `maya-ellison.jpg`) and update the
`photo:` path in `js/data.js` to match. Landscape (wider than tall) looks best.

### Adding or removing a tutor
Copy one `{ ... }` block in `js/data.js`, change the details, and give it a
unique `slug` (lowercase, dashes). The tutors page and the booking form update
themselves.

---

## Editing the site

You do **not** need to touch anything except `js/config.js` and `js/data.js`
for normal use.

**Easiest way (in the browser):**
1. Go to the file on GitHub (e.g. `js/data.js`).
2. Click the pencil ✏️ icon, make your change.
3. Scroll down, click **Commit changes**.
4. The live site updates in a minute or two.

---

## Publishing on GitHub Pages

1. Push this folder to the repository
   `Bun-doc-mung-Giang-My/bundocmung.github.io` (branch `main`).
2. On GitHub: **Settings → Pages**.
3. Under **Build and deployment**, set **Source: Deploy from a branch**,
   **Branch: `main`**, **Folder: `/ (root)`**. Save.
4. Wait ~1 minute. The site appears at
   **https://bun-doc-mung-giang-my.github.io/bundocmung.github.io/**

The `.nojekyll` file is intentional — it tells GitHub Pages to serve the files
as-is.

---

## Files

```
index.html, tutors.html, booking.html, thank-you.html
css/style.css
js/config.js      <- your settings
js/data.js        <- tutors + available times
js/main.js        <- shared header/footer behaviour
js/tutors.js      <- builds the tutors page
js/booking.js     <- builds + sends the booking form
js/analytics.js   <- optional, only runs if you add a GA id
js/thank-you.js   <- shows the recap on the confirmation page
images/           <- logo, hero, tutor photos
.nojekyll         <- required for GitHub Pages
```

---

## Notes / things deliberately left out

Per the brief, this version has **no** parent accounts, **no** booking
dashboard, **no** post-session ratings, and **no** automatic reminders beyond
the confirmation. Bookings are approved by Dana before the tutor is told.
