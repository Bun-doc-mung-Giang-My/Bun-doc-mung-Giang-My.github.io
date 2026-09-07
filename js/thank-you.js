/* Shows a read-back of what was just requested (from sessionStorage). */
(function () {
  var box = document.getElementById("booking-recap");
  if (!box) return;
  var data = null;
  try {
    data = JSON.parse(sessionStorage.getItem("lastBooking") || "null");
  } catch (e) {}

  if (!data) {
    box.hidden = true;
    return;
  }

  function row(term, val) {
    if (!val) return "";
    return "<dt>" + term + "</dt><dd>" + String(val).replace(/</g, "&lt;") + "</dd>";
  }

  box.innerHTML =
    "<h3>What you asked for</h3><dl class=\"summary-dl\">" +
    row("Tutor", data.tutor_name) +
    row("Subject", data.subject) +
    row("Requested time", data.time) +
    row("Student", data.student_name + " (" + data.student_grade + ")") +
    "</dl>";

  try {
    sessionStorage.removeItem("lastBooking");
  } catch (e) {}
})();
