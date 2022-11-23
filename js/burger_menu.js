const header_body = document.querySelector(".header_body_conteiner");
const first_nav = document.querySelector(".first_nav_menu");
const second_nav = document.querySelector(".second_nav_menu");
const header_burger = document.querySelector(".header_burger");
const body = document.querySelector("body");

header_burger.addEventListener("click", function () {
  header_burger.classList.toggle("open");
  header_body.classList.toggle("open");
  first_nav.classList.toggle("open");
  second_nav.classList.toggle("open");
  if (header_burger.classList.contains("open")) {
    body.classList.add("lock");
  } else if (
    body.classList.contains("lock") &&
    !header_burger.classList.contains("open")
  ) {
    body.classList.remove("lock");
  }
});
