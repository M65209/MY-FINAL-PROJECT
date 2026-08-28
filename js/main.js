
document.addEventListener("DOMContentLoaded", function () {

  const form = document.querySelector(".reserve-form form");

  if (form) {
    form.addEventListener("submit", function (event) {
      
      event.preventDefault();

      const reservationTypeSelect = document.getElementById("reservation-type");
      const reservationType = reservationTypeSelect
        ? reservationTypeSelect.options[reservationTypeSelect.selectedIndex].text
        : "Dining Table";
      const foodSelect = document.getElementById("food-choice");
      const foodChoice = foodSelect
        ? foodSelect.options[foodSelect.selectedIndex].text
        : "No dish selected";
      const date = document.getElementById("date").value.trim();
      const time = document.getElementById("time").value.trim();
      const guests = document.getElementById("guests").value;
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();

      if (name === "" || email === "" || date === "") {
        alert("Please fill in Date, Name and Email.");
        return; 
      }

      // ===== Save this reservation so the Admin Dashboard can see it =====
      // We keep a simple list of all reservations in localStorage
      // (this is what makes it "recorded" -- it stays saved even
      // after the browser is closed and reopened, unlike
      // sessionStorage). Each reservation is just a plain object.
      const newReservation = {
        submittedAt: new Date().toLocaleString(),
        reservationType: reservationType,
        foodChoice: foodChoice,
        name: name,
        email: email,
        date: date,
        time: time,
        guests: guests
      };

      // Get the existing list (or start a new empty one), add this
      // reservation to it, then save the updated list back.
      const savedReservations = JSON.parse(localStorage.getItem("allReservations")) || [];
      savedReservations.push(newReservation);
      localStorage.setItem("allReservations", JSON.stringify(savedReservations));

      const subject = "New Reservation - Bella-cucina";
      const body =
        "NEW RESERVATION REQUEST%0A%0A" +
        "Reserving: " + reservationType + "%0A" +
        "Food Pre-order: " + foodChoice + "%0A" +
        "Name: " + name + "%0A" +
        "Email: " + email + "%0A" +
        "Date: " + date + "%0A" +
        "Time: " + time + "%0A" +
        "Number of Guests: " + guests + "%0A%0A" +
        "Please confirm this reservation.";

      const mailtoLink =
        "mailto:awahmarion62@gmail.com?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        body;

      alert(
        "Thank you " +
          name +
          "! Your reservation details are ready to send. Please click Send in your email app so we can receive it."
      );

      // Open the visitor's email app with everything pre-filled
      window.location.href = mailtoLink;

      form.reset();
    });
  }

  // Note: the "Reserve This" buttons on the Other Spaces cards are
  // now built and handled by js/spaces.js, since those cards are
  // generated dynamically from js/data.js.

});
