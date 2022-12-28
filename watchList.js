let watchListData = JSON.parse(localStorage.getItem("card"));
//
function removeToWatchList(e) {
  const target = e.closest("div.card");

  const newList = watchListData.filter((item) => item !== target.dataset.id);

  localStorage.setItem("card", JSON.stringify(newList));
  watchListData = JSON.parse(localStorage.getItem("card"));
  if (!newList.length) {
    localStorage.removeItem("card");
    watchListData = null;
  }

  render(watchListData);
}
//
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
                id="movie-btn-${movie.imdbID}"><button onclick="removeToWatchList(this)">Remove List</button></span
              >
            </p>
            <p>
              
            </p>
          </div>
        </div>
    `;
}
//
async function secondApi(dataId) {
  const res = await fetch(
    `https://www.omdbapi.com/?i=${dataId}&&apikey=31e0948`
  );
  const data = await res.json();
  return data;
}
function render(listData) {
  if (listData) {
    document.getElementById("container").innerHTML = " ";

    listData.forEach(async (id) => {
      const data = await secondApi(id);

      document.getElementById("container").innerHTML += movieRender(data);
      // html += movie;
    });
  } else {
    document.getElementById("container").innerHTML = `
     <div class="empty">
          <h4>Your watchlist is looking a little empty...</h4>
          <h4>
            <a href="index.html"><i class="fas fa-plus"></i></a>Let’s add some
            movies!
          </h4>
        </div>
    `;
  }
}

render(watchListData);
