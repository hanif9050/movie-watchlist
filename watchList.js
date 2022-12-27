let watchListData = JSON.parse(localStorage.getItem("card"));
//
function removeToWatchList(e) {
  const target = e.closest("div.card");
  console.log(watchListData, target.dataset.id);
  const newList = watchListData.filter((item) => item !== target.dataset.id);
  localStorage.setItem("card", JSON.stringify(newList));
  watchListData = JSON.parse(localStorage.getItem("card"));
  console.log(newList);
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

    console.log(listData);
    listData.forEach(async (id) => {
      console.log(id);
      const data = await secondApi(id);
      console.log(data);
      document.getElementById("container").innerHTML += movieRender(data);
      // html += movie;
    });
  }
}
render(watchListData);
