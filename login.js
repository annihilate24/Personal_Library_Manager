const loginForm = document.getElementById("loginForm");
const loginmsg = document.getElementById("loginmsg");

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "admin" && password === "1234") {
        window.location.href = "index.html";
    } else {
        loginmsg.textContent = "Invalid username or password";
    }
});
