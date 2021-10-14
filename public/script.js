const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

let ticketPrice = +movieSelect.value;
const selectedDetails = {
  selectedSeats: [],
  movieIndex: 0,
};

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
  selectedDetails.movieIndex = movieIndex;
}

// Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
  selectedDetails.selectedSeats = seatsIndex;
  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;

  setMovieData(movieSelect.selectedIndex, movieSelect.value);
}
var movieList = [];
// Get data from localstorage and populate UI
const populateUI = () => {
  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
  if (movieList.length === 0)
    fetch("http://localhost:3000/getMovieList")
      .then((result) => result.json())
      .then((data) => {
        movieList = data;
        console.log(movieSelect.movieIndex);
        let movie = movieList[selectedMovieIndex || 0];
        const selectedSeats = movie.selectedSeats;
        if (selectedSeats !== null && selectedSeats.length > 0) {
          seats.forEach((seat, index) => {
            console.log(seat.classList);
            if (selectedSeats.indexOf(index) > -1) {
              seat.classList.add("occupied");
            }
          });
        }
      });
  else {
    let movie = movieList[selectedMovieIndex || 0];
    const selectedSeats = movie.selectedSeats;
    seats.forEach((seat, index) => {
      seat.classList.remove("occupied");
      if (
        selectedSeats !== null &&
        selectedSeats.length > 0 &&
        selectedSeats.indexOf(index) > -1
      ) {
        seat.classList.add("occupied");
      }
    });
  }
};

// Movie select event
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;

  setMovieData(e.target.selectedIndex, e.target.value);
  populateUI();
  updateSelectedCount();
});

// Seat click event
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");

    updateSelectedCount();
  }
});

// Initial count and total set
populateUI();
updateSelectedCount();
