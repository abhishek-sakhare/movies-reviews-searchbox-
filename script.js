new Splide('.splide', {
      type      : 'loop',
      perPage   : 3,
      perMove   : 3,
      autoplay  : true,
      interval  : 5000,
      pauseOnHover: false,
      pauseOnFocus: false,
      arrows    : false,
      pagination: false,
}).mount();


//for fetching posters


const box = document.getElementById("content-box");
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const resultsContainer = document.getElementById("results");
const reviewContainer = document.getElementById("review");
const ratingContainer = document.getElementById("rating");


searchBtn.addEventListener("click", () => {
  console.log("Button is clicked");
})

const API_KEY = "59195bc873528a58664f2c29f7cfe9e7";
const BASE_IMG_URL = "https://image.tmdb.org/t/p/w500";

searchBtn.addEventListener("click", async () => {

  box.style.display = "flex";

  const query = searchInput.value.trim();
  if (!query) return;

  const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
  const data = await res.json();
  const movies = data.results;

  resultsContainer.innerHTML = ""; // Clear previous results

  if (movies.length === 0) {
    resultsContainer.innerHTML = "<p style='color:white'>No movies found</p>";
    return;
  }

  movies.slice(0, 6).forEach(movie => {
    if (movie.poster_path) {
      const img = document.createElement("img");
      img.src = `${BASE_IMG_URL}${movie.poster_path}`;
      img.alt = movie.title;
      resultsContainer.appendChild(img);
    }
  });

  console.log(movies);


  const firstMovie = movies[0];
  const movieID = firstMovie.id;

  const reviewRes = await fetch(`https://api.themoviedb.org/3/movie/${movieID}/reviews?api_key=${API_KEY}`);
  const reviewData = await reviewRes.json();
  const reviews = reviewData.results;

  reviewContainer.innerHTML = "";

  if (reviews.length === 0) {
    reviewContainer.innerHTML = "<p style='color:white'>No reviews found</p>";
    return;
  }
  else {
    reviewContainer.innerHTML = "<h1 style='text-align:center;color:white'>The Movie Reviews are :- </h1><br>"
    reviews.slice(0, 3).forEach(review => {
      const reviewDiv = document.createElement("div");
      reviewDiv.style.color = "white";
      reviewDiv.style.padding = "4rem";
      reviewDiv.innerHTML = `
        
        <p><strong>Author:</strong> ${review.author}</p>
        <p>${review.content.substring(0, 300)}...</p>
        <hr />
      `;
      reviewContainer.appendChild(reviewDiv);
    });
  }

  const ratingRes = await fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${API_KEY}`);
  const ratingData = await ratingRes.json();
  

  ratingContainer.innerHTML = "";

  if(!ratingData || ratingData.vote_average === 0) {
    ratingContainer.innerHTML = "<p style='color:white'>No Ratings Found</p>";
    return;
  }

  else {
    const ratingDiv = document.createElement("div");
    ratingDiv.style.color = "white";
    ratingDiv.style.padding = "4rem";
    ratingDiv.innerHTML = `
      <h3><p><strong>The Overall Rating of the movie is </strong> ${ratingData.vote_average}/10 </p></h3>
      </hr>
    `;
    ratingContainer.appendChild(ratingDiv);
    
  }
});