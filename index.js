// element selection
const btnSearch=documnet.getElementById("search-btn");
const 
// end of element selection
function addToWatchList(e) {
  const cardData = e.closest(".card").innerHTML;
  localStorage.setItem("card", JSON.stringify({ cardData }));
  console.log(cardData);
}
// https://www.omdbapi.com/?s=Batman&&apikey=31e0948

async function apiCall(movie) {
  const res = await fetch(
    `https://www.omdbapi.com/?s=${movie}&&apikey=31e0948`
  );
  const data = await res.json();
  console.log(data);
}
apiCall("ip man");
