function signin() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const re_password = document.getElementById("re_password").value;
    const notice_2 = document.querySelector(".text_error");
    const error_2 = document.getElementsByClassName("input_box_error");

    if (notice_2) {
        notice_2.remove();
    }

    if (error_2) {
        [...error_2].forEach(e => (
            e.classList.remove("input_box_error")
        ));
    }

    if (localStorage.getItem(username)) {
        const container_input = document.querySelector(".container_input");
        const input_box = document.getElementById("username");
        const notice = document.createElement("p");
        notice.classList.add("text_error");
        input_box.classList.add("input_box_error");
        notice.innerHTML = "Tên đăng nhập đã tồn tại!";
        container_input.appendChild(notice);
    } else if (username.length === 0){
        const container_input = document.querySelector(".container_input");
        const input_box = document.getElementById("username");
        const notice = document.createElement("p");
        notice.classList.add("text_error");
        input_box.classList.add("input_box_error");
        notice.innerHTML = "Tên đăng nhập không được để trống !";
        container_input.appendChild(notice);        
    } else if (username.length < 6 || username.length >16){
        const container_input = document.querySelector(".container_input");
        const notice = document.createElement("p");
        const input_box = document.getElementById("username"); 
        notice.classList.add("text_error");
        input_box.classList.add("input_box_error");
        notice.innerHTML = "Tên đăng nhập phải từ 6 đến 16 kí tự !"
        container_input.appendChild(notice);
    } else if(password.length === 0){
        const container_input = document.querySelector(".container_input");
        const input_box = document.getElementById("password"); 
        const notice = document.createElement("p");
        notice.classList.add("text_error");
        input_box.classList.add("input_box_error");
        notice.innerHTML = "Mật khẩu không được để trống !";
        container_input.appendChild(notice); 
    } else if(password.length < 8 || password.length > 24){
        const container_input = document.querySelector(".container_input");
        const input_box = document.getElementById("username"); 
        const notice = document.createElement("p");
        notice.classList.add("text_error");
        input_box.classList.add("input_box_error");
        notice.innerHTML = "Mật khẩu phải từ 8 đến 24 kí tự !";
        container_input.appendChild(notice); 
    } else if (password !== re_password){
        const container_input = document.querySelector(".container_input");
        const input_box = document.getElementById("password"); 
        const input_box_2= document.getElementById("re_password"); 
        const notice = document.createElement("p");
        notice.classList.add("text_error");
        input_box.classList.add("input_box_error");
        input_box_2.classList.add("input_box_error");
        notice.innerHTML = "Mật khẩu nhập lại phải trùng với mật khẩu trước đó !"
        container_input.appendChild(notice);
    } else {
        localStorage.setItem(username, password);
        alert("Đăng ký thành công!");
        window.location.href = "login.html";
    }
}

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const notice_2 = document.querySelector(".text_error");
    const error_2 = document.getElementsByClassName("input_box_error");

    if (notice_2) {
        notice_2.remove();
    }

    if (error_2) {
        [...error_2].forEach(e => (
            e.classList.remove("input_box_error")
        ));
    }

    if (username.length ===0) {
        const container_input = document.querySelector(".container_input");
        const input_box = document.getElementById("username");
        const notice = document.createElement("p");
        notice.classList.add("text_error");
        input_box.classList.add("input_box_error")
        notice.innerHTML = "Tên đăng nhập không được để trống !";
        container_input.appendChild(notice);
    } else if (localStorage.getItem(username) !== password) {
        const container_input = document.querySelector(".container_input");
        const input_box = document.getElementById("username");
        const input_box_2 = document.getElementById("password");
        const notice = document.createElement("p");
        notice.classList.add("text_error");
        input_box.classList.add("input_box_error");
        input_box_2.classList.add("input_box_error");
        notice.innerHTML = "Tên tài khoản hoặc mật khẩu không chính xác !";
        container_input.appendChild(notice);
    } else {
        alert("Đăng nhập thành công");
        localStorage.setItem(`${password}-on`,username);
        localStorage.setItem("username", username)
        window.location.href = "../../index.html";
    }
}

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