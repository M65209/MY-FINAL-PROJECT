const header = document.getElementById('site-header');

const headerHTML =`
<header class="header">
    <div class="header-inner">
      <a href="index.html" class="logo">Bella Cucina</a>
      <button class="menu-btn">☰</button>
      <nav class="nav">
        <a href="index.html" class="active">Home</a>
        <a href="pages/menu.html">Menu</a>
        <a href="pages/reservations.html">Reservations</a>
        <a href="pages/gallery.html">Gallery</a>
        <a href="pages/contact.html">Contact</a>
        <a href="pages/reservations.html" class="btn">Book a Table</a>
      </nav>
    </div>
  </header>
  `;
header.innerHTML = headerHTML;