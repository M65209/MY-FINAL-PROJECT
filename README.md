

Live demo: https://resto-rant.netlify.app/

## Project structure

```
Final Project/
├── index.html              ← Home page
├── pages/
│   ├── about.html
│   ├── menu.html
│   ├── reservations.html
│   ├── gallery.html
│   └── contact.html
├── js/
│   ├── layout.js           ← Shared header + footer + mobile menu
│   ├── main.js             ← Reservation form + menu tabs
│   ├── features.js         ← Blind box, tracker, 3D modal (menu page)
│   └── data.js             ← Optional central data (menu items, specials)
├── style/
│   ├── reset.css
│   ├── general.css
│   └── responsive.css
└── images/
```

## How the scalable JS works (beginner friendly)

1. **One header / footer for the whole site**  
   Every page has empty placeholders:
   ```html
   <div id="site-header"></div>
   ...
   <div id="site-footer"></div>
   ```
   `layout.js` detects whether you are in the root or in `/pages/` and injects the correct links automatically.

2. **Safe scripts**  
   All JS checks if an element exists before using it (`if (form) { ... }`).  
   You can include the same scripts on every page without errors.

3. **Easy to extend**
   - Add a new page → copy any existing page, change the content, keep the two placeholders and the script tags.
   - Change a nav link → edit the `navLinks` array in `layout.js` only.
   - Add a mystery dish → edit the `mysteryDishes` array in `features.js`.
   - Later you can render the whole menu from `data.js` if you want.

## Scripts to include

**Most pages:**
```html
<script src="../js/layout.js"></script>
<script src="../js/main.js"></script>
```
(on index.html use `js/` instead of `../js/`)

**Menu page (extra features):**
```html
<script src="../js/layout.js"></script>
<script src="../js/main.js"></script>
<script src="../js/features.js"></script>
```

## Notes

- Pure vanilla JavaScript – no frameworks, easy to understand.
- Comments explain every important step.
- Mobile menu, form validation, and interactive features all stay simple.
