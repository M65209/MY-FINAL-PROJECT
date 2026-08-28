/**
 * menu.js
 * --------
 * Builds the Menu page tabs (Starters / Main Course / Desserts / ...)
 * and menu cards automatically from the data in js/data.js.
 *
 * WHY: This is what makes the site "scalable". A new restaurant just
 * edits the list in js/data.js (categories + dishes). This file will
 * automatically create the right number of tabs and the right cards,
 * so nobody has to copy/paste HTML by hand.
 *
 * WHAT IT DOES ON CLICK:
 * - Click "All"          -> show every category
 * - Click "Starters"     -> show ONLY the Starters section
 * - Click "Main Course"  -> show ONLY the Main Course section
 * - Click "Desserts"     -> show ONLY the Desserts section
 *
 * Safe to include on other pages: it does nothing if the menu
 * container is not found on the page.
 */

document.addEventListener("DOMContentLoaded", function () {

  // Where the tabs and the menu sections will be placed
  const tabsContainer = document.getElementById("menu-tabs");
  const menuContainer = document.getElementById("menu-container");

  // If this page has no menu on it, stop here (nothing to do)
  if (!tabsContainer || !menuContainer) {
    return;
  }

  // If data.js was not loaded, stop here so we don't crash
  if (!window.siteData || !window.siteData.fullMenu) {
    console.warn("Menu data not found. Make sure js/data.js is loaded before js/menu.js");
    return;
  }

  const categories = window.siteData.fullMenu;

  // 1. BUILD ONE MENU CARD (as an HTML string)
  function buildItemCard(item) {
    return (
      '<div class="menu-item">' +
        '<img src="' + item.image + '" alt="' + item.name + '">' +
        '<div class="menu-item-body">' +
          '<div class="menu-item-header">' +
            '<h3>' + item.name + '</h3>' +
            '<span class="menu-item-price">' + item.price + '</span>' +
          '</div>' +
          '<p>' + item.description + '</p>' +
          '<button class="preview-3d-btn" data-img="' + item.image + '" data-title="' + item.name + '">View 3D / AR</button>' +
        '</div>' +
      '</div>'
    );
  }

  // 2. BUILD THE TABS ("All" + one per category)
  let tabsHTML = '<a href="#" class="active" data-category="all">All</a>';

  categories.forEach(function (category) {
    tabsHTML += '<a href="#' + category.id + '" data-category="' + category.id + '">' + category.label + '</a>';
  });

  tabsContainer.innerHTML = tabsHTML;

  // 3. BUILD THE MENU SECTIONS (one per category)
  let menuHTML = "";

  categories.forEach(function (category) {
    let itemsHTML = "";

    category.items.forEach(function (item) {
      itemsHTML += buildItemCard(item);
    });

    menuHTML +=
      '<div class="menu-category" id="' + category.id + '" data-category="' + category.id + '">' +
        '<h2>' + category.label + '</h2>' +
        '<div class="menu-grid">' + itemsHTML + '</div>' +
      '</div>';
  });

  menuContainer.innerHTML = menuHTML;

  // 4. FILTERING: show only the clicked category
  const tabs = tabsContainer.querySelectorAll("a");
  const sections = menuContainer.querySelectorAll(".menu-category");

  function showCategory(categoryId) {
    sections.forEach(function (section) {
      if (categoryId === "all" || section.getAttribute("data-category") === categoryId) {
        section.style.display = "block";
      } else {
        section.style.display = "none";
      }
    });
  }

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function (event) {
      // Stop the page from jumping to the #id anchor
      event.preventDefault();

      const categoryId = tab.getAttribute("data-category");

      // Highlight only the clicked tab
      tabs.forEach(function (t) {
        t.classList.remove("active");
      });
      tab.classList.add("active");

      // Show only the matching section (or everything for "All")
      showCategory(categoryId);
    });
  });

  // Start on "All" so the customer sees the full menu first
  showCategory("all");

});
