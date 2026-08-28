// ===== login.js =====
// This file handles what happens when someone submits the login form.
// It is written in plain, beginner-friendly JavaScript (no frameworks).

// Wait until the page has fully loaded before running our code.
document.addEventListener("DOMContentLoaded", function () {

  // Grab the form and the message box from the page.
  const loginForm = document.getElementById("login-form");
  const formMessage = document.getElementById("form-message");

  // If the form isn't on this page for some reason, stop here.
  if (!loginForm) {
    return;
  }

  // If the user is already logged in, send them to the home page
  // so they don't see the login form again.
  if (sessionStorage.getItem("loggedInName") && sessionStorage.getItem("loggedInEmail")) {
    window.location.href = "../index.html";
    return;
  }

  // Listen for the form being submitted.
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Get what the user typed into the name, email and password fields.
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const rememberMe = document.getElementById("remember").checked;

    // Simple check: make sure all fields have something in them.
    if (name === "" || email === "" || password === "") {
      showMessage("Please fill in your name, email and password.", "error");
      return;
    }

    if (password.length < 6) {
      showMessage("Password must be at least 6 characters long.", "error");
      return;
    }

    // Save "Remember me" details if the box is checked
    if (rememberMe) {
      localStorage.setItem("rememberedName", name);
      localStorage.setItem("rememberedEmail", email);
    } else {
      localStorage.removeItem("rememberedName");
      localStorage.removeItem("rememberedEmail");
    }

    // Mark the user as logged in (this is what layout.js checks)
    sessionStorage.setItem("loggedInName", name);
    sessionStorage.setItem("loggedInEmail", email);

    // Show a success message.
    showMessage("Login successful! Taking you to the home page...", "success");

    // After a short delay, go to the home page
    setTimeout(function () {
      window.location.href = "../index.html";
    }, 1200);
  });

  // If we previously remembered a name and email, fill them in.
  const savedName = localStorage.getItem("rememberedName");
  const savedEmail = localStorage.getItem("rememberedEmail");

  if (savedEmail) {
    document.getElementById("email").value = savedEmail;
    document.getElementById("remember").checked = true;
  }
  if (savedName) {
    document.getElementById("name").value = savedName;
  }

  function showMessage(text, type) {
    formMessage.textContent = text;
    formMessage.className = "form-message " + type;
  }

});
