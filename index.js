// import { apiCall, addToWatchList } from "./utlis.js";
// element selection
const btnSearch = document.getElementById("search-btn");
const inputValue = document.getElementById("input-value");

// https://www.omdbapi.com/?s=Batman&&apikey=31e0948
// https://www.omdbapi.com/?i=tt0372784&&apikey=31e0948

// function section

let watchList = [];

async function apiCall(movie) {
  try {
    const res = await fetch(
      `https://www.omdbapi.com/?s=${movie}&&apikey=31e0948`
    );
    const data = await res.json();

    const movieData = data.Search;
    let gify = true;
    movieData.forEach(async (movie) => {
      const res = await fetch(
        `https://www.omdbapi.com/?i=${movie.imdbID}&&apikey=31e0948`
      );
      if (gify) {
        document.getElementById("container").innerHTML = " ";
        gify = false;
      }
      const data = await res.json();

      document.getElementById("container").innerHTML += movieRender(data);
      console.log(data);
    });
  } catch (error) {
    console.error(error);
    document.getElementById("container").innerHTML = `
      <div class="empty">
                          
         <h4>
            Unable to find what you’re looking<br />
            for. Please try another search.
          </h4>
        </div>
    `;
  }
}
function addToWatchList(e) {
  const cardData = e.closest("div.card");
  const savedList = JSON.parse(localStorage.getItem("card"));
  if (savedList) {
    watchList = [...savedList];
  }

  watchList.push(cardData.dataset.id);

  localStorage.setItem("card", JSON.stringify(watchList));
  document.getElementById(
    `movie-btn-${cardData.dataset.id}`
  ).innerHTML = `<button disabled onclick="removeToWatchList(this)">Added</button>`;
}

function movieRender(movie) {
  return `
  
     <div class="card" data-id=${movie.imdbID}>
          <img src="${movie.Poster}" />
          <div class="card-text">
            <h2>
              ${movie.Title}
              <span>${movie.imdbRating}</span>
              <span>${movie.imdbRating}</span>
            </h2>
            <p>
              <span>${movie.Runtime}</span>
              <span>${movie.Genre}</span>
              <span
                id="movie-btn-${movie.imdbID}"><button onclick="addToWatchList(this)">Watchlist</button></span
              >
            </p>
            <p>
              
            </p>
          </div>
        </div>
    `;
}

// end of function section

// event section
btnSearch.addEventListener("click", () => {
  if (inputValue.value) {
    document.getElementById("container").innerHTML =
      "<div class='empty'><img src='./Fidget-spinner.gif' class='gify'/></div>";
    const movieList = apiCall(inputValue.value);
    console.log(movieList);

    // inputValue.value = "";
  }
});
// end of event section
