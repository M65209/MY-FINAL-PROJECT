
const chefSpecials = [
  {
    name: "Achu",
    price: "15,000 FCFA",
    description: "Pounded cocoyam served with rich yellow soup, assorted meat and fish.",
    image: "images/achu.jpg",
    alt: "Achu"
  },
  {
    name: "Ekwang",
    price: "15,000 FCFA",
    description: "Grated cocoyam wrapped in cocoyam leaves, slow-cooked with palm oil and spices.",
    image: "images/Ekwang.jpg",
    alt: "Ekwang"
  },
  {
    name: "Pasta",
    price: "5,000 FCFA",
    description: "Delicious Pasta with a variety of sauces and toppings.",
    image: "images/pasta.jpg",
    alt: "Pasta"
  }
];

const fullMenu = [
  {
    id: "starters",
    label: "Starters",
    items: [
      {
        name: "Achu",
        price: "15,000 FCFA",
        description: "Pounded cocoyam served with rich yellow soup, assorted meat and fish.",
        image: "../images/Achu.jpg"
      },
      {
        name: "Ekwang",
        price: "15,000 FCFA",
        description: "Grated cocoyam wrapped in cocoyam leaves, slow-cooked with palm oil and spices.",
        image: "../images/Ekwang.jpg"
      },
      {
        name: "Eru",
        price: "5,000 FCFA",
        description: "Shredded eru leaves cooked with waterleaf, palm oil and assorted meat.",
        image: "../images/Eru.jpg"
      }
    ]
  },
  {
    id: "mains",
    label: "Main Course",
    items: [
      {
        name: "Ndole",
        price: "10,000 FCFA",
        description: "Creamy bitterleaf and groundnut stew with shrimp, served with ripe plantains.",
        image: "../images/Ndol.jpg "
      },
      {
        name: "Poulet dg",
        price: "5,000 FCFA",
        description: "Spicy stir-fried chicken with fried plantains, peppers and fresh vegetables.",
        image: "../images/poulet dg .jpg"
      },
      {
        name: "Koki",
        price: "5,000 FCFA",
        description: "Steamed black-eyed pea cake wrapped in banana leaves, spiced and slow-cooked.",
        image: "../images/koki.png"
      }
    ]
  },
  {
    id: "desserts",
    label: "Desserts",
    items: [
      {
        name: "Molten Dark Chocolate",
        price: "8,500 FCFA",
        description: "70% cacao center with warm chocolate and golden vanilla ice cream.",
        image: "../images/dessert1.jpg"
      },
      {
        name: "Deconstructed Lemon Tart",
        price: "8,000 FCFA",
        description: "Zesty lemon curd, toasted meringue and buttery shortbread crumbs.",
        image: "../images/dessert2.jpg"
      },
      {
        name: "Classic Creme Brulee",
        price: "7,500 FCFA",
        description: "Velvety vanilla bean custard with a crisp caramelized sugar crust.",
        image: "../images/food4.jpg"
      }
    ]
  }
];

/**
 * reservableSpaces
 * Every space a guest can book, besides a normal dining table.
 * The Reservations page builds its dropdown AND its image cards
 * automatically from this list (see js/spaces.js).
 *   value       -> must be unique, used internally (no spaces)
 *   label       -> shown in the dropdown menu
 *   image       -> path to the photo, relative to /pages/
 *   description -> short text shown on the card
 */
const reservableSpaces = [
  {
    value: "chefs-table",
    label: "Chef's Table Experience",
    image: "../images/chef.jpg",
    description: "Sit right in the kitchen and watch our chefs prepare a personalized tasting menu just for you."
  },
  {
    value: "private-room",
    label: "Private Event Space",
    image: "../images/interior3.jpg",
    description: "Perfect for birthdays, anniversaries, or business gatherings, with room for up to 30 guests."
  },
  {
    value: "wine-cellar",
    label: "Wine Cellar Tasting Room",
    image: "../images/wine.jpg",
    description: "An intimate, candlelit space for guided wine tastings paired with small bites."
  },
  {
    value: "terrace",
    label: "Rooftop Terrace",
    image: "../images/interior1.jpg",
    description: "Open-air seating with skyline views, ideal for relaxed evenings and casual get-togethers."
  }
];

/**
 * reservableFood
 * Dishes guests can pre-order along with their reservation. The
 * Reservations page builds its dropdown AND its image cards
 * automatically from this list (see js/food.js)
 *   value       -> must be unique, used internally (no spaces)
 *   label       -> shown in the dropdown menu
 *   price       -> shown on the card
 *   image       -> path to the photo, relative to /pages/
 *   description -> short text shown on the card
 */
const reservableFood = [
  {
    value: "Ndol",
    label: "Ndol",
    price: "5,000 FCFA",
    image: "../images/Ndol.jpg",
    description: "A traditional Cameroonian dish made with spinach and beans."
  },
  {
    value: "poulet dg",
    label: "Poulet dg",
    price: "5,000 FCFA",
    image: "../images/poulet dg .jpg",
    description: "Spicy stir-fried chicken with fried plantains."},
  {
    value: "Pasta",
    label: "Pasta",
    price: "5,000 FCFA",
    image: "../images/pasta.jpg",
    description: "Fresh handmade pasta, medley of forest mushrooms, garlic, thyme and cream."
  },
  {
    value: "scallops",
    label: "Seared Scallops",
    price: "21,000 FCFA",
    image: "../images/scallops.jpg",
    description: "Pan-seared scallops with a light citrus butter and crisp seasonal greens."
  },
  {
    value: "chocolate-dessert",
    label: "Molten Dark Chocolate",
    price: "8,500 FCFA",
    image: "../images/dessert1.jpg",
    description: "70% cacao center with warm chocolate and golden vanilla ice cream."
  },
  {
    value: "lemon-tart",
    label: "Deconstructed Lemon Tart",
    price: "8,000 FCFA",
    image: "../images/dessert2.jpg",
    description: "Zesty lemon curd, toasted meringue and buttery shortbread crumbs."
  }
];

window.siteData = {
  chefSpecials: chefSpecials,
  fullMenu: fullMenu,
  reservableSpaces: reservableSpaces,
  reservableFood: reservableFood
};
