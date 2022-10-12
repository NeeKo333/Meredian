const searchIcon = document.querySelector(".search");
const searchInput = document.querySelector(".search_input");
const notSearchedCards = document.getElementsByClassName("not_searched");
const cardsCatalog = document.querySelector(".catalog_cards");
const notFoundEl = document.querySelector(".not_found");
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
      if (el.querySelector("p").textContent.includes(searchInput.value)) {
        el.closest(".collection_card").classList.remove("not_searched");
      } else {
        el.closest(".collection_card").classList.add("not_searched");
      }
      if (searchInput.value === "") {
        el.closest(".collection_card").classList.remove("not_searched");
      }
      if (notSearchedCards.length === 12) {
        notFoundEl.classList.add("active");
      } else {
        notFoundEl.classList.remove("active");
      }
    });
    console.log(notSearchedCards.length);
  });
}
search();
