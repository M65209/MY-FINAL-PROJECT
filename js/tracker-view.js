/**
 * tracker-view.js
 * ----------------
 * Shows customers a READ-ONLY view of the Time-to-Table Tracker on
 * the Menu page. Customers can see the current stage and the
 * estimated time, but they cannot control it -- only staff can,
 * from the Admin Dashboard (pages/admin.html, js/admin.js)
 * HOW IT STAYS IN SYNC:
 * The Admin Dashboard saves the current stage in localStorage
 * under "trackerCurrentStep" whenever staff clicks "Next Stage".
 * This file just reads that value and displays it here. It also
 * checks again every few seconds, so if a customer already has
 * this page open, it updates itself without needing a refresh.
 */

document.addEventListener("DOMContentLoaded", function () {

  const trackerSteps = document.querySelectorAll(".tracker-section .tracker-step");
  const trackerTime = document.getElementById("tracker-time");

  // If this page has no tracker on it, stop here.
  if (trackerSteps.length === 0 || !trackerTime) {
    return;
  }

  // Same estimated times as the Admin Dashboard uses, so the
  // numbers shown to customers always match what staff set.
  const stepTimes = [0, 5, 12, 18, 22];

  function updateTrackerDisplay() {
    const currentStep = Number(localStorage.getItem("trackerCurrentStep")) || 0;

    trackerSteps.forEach(function (step, index) {
      step.classList.remove("active", "done");

      if (index < currentStep) {
        step.classList.add("done");      // already finished
      } else if (index === currentStep) {
        step.classList.add("active");    // current step
      }
    });

    trackerTime.textContent = stepTimes[currentStep] + " min";
  }

  // Show the current status as soon as the page loads...
  updateTrackerDisplay();

  // ...and check again every 3 seconds, in case staff advances the
  // tracker from the Admin Dashboard while this page stays open.
  setInterval(updateTrackerDisplay, 3000);

});
