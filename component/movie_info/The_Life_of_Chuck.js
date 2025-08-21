fetch("../../assets/all_movie.json")
.then(res => res.json())
.then(data => {
    const watch_movie = document.querySelector(".watching_movie");
    const movie_info = document.querySelector(".movie_info");
    data.filter(movie => movie.title === "The Life of Chuck")
    .forEach(movie => {
        const movie_item = document.createElement("iframe");
        movie_item.src = movie.trailer;
        movie_item.width = "1000";
        movie_item.height = "600";
        movie_item.title = movie.title;
        movie_item.frameborder= "0";
        movie_item.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        movie_item.allowFullscreen = true;
        watch_movie.appendChild(movie_item);

        const movie_detail = document.createElement("div");
        movie_detail.classList.add("movie_detail");
        movie_detail.innerHTML = `
            <p class="tag">${movie.title} (${movie.year})</p>
            <p>Đạo diễn: ${movie.director} </p>
            <p>Thể loại: ${movie.genre.join(", ")} </p>
            <p>${movie.description}</p>
        `;
        movie_info.appendChild(movie_detail);
    })
})
.catch(error => {
    console.log("Error fetching movie data:", error);
});

// Đánh giá giá
const star_list = document.getElementsByClassName("star");
const rating_score = document.getElementById("rating_score");
let rating = 0;

function highlight(index){
    [...star_list].forEach((star,i) => {
        if (i <= index) {
            star.classList.add("hovered");
        } else {
            star.classList.remove("hovered");
        }
    });
}

function remove_highlight() {
    [...star_list].forEach(star => {
        star.classList.remove("hovered");
    })
}

function select_rating() {
    [...star_list].forEach((star,index) => {
        if (index < rating) {
            star.classList.add("selected");
        } else {
            star.classList.remove("selected");
        }
    })
}

[...star_list].forEach((star,index) => {
    star.addEventListener("mouseover", () => {
        highlight(index);
    });
    star.addEventListener("mouseout", () => {
        remove_highlight();
    });
    star.addEventListener("click", () => {
        if (localStorage.getItem("username")){
            rating = index + 1;
            select_rating();
            update_rating();
        } else {
            alert("Bạn cần đăng nhập để đánh giá !")
        }
        
    })
});

function update_rating() {
    let score_tb = 0;
    localStorage.setItem(`${localStorage.getItem("username")}-rating`, rating);
    score_tb += Number(localStorage.getItem(`${localStorage.getItem("username")}-rating`));
    rating_score.textContent = `(${score_tb})`
}

window.onload = update_rating();

// Bình luận:
function send() {
    if (localStorage.getItem("username")) {
        const input = document.querySelector(".comment_box").value;
        const comment_area = document.querySelector(".comment_place");
        const comment = document.createElement("p");
        comment.innerHTML = `${localStorage.getItem("username")} đã bình luận: ${input}`;
        comment_area.appendChild(comment);
    } else {
        alert("Vui lòng đăng nhập để bình luận !")
    }
    
}

// Di chuyển lên đầu trang
function to_top(){
  window.scrollTo({
    top: 0,
    left: 0,
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

// Tìm kiếm phim
fetch("../../assets/all_movie.json")
  .then(response => response.json())
  .then(movies => {
    const input = document.querySelector(".search_bar");
    const suggestions = document.getElementById("searchSuggestions");

    input.addEventListener("input", function () {
      const keyword = this.value.toLowerCase().trim();
      suggestions.innerHTML = "";

      if (!keyword) {
        suggestions.style.display = "none";
        return;
      }

      const filtered = movies.filter(movie =>
        movie.title && movie.title.toLowerCase().startsWith(keyword)
      );

      if (filtered.length === 0) {
        suggestions.style.display = "none";
        return;
      }

      filtered.forEach(movie => {
        const item = document.createElement("div");
        item.className = "result-item";
        item.innerHTML = `
        <a href="${movie.link}" class="result-link">
          <img src="${movie.poster}" alt="${movie.title}">
          <div>
            <strong>${movie.title_vn || movie.title}</strong><br>
            <small>${movie.year || ""} ${movie.duration || ""}</small>
          </div>
          </a>
        `;
        item.onclick = () => {};  // no navigation
        suggestions.appendChild(item);
      });

      suggestions.style.display = "block";
    });
  });