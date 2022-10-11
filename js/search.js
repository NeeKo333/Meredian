const searchIcon = document.querySelector(".search");
const searchInput = document.querySelector(".search_input");
body.addEventListener("click", (e) => {
  if (e.target === searchIcon) {
    searchInput.classList.toggle("open");
  } else if (e.target != searchIcon && e.target != searchInput) {
    searchInput.classList.remove("open");
  }
});

function search() {
  searchInput.addEventListener("input", (e) => {
    const cardsNames = document.querySelectorAll(".cards_info_name");
    cardsNames.forEach((el) => {
      if (el.querySelector("p").textContent === searchInput.value) {
        el.closest(".collection_card").classList.add("searched");
        el.closest(".collection_card").classList.remove("not_searched");
      } else {
        el.closest(".collection_card").classList.remove("searched");
        el.closest(".collection_card").classList.add("not_searched");
      }
      if (searchInput.value === "") {
        el.closest(".collection_card").classList.remove(
          "not_searched",
          "searched"
        );
      }
    });
  });
}
search();
