/**
 * admin.js

 * HOW RESERVATIONS GET HERE:
 * Every time a customer submits the reservation form
 * (pages/reservations.html + js/main.js), their reservation is
 * saved into localStorage under the key "allReservations". This
 * file simply reads that list and displays it in a table.
 *
 * HOW THE TRACKER REACHES THE MENU PAGE:
 * The current stage is saved in localStorage under
 * "trackerCurrentStep". The Menu page (js/tracker-view.js) reads
 * that same value to show customers a live, read-only status.
 */

document.addEventListener("DOMContentLoaded", function () {

  // Change this to whatever password you want staff to use.
  const ADMIN_PASSWORD = "kitchen123";

  // ---- Login gate elements ----
  const loginBox = document.getElementById("admin-login-box");
  const loginMessage = document.getElementById("admin-login-message");
  const passwordInput = document.getElementById("admin-password");
  const loginBtn = document.getElementById("admin-login-btn");
  const dashboard = document.getElementById("admin-dashboard");
  const logoutBtn = document.getElementById("admin-logout-btn");

  // If this isn't the Admin Dashboard page, stop here.
  if (!loginBox || !dashboard) {
    return;
  }

  // 1. LOGIN GATE
  function checkPassword() {
    const entered = passwordInput.value.trim();

    if (entered === ADMIN_PASSWORD) {
      sessionStorage.setItem("isAdmin", "yes");
      showDashboard();
    } else {
      loginMessage.textContent = "Incorrect password. Please try again.";
      loginMessage.className = "form-message error";
    }
  }

  loginBtn.addEventListener("click", checkPassword);

  // Also let staff press Enter instead of clicking "Login"
  passwordInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      checkPassword();
    }
  });

  function showDashboard() {
    loginBox.style.display = "none";
    dashboard.style.display = "block";
    passwordInput.value = "";
    loginMessage.textContent = "";

    // Now that the dashboard is visible, fill it with data.
    renderReservations();
    updateTrackerDisplay();
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      sessionStorage.removeItem("isAdmin");
      dashboard.style.display = "none";
      loginBox.style.display = "block";
    });
  }

  // If staff already logged in earlier in this browser tab, skip
  // straight to the dashboard instead of asking again.
  if (sessionStorage.getItem("isAdmin") === "yes") {
    showDashboard();
  }

  // 2. TIME-TO-TABLE TRACKER
  const trackerSteps = document.querySelectorAll("#admin-tracker-steps .tracker-step");
  const trackerTime = document.getElementById("admin-tracker-time");
  const startBtn = document.getElementById("admin-start-tracker");
  const nextBtn = document.getElementById("admin-next-step");

  const stepTimes = [0, 5, 12, 18, 22];

  // Reads the saved step from localStorage and updates this page
  // to match. The Menu page has its own copy of this same idea in
  // js/tracker-view.js, just without the buttons.
  function updateTrackerDisplay() {
    const currentStep = Number(localStorage.getItem("trackerCurrentStep")) || 0;
    const isRunning = localStorage.getItem("trackerRunning") === "yes";

    trackerSteps.forEach(function (step, index) {
      step.classList.remove("active", "done");

      if (index < currentStep) {
        step.classList.add("done");
      } else if (index === currentStep) {
        step.classList.add("active");
      }
    });

    if (trackerTime) {
      trackerTime.textContent = stepTimes[currentStep] + " min";
    }

    if (startBtn && nextBtn) {
      startBtn.style.display = isRunning ? "none" : "inline-block";
      nextBtn.style.display = isRunning ? "inline-block" : "none";
    }
  }

  if (startBtn) {
    startBtn.addEventListener("click", function () {
      localStorage.setItem("trackerCurrentStep", "0");
      localStorage.setItem("trackerRunning", "yes");
      updateTrackerDisplay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      let currentStep = Number(localStorage.getItem("trackerCurrentStep")) || 0;

      if (currentStep < trackerSteps.length - 1) {
        currentStep = currentStep + 1;
        localStorage.setItem("trackerCurrentStep", String(currentStep));
      } else {
        // Last step reached
        alert("Order marked as arrived. Tracker reset for the next order.");
        localStorage.setItem("trackerCurrentStep", "0");
        localStorage.setItem("trackerRunning", "no");
      }

      updateTrackerDisplay();
    });
  }

  // 3. ALL RESERVATIONS TABLE
  const tableBody = document.getElementById("reservations-table-body");
  const noReservationsMessage = document.getElementById("no-reservations-message");
  const reservationsTable = document.getElementById("reservations-table");
  const clearBtn = document.getElementById("clear-reservations-btn");

  function renderReservations() {
    const savedReservations = JSON.parse(localStorage.getItem("allReservations")) || [];

    // If there's nothing saved yet, show a friendly message instead
    // of an empty table.
    if (savedReservations.length === 0) {
      reservationsTable.style.display = "none";
      noReservationsMessage.style.display = "block";
      return;
    }

    reservationsTable.style.display = "table";
    noReservationsMessage.style.display = "none";

    // Build one <tr> per saved reservation.
    let rowsHTML = "";

    savedReservations.forEach(function (reservation) {
      rowsHTML +=
        "<tr>" +
          "<td>" + reservation.submittedAt + "</td>" +
          "<td>" + reservation.name + "</td>" +
          "<td>" + reservation.email + "</td>" +
          "<td>" + reservation.reservationType + "</td>" +
          "<td>" + reservation.foodChoice + "</td>" +
          "<td>" + reservation.date + "</td>" +
          "<td>" + reservation.time + "</td>" +
          "<td>" + reservation.guests + "</td>" +
        "</tr>";
    });

    tableBody.innerHTML = rowsHTML;
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", function () {
      const confirmClear = confirm("Delete all saved reservations? This cannot be undone.");
      if (confirmClear) {
        localStorage.removeItem("allReservations");
        renderReservations();
      }
    });
  }

});
