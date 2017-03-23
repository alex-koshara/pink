var mainNavNoJS = document.querySelector(".main-nav--no-js");

if (mainNavNoJS) {
  mainNavNoJS.classList.remove("main-nav--no-js");
}

var mainNavToggle = document.querySelector(".hamburger");
var mainNav = document.querySelector(".main-nav")

mainNavToggle.addEventListener("click", toggleMainNav);

function toggleMainNav(e) {
  mainNav.classList.toggle("main-nav--open");
}
