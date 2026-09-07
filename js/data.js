/* ============================================================
   TUTORS & AVAILABILITY
   ------------------------------------------------------------
   This is the list parents see on the "Our tutors" page and in
   the booking form. To change anything about a tutor, edit it
   here, then commit + push.

   HOW TO REMOVE A TIME THAT'S BEEN BOOKED
   --------------------------------------
   When you confirm a booking, delete that time string from the
   tutor's "availability" list so it stops showing as free.
   Example — Maya's Tuesday slot is now taken:

       availability: [
         "Mon 4:00 PM",
         "Tue 5:00 PM",   <-- delete this whole line (and its comma)
         "Thu 4:00 PM",
       ]

   Keep the square brackets and the quotes. A time you delete
   here disappears from the site the next time you push.

   NOTE ON PHOTOS
   --------------
   Each "photo" points to a file in images/tutors/. Replace the
   placeholder .svg files with real photos (name them the same,
   or update the path here). Landscape crops look best.
   ============================================================ */

window.TUTORS = [
  {
    slug: "maya-ellison",
    name: "Maya Ellison",
    photo: "images/tutors/maya-ellison.svg",
    subjects: ["Math"],
    grades: "Grades 6–12",
    rate: 45,
    blurb:
      "Ten years teaching middle- and high-school math. Maya is calm, patient, and great at rebuilding confidence after a rough semester.",
    availability: [
      "Mon 4:00 PM",
      "Tue 5:00 PM",
      "Wed 3:30 PM",
      "Thu 4:00 PM",
      "Sat 10:00 AM",
    ],
  },
  {
    slug: "daniel-osei",
    name: "Daniel Osei",
    photo: "images/tutors/daniel-osei.svg",
    subjects: ["Reading & Writing", "English"],
    grades: "Grades 3–8",
    rate: 40,
    blurb:
      "Former elementary teacher who makes reading and writing feel like play. Focuses on comprehension, vocabulary, and getting ideas onto the page.",
    availability: ["Mon 3:30 PM", "Wed 4:30 PM", "Thu 5:00 PM", "Fri 3:30 PM"],
  },
  {
    slug: "priya-raman",
    name: "Priya Raman",
    photo: "images/tutors/priya-raman.svg",
    subjects: ["Science", "Biology", "Chemistry"],
    grades: "Grades 8–12",
    rate: 48,
    blurb:
      "Biology and chemistry specialist. Priya connects the textbook to real life and helps students prep for tests without the panic.",
    availability: ["Tue 4:00 PM", "Wed 5:30 PM", "Fri 4:00 PM", "Sat 11:00 AM"],
  },
  {
    slug: "sofia-marin",
    name: "Sofía Marín",
    photo: "images/tutors/sofia-marin.svg",
    subjects: ["Spanish", "Math"],
    grades: "Grades K–8",
    rate: 38,
    blurb:
      "Bilingual educator who tutors Spanish and elementary math. Warm and playful with younger students, and endlessly encouraging.",
    availability: [
      "Mon 2:30 PM",
      "Tue 3:00 PM",
      "Thu 2:30 PM",
      "Fri 3:00 PM",
      "Sat 9:30 AM",
    ],
  },
  {
    slug: "james-whitfield",
    name: "James Whitfield",
    photo: "images/tutors/james-whitfield.svg",
    subjects: ["Physics", "Math"],
    grades: "Grades 9–12 & early college",
    rate: 52,
    blurb:
      "Physics and upper-level math, including calculus. James is methodical and clear, and loves the moment a hard concept finally clicks.",
    availability: ["Mon 6:00 PM", "Wed 6:00 PM", "Thu 6:30 PM", "Sun 4:00 PM"],
  },
  {
    slug: "grace-kim",
    name: "Grace Kim",
    photo: "images/tutors/grace-kim.svg",
    subjects: ["Elementary (General)", "Reading & Writing", "Study Skills"],
    grades: "Grades K–5",
    rate: 36,
    blurb:
      "General elementary tutoring, early reading, and study habits. Grace builds gentle routines that help young learners feel organized and capable.",
    availability: [
      "Mon 3:00 PM",
      "Tue 3:30 PM",
      "Wed 3:00 PM",
      "Thu 3:30 PM",
      "Sat 10:30 AM",
    ],
  },
];
