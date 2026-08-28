/**
 * customer.js
 * If nobody is logged in, this file simply does nothing, and the
 * customer fills in the form by hand like normal.
 */

document.addEventListener("DOMContentLoaded", function () {

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const welcomeMessage = document.getElementById("customer-welcome");

  // If this page doesn't have a reservation form, stop here.
  if (!nameInput || !emailInput) {
    return;
  }

  const loggedInName = sessionStorage.getItem("loggedInName");
  const loggedInEmail = sessionStorage.getItem("loggedInEmail");

  // If nobody is logged in, there is nothing to pre-fill.
  if (!loggedInName || !loggedInEmail) {
    return;
  }

  // Fill in the form with the logged-in customer's details.
  nameInput.value = loggedInName;
  emailInput.value = loggedInEmail;

  // Show a friendly welcome message above the form.
  if (welcomeMessage) {
    welcomeMessage.textContent =
      "Welcome back, " + loggedInName + "! We've filled in your name and email for you.";
    welcomeMessage.style.display = "block";
  }

});
