
fetch("../../assets/all_movie.json")
  .then(res => res.json())
  .then(data => {
    const categories = [
        { genre: "Hài", selector: ".funny_movie_list" },
        { genre: "Lãng mạn", selector: ".romance_movie_list" },
        { genre: "Phiêu lưu", selector: ".adventure_movie_list" },
        { genre: "Giả tưởng", selector: ".fantasy_movie_list" },
        { genre: "Hành động", selector: ".action_movie_list" },
        { genre: "Giật gân", selector: ".thriller_movie_list" },
        { genre: "Kinh dị", selector: ".horror_movie_list" },
        { genre: "Drama", selector: ".drama_movie_list" },
        { genre: "Tâm lý", selector: ".psychological_movie_list" },
        { genre: "Viễn tưởng", selector: ".science_fiction_movie_list" },
        { genre: "Tài liệu", selector: ".documentary_movie_list" },
        { genre: "Chiến tranh", selector: ".war_movie_list" },
        { genre: "Bí ẩn", selector: ".mystery_movie_list" },
        { genre: "Âm nhạc", selector: ".music_movie_list" },
        { genre: "Thể thao", selector: ".sport_movie_list" },
        { genre: "Chính kịch", selector: ".historical_movie_list" },
        { genre: "Lịch sử", selector: ".history_movie_list" },
        { genre: "Chính luận", selector: ".political_movie_list" },
        { genre: "Hoạt hình", selector: ".animation_movie_list" },
        { genre: "Gia đình", selector: ".family_movie_list" },
        { genre: "Tội phạm", selector: ".crime_movie_list" },
        { genre: "Xã hội", selector: ".social_movie_list" },

    ];

    categories.forEach(({ genre, selector }) => {
      const container = document.querySelector(selector);
      if (!container) return;

      data.filter(movie => movie.genre.includes(genre))
        .forEach(movie => {
          const movieItem = document.createElement("div");
          movieItem.className = "movie_item";
          movieItem.innerHTML = `
            <a href="/component/movie_info/${movie.link}"><img class="item" src="${movie.poster}" alt="${movie.title}" width="200">
              <p>${movie.title} (${movie.year})</p></a>
          `;
          container.appendChild(movieItem);
        });
    });
  })
  .catch(error => {
    console.error("Error fetching movie data:", error);
  });

// Cuộn ngang danh sách phim mà không cần giữ shift
scrollContainers = [
    ".funny_movie_list",
    ".romance_movie_list",
    ".historical_movie_list",
    ".history_movie_list",
    ".action_movie_list",
    ".psychological_movie_list",
    ".adventure_movie_list",
    ".science_fiction_movie_list",
    ".drama_movie_list"
]

scrollContainers.forEach(selector => {
    const container = document.querySelector(selector);
    container.addEventListener("wheel", function(event) {
        event.preventDefault();
        this.scrollLeft += event.deltaY * 2;
    });
});

// Tìm kiếm phim
fetch('../../assets/all_movie.json')
  .then(response => response.json())
  .then(movies => {
    const input = document.querySelector('.search_bar');
    const suggestions = document.getElementById('searchSuggestions');

    input.addEventListener('input', function () {
      const keyword = this.value.toLowerCase().trim();
      suggestions.innerHTML = '';

      if (!keyword) {
        suggestions.style.display = 'none';
        return;
      }

      const filtered = movies.filter(movie =>
        movie.title && movie.title.toLowerCase().startsWith(keyword)
      );

      if (filtered.length === 0) {
        suggestions.style.display = 'none';
        return;
      }

      filtered.forEach(movie => {
        const item = document.createElement('div');
        item.className = 'result-item';
        item.innerHTML = `
        <a href="../component/movie_info//movie_info/${movie.link}" class="result-link">
          <img src="${movie.poster}" alt="${movie.title}">
          <div>
            <p>${movie.title_vn || movie.title}</p><br>
            <small>${movie.year || ''} ${movie.duration || ''}</small>
          </div>
          </a>
        `;
        item.onclick = () => {};  // no navigation
        suggestions.appendChild(item);
      });
      suggestions.style.display = 'block';
    });
  });

  function logout() {
    localStorage.removeItem("username");
    window.location.href= "/../../index.html";
}

window.onload = function () {

    const user = localStorage.getItem("username");
    if (user) {
      document.getElementById("loginBtn").style.display = "none";
      document.getElementById("logoutBtn").style.display = "block";
    } else {
      document.getElementById("logoutBtn").style.display = "none";
    }
};

function to_top(){
  window.scrollTo({
    top:0,
    left:0,
    behavior: "smooth"
  })
}

//Thay nền sáng
function turn_on() {
  const bg = document.getElementsByTagName("main")[0];
  const tab = document.getElementsByTagName("header")[0];
  const text= document.getElementsByTagName("p");
  const bulb = document.getElementById("on");
  const bulb_2 = document.getElementById("off");
  bg.style.backgroundColor = "white";
  tab.style.backgroundColor = "rgb(90, 90, 90)";
  [...text].forEach( t => {
    t.style.color = "black";
  });
  bulb.style.display = "none";
  bulb_2.style.display = "block";
}

// Thay nền tối
function turn_off() {
  const bg = document.getElementsByTagName("main")[0];
  const tab = document.getElementsByTagName("header")[0];
  const text= document.getElementsByTagName("p");
  const bulb = document.getElementById("on");
  const bulb_2 = document.getElementById("off");
  bg.style.backgroundColor = "rgb(25,25,25)";
  tab.style.backgroundColor = "black";
  [...text].forEach( t => {
    t.style.color = "white";
  });
  bulb.style.display = "block";
  bulb_2.style.display = "none";
}