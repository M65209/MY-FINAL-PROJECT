/**
 * spaces.js
 * reservableSpaces list in js/data.js. This file takes care of
 * building the matching dropdown option AND the matching card,
 * so nobody has to copy/paste HTML by hand.
 *
 * Safe to include on other pages: it does nothing if the containers
 * it needs are not found on the page.
 */

document.addEventListener("DOMContentLoaded", function () {

  const typeSelect = document.getElementById("reservation-type");
  const cardsContainer = document.getElementById("space-cards-container");

  // If this page doesn't have these elements, there's nothing to do.
  if (!typeSelect || !cardsContainer) {
    return;
  }

  // If data.js wasn't loaded, stop here so we don't crash.
  if (!window.siteData || !window.siteData.reservableSpaces) {
    console.warn("Spaces data not found. Make sure js/data.js is loaded before js/spaces.js");
    return;
  }

  const spaces = window.siteData.reservableSpaces;

  // 1. ADD ONE <option> TO THE DROPDOWN PER SPACE
  spaces.forEach(function (space) {
    const option = document.createElement("option");
    option.value = space.value;
    option.textContent = space.label;
    typeSelect.appendChild(option);
  });


  // 2. BUILD ONE SPACE CARD (as an HTML string)

  function buildSpaceCard(space) {
    return (
      '<div class="space-card">' +
        '<img src="' + space.image + '" alt="' + space.label + '">' +
        '<div class="space-card-body">' +
          '<h3>' + space.label + '</h3>' +
          '<p>' + space.description + '</p>' +
          '<button type="button" class="btn btn-outline space-select-btn" data-reservation-type="' + space.value + '">' +
            'Reserve This' +
          '</button>' +
        '</div>' +
      '</div>'
    );
  }


  // 3. BUILD ALL THE CARDS AND PLACE THEM ON THE PAGE

  let cardsHTML = "";

  spaces.forEach(function (space) {
    cardsHTML += buildSpaceCard(space);
  });

  cardsContainer.innerHTML = cardsHTML;

  // 4. "RESERVE THIS" BUTTONS
  // When clicked, these set the dropdown above to match the card,
  // then smoothly scroll the user back up to the form.
  const spaceButtons = cardsContainer.querySelectorAll(".space-select-btn");

  spaceButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const chosenType = button.getAttribute("data-reservation-type");

      typeSelect.value = chosenType;

      typeSelect.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });

});
