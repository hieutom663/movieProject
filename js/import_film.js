/*banner slider*/
fetch("../assets/all_movie.json")
  .then(res => res.json())
  .then(data => {
    const list = document.querySelector(".list");
    data.filter(movie => movie.type === "banner")
    .forEach(movie => {
      const movie_item = document.createElement("div");
      movie_item.innerHTML = `
        <a href="../component/movie_info/${movie.link}"><img class="item" src="${movie.poster}" alt="${movie.title}" width="200"></a>
      `;
      list.appendChild(movie_item);
    });
  })
  .catch(error => {
    console.log("Error fetching movie data:", error);
  });


// Recommended movie list
  fetch("../assets/all_movie.json")
    .then(res => res.json())
    .then(data => {
    const recommended_movie_list = document.querySelector(".recommended_movie_list");
    data.filter(movie => movie.type === "recommended")
    .forEach(recommended_movie =>{
      const recommended_movie_item = document.createElement("div");
      recommended_movie_item.innerHTML = `
        <a href="../component/movie_info/${recommended_movie.link}"><img src="${recommended_movie.poster}" alt="${recommended_movie.title}" width="200">
        <p>${recommended_movie.title} (${recommended_movie.year})</p>
        </a>
      `;
      recommended_movie_list.appendChild(recommended_movie_item);
    })
  })
  .catch(error => {
    console.log("Error fetching recommended movie data:", error);
  });

  // Hot movie list
  fetch("../assets/all_movie.json")
  .then(res => res.json())
  .then(data => {
    const hot_movie_list = document.querySelector(".hot_movie_list");
    data.filter(movie => movie.type === "hot")
    .forEach(hot_movie => {
      const hot_movie_item = document.createElement("div");
      hot_movie_item.innerHTML = `
        <a href="../component/movie_info/${hot_movie.link}"><img src="${hot_movie.poster}" alt="${hot_movie.title}" width="200">
        <p>${hot_movie.title} (${hot_movie.year})</p>
        </a>
      `;
      hot_movie_list.appendChild(hot_movie_item);
    })
  })
  .catch(error => {
    console.log("Error fetching hot movie data:", error);
  });
  // All movie list (gop ca recommended + hot + banner)
fetch("../assets/all_movie.json")
  .then(res => res.json())
  .then(data => {
    const all_movie_list = document.querySelector(".all_movie_list");
    data.forEach(movie => {
      const movie_item = document.createElement("div");
      movie_item.innerHTML = `
        <a href="../component/movie_info/${movie.link}"><img class="item" src="${movie.poster}" alt="${movie.title}" width="200">
        <p>${movie.title} (${movie.year})</p>
        </a>
      `;
      all_movie_list.appendChild(movie_item);
    })
  })
  .catch(error => {
    console.log("Error fetching all movie data:", error);
  });