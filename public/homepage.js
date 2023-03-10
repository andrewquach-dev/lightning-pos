
// Burger Menu stuff
const burgerMenu = document.querySelector(".burger-menu");
const slideOutMenu = document.querySelector(".slide-out-menu");
const closeMenu = document.querySelector(".close-icon");

burgerMenu.addEventListener("click", function() {
  this.classList.toggle("change");
  slideOutMenu.classList.toggle("show");
});

closeMenu.addEventListener("click", function() {
  burgerMenu.classList.remove("change");
  slideOutMenu.classList.remove("show");
});

