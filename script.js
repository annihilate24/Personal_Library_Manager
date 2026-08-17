const toggleBtn = document.getElementById("toggleBtn");
const sidebar = document.getElementById("sidebar");

toggleBtn.addEventListener("click",loadSidebar);

function loadSidebar(){
    sidebar.classList.toggle("closed");
}