// form-validation.js

async function validateForm() {
  // 1. Grab all values
  const name       = document.getElementById("name").value.trim();
  const email      = document.getElementById("email").value.trim();
  const course     = document.getElementById("course").value;
  const department = document.getElementById("department").value;
  const subject    = document.getElementById("subject").value.trim();
  const teacher    = document.getElementById("teacher").value.trim();
  const feedback   = document.getElementById("feedback").value.trim();
  
  // 2. Client‑side validation
  if (!name)       { alert("Please enter your name.");         return false; }
  if (!email || !email.includes("@") || !email.includes(".")) {
                   alert("Please enter a valid email address."); return false; }
  if (!course)     { alert("Please select a course.");         return false; }
  if (!department) { alert("Please select a department.");     return false; }
  if (!subject)    { alert("Please enter the subject.");       return false; }
  if (!teacher)    { alert("Please enter teacher name.");     return false; }
  if (!feedback)   { alert("Please enter your feedback.");    return false; }

  // 3. Build payload
  const payload = { name, email, course, department, subject, teacher, feedback };

  try {
    // 4. Send to backend
    const res = await fetch("http://localhost:3000/submit-feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await res.json();

    if (res.ok) {
      alert(data.message || "Feedback submitted successfully!");
      document.getElementById("feedbackForm").reset();
    } else {
      alert(data.error || "Failed to submit feedback.");
    }
  } catch (err) {
    console.error("Network or server error:", err);
    alert("Error submitting feedback. Please try again later.");
  }

  // prevent normal form submit
  return false;
}

// Attach it to the form
document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("feedbackForm")
    .addEventListener("submit", (e) => {
      e.preventDefault();
      validateForm();
    });
});