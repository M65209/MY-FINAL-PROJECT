/**
 * layout.js
 * ----------
 * 1. Protects the site: user must log in before seeing other pages.
 * 2. Builds the header and footer on every page.
 * 3. Shows "Logout" when the user is logged in.
 */

// PATH HELPERS (used by header, footer and auth)
const currentPath = window.location.pathname;
const isInPagesFolder = currentPath.includes("/pages/");
const rootPath = isInPagesFolder ? "../" : "";
const pagesPath = isInPagesFolder ? "" : "pages/";

// Name of the current file (e.g. "index.html", "menu.html", "login.html")
const currentFile = currentPath.split("/").pop() || "index.html";

// 1. SIMPLE LOGIN PROTECTION
// Pages that anyone can open without logging in
const openPages = ["login.html", "admin.html"];

// Check if the user is logged in (login.js saves these two values)
const isLoggedIn =
  sessionStorage.getItem("loggedInName") &&
  sessionStorage.getItem("loggedInEmail");

// If this is NOT an open page AND the user is NOT logged in → send them to login
if (openPages.indexOf(currentFile) === -1 && !isLoggedIn) {
  // Build the correct path to the login page
  const loginUrl = pagesPath + "login.html";
  window.location.href = loginUrl;
}

// 2. NAV LINKS
const navLinks = [
  { label: "Home", href: rootPath + "index.html" },
  { label: "Menu", href: pagesPath + "menu.html" },
  { label: "Reservations", href: pagesPath + "reservations.html" },
  { label: "Gallery", href: pagesPath + "gallery.html" },
  { label: "Contact", href: pagesPath + "contact.html" }
];

// Add Login or Logout depending on whether the user is logged in
if (isLoggedIn) {
  navLinks.push({ label: "Logout", href: "#", isLogout: true });
} else {
  navLinks.push({ label: "Login", href: pagesPath + "login.html" });
}

// Always keep the "Book a Table" button
navLinks.push({
  label: "Book a Table",
  href: pagesPath + "reservations.html",
  isButton: true
});

// Footer "Explore" links
const footerExploreLinks = [
  { label: "About Us", href: pagesPath + "about.html" },
  { label: "Menu", href: pagesPath + "menu.html" },
  { label: "Gallery", href: pagesPath + "gallery.html" },
  { label: "Reservations", href: pagesPath + "reservations.html" }
];

function isActiveLink(href) {
  const linkFile = href.split("/").pop();
  return linkFile === currentFile;
}

function createHeader() {
  let navHTML = "";

  navLinks.forEach(function (link) {
    const activeClass = isActiveLink(link.href) ? " active" : "";
    const btnClass = link.isButton ? " btn" : "";
    // Logout link gets a special id so we can attach a click event later
    const extraAttr = link.isLogout ? ' id="logout-link"' : "";

    navHTML +=
      '<a href="' +
      link.href +
      '" class="' +
      btnClass +
      activeClass +
      '"' +
      extraAttr +
      ">" +
      link.label +
      "</a>";
  });

  return (
    '<header class="header">' +
    '<div class="header-inner">' +
    '<a href="' +
    rootPath +
    'index.html" class="logo">Bella-cucina</a>' +
    '<button class="menu-btn" aria-label="Open menu">☰</button>' +
    '<nav class="nav">' +
    navHTML +
    "</nav>" +
    "</div>" +
    "</header>"
  );
}

function createFooter() {
  let exploreHTML = "";
  footerExploreLinks.forEach(function (link) {
    exploreHTML += '<a href="' + link.href + '">' + link.label + "</a>";
  });

  return (
    '<footer class="footer">' +
    '<div class="footer-inner">' +
    '<div class="footer-col">' +
    "<h4>Restaurant Lelebotte</h4>" +
    "<p>Crafting culinary narratives since 2012. Fine dining redefined through precision and passion.</p>" +
    "</div>" +
    '<div class="footer-col">' +
    "<h4>Explore</h4>" +
    exploreHTML +
    "</div>" +
    '<div class="footer-col">' +
    "<h4>Connect</h4>" +
    '<a href="#">Instagram</a>' +
    '<a href="#">Facebook</a>' +
    '<a href="#">Newsletter</a>' +
    "</div>" +
    '<div class="footer-col">' +
    "<h4>Legal</h4>" +
    '<a href="#">Privacy Policy</a>' +
    '<a href="#">Terms of Service</a>' +
    "</div>" +
    "</div>" +
    '<div class="footer-bottom">' +
    "&copy; 2026 Bella-cucina. All rights reserved. &middot; " +
    '<a href="' +
    pagesPath +
    'admin.html">Staff Login</a>' +
    "</div>" +
    "</footer>"
  );
}

function setupMobileMenu() {
  const menuBtn = document.querySelector(".menu-btn");
  const nav = document.querySelector(".nav");

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () {
      nav.classList.toggle("show");
    });
  }
}

function setupLogout() {
  const logoutLink = document.getElementById("logout-link");
  if (logoutLink) {
    logoutLink.addEventListener("click", function (event) {
      event.preventDefault();
      // Clear the login info
      sessionStorage.removeItem("loggedInName");
      sessionStorage.removeItem("loggedInEmail");
      // Send the user back to the login page
      window.location.href = pagesPath + "login.html";
    });
  }
}

function renderLayout() {
  const headerEl = document.getElementById("site-header");
  const footerEl = document.getElementById("site-footer");

  if (headerEl) {
    headerEl.innerHTML = createHeader();
  }

  if (footerEl) {
    footerEl.innerHTML = createFooter();
  }

  setupMobileMenu();
  setupLogout();
}

document.addEventListener("DOMContentLoaded", function () {
  renderLayout();
});
