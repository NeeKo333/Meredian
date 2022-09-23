const scrollButton = document.querySelector(".scroll_to_top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 350) {
    scrollButton.classList.add("visible");
  } else {
    scrollButton.classList.remove("visible");
  }
});

scrollButton.addEventListener("click", () => {
  let offset = window.scrollY;
  scrollToTop();

  function scrollToTop() {
    if (offset > 0) {
      window.scrollTo(0, offset);
      offset = offset - 80;
      setTimeout(scrollToTop, 1);
    } else {
      clearTimeout();
      window.scrollTo(0, 0);
    }
  }
});
