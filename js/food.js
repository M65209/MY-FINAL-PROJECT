/**
 * food.js
 * Builds the "Pre-order a Dish" dropdown options AND the food image
 * cards on the Reservations page automatically, using the list in
 * js/data.js (window.siteData.reservableFood).
 * WHY: This works exactly like js/spaces.js. To add a new dish that
 * guests can pre-order, someone only has to add one object to the
 * reservableFood list in js/data.js. This file builds the matching
 * dropdown option AND the matching image card automatically, so
 * nobody has to copy/paste HTML by hand.
 *
 * Safe to include on other pages: it does nothing if the containers
 * it needs are not found on the page.
 */

document.addEventListener("DOMContentLoaded", function () {

  const foodSelect = document.getElementById("food-choice");
  const cardsContainer = document.getElementById("food-cards-container");

  // If this page doesn't have these elements, there's nothing to do.
  if (!foodSelect || !cardsContainer) {
    return;
  }

  // If data.js wasn't loaded, stop here so we don't crash.
  if (!window.siteData || !window.siteData.reservableFood) {
    console.warn("Food data not found. Make sure js/data.js is loaded before js/food.js");
    return;
  }

  const dishes = window.siteData.reservableFood;

  // 1. ADD ONE <option> TO THE DROPDOWN PER DISH
  dishes.forEach(function (dish) {
    const option = document.createElement("option");
    option.value = dish.value;
    option.textContent = dish.label + " - " + dish.price;
    foodSelect.appendChild(option);
  });

  // 2. BUILD ONE FOOD CARD (as an HTML string)
  function buildFoodCard(dish) {
    return (
      '<div class="food-card">' +
        '<img src="' + dish.image + '" alt="' + dish.label + '">' +
        '<div class="food-card-body">' +
          '<div class="food-card-header">' +
            '<h3>' + dish.label + '</h3>' +
            '<span class="food-card-price">' + dish.price + '</span>' +
          '</div>' +
          '<p>' + dish.description + '</p>' +
          '<button type="button" class="btn btn-outline food-select-btn" data-food="' + dish.value + '">' +
            'Add to Reservation' +
          '</button>' +
        '</div>' +
      '</div>'
    );
  }

  // 3. BUILD ALL THE CARDS AND PLACE THEM ON THE PAGE
  let cardsHTML = "";

  dishes.forEach(function (dish) {
    cardsHTML += buildFoodCard(dish);
  });

  cardsContainer.innerHTML = cardsHTML;

  // 4. "ADD TO RESERVATION" BUTTONS
  // When clicked, these set the dropdown above to match the card,
  // then smoothly scroll the user back up to the form.
  const foodButtons = cardsContainer.querySelectorAll(".food-select-btn");

  foodButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const chosenFood = button.getAttribute("data-food");

      foodSelect.value = chosenFood;

      foodSelect.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });

});
