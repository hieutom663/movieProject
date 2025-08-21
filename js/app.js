// Taoj banner slider
    const banner_show = document.querySelector(".banner_show");
    const link_banner = document.querySelector(".move");
    const list = document.querySelector(".list");
    const prev = document.querySelector(".prev");
    const next = document.querySelector(".next");
    let items = [];
    let currentIndex = 0;
    
    function updateItems(){
        items = list.querySelectorAll(".item");
    }

    function updateBanner(index){
        updateItems();
        currentIndex = index;
        
        if (items[index]){
            const src = items[index].getAttribute("src");
            banner_show.setAttribute("src", src);
            fetch("../../assets/all_movie.json")
            .then(res => res.json())
            .then(data => {
                const movie = data.find(movie => movie.poster === src);
                if (movie) {
                    link_banner.setAttribute("href", `../component/movie_info/${movie.link}`);
                }
            })
            .catch(error => {
                console.log("Error fetching movie data:", error);
                link_banner.innerHTML = `<p>Thông tin không có sẵn</p>`;
            });
        }
    }

prev.addEventListener("click", ()=>{
    currentIndex--;
    if (currentIndex < 0){
        currentIndex = items.length - 1;
    }
    updateBanner(currentIndex);
})
next.addEventListener("click", ()=>{
    currentIndex++;
    if (currentIndex >= items.length){
        currentIndex = 0;
    }
    updateBanner(currentIndex);
});
updateBanner(0);
updateItems()

// BAnner tu chay:
function auto_slide() {
    currentIndex++;
    if (currentIndex >= items.length) {
        currentIndex = 0;
    }
    updateBanner(currentIndex);
}
setInterval(auto_slide, 4000);

// Cuộn ngang danh sách phim.
const scroll_containers = [
  '.recommended_movie_list',
  '.hot_movie_list',
  '.list'
];

scroll_containers.forEach(selector => {
  const container = document.querySelector(selector);
  if (container) {
    container.addEventListener('wheel', function (evt) {
      evt.preventDefault();
      container.scrollLeft += evt.deltaY * 1.5;
    });
  }
});


// Tìm kiếm phim
fetch('assets/all_movie.json')
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
        <a href="../component/movie_info/${movie.link}" class="result-link">
          <img src="${movie.poster}" alt="${movie.title}">
          <div>
            <strong>${movie.title}</strong><br>
            <small>${movie.year}</small>
          </div>
          </a>
        `;
        item.onclick = () => {};
        suggestions.appendChild(item);
      });

      suggestions.style.display = 'block';
    });
  });
  
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
  const banner = document.querySelector(".container_1");
  const text= document.getElementsByTagName("p");
  const bulb = document.getElementById("on");
  const bulb_2 = document.getElementById("off");
  banner.style.backgroundColor= "white";
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
  const banner = document.querySelector(".container_1");
  const text= document.getElementsByTagName("p");
  const bulb = document.getElementById("on");
  const bulb_2 = document.getElementById("off");
  banner.style.backgroundColor= "rgb(25,25,25)";
  bg.style.backgroundColor = "rgb(25,25,25)";
  tab.style.backgroundColor = "black";
  [...text].forEach( t => {
    t.style.color = "white";
  });
  bulb.style.display = "block";
  bulb_2.style.display = "none";
}
