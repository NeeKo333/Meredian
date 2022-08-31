let cards = document.getElementsByClassName("collection_card");
cards = Array.from(cards);
const start_cards = cards.slice(0, 12);
const lists = document.getElementsByClassName("sub_category_item");
const catalog = document.querySelector(".catalog_cards");
const paginationButtons = document.getElementsByClassName(
  "catalog_pagination_item"
);

catalog.innerHTML = "";
start_cards.forEach((el) => {
  catalog.appendChild(el);
});

for (let i = 0; i < paginationButtons.length; i++) {
  paginationButtons[i].addEventListener("click", (el) => {
    for (let j = 0; j < paginationButtons.length; j++) {
      if (paginationButtons[j].classList.contains("active")) {
        paginationButtons[j].classList.remove("active");
      }
    }
    el.target.classList.add("active");

    let pageNumber = Number(el.target.innerText);
    const cardsPerPage = 12;
    let start = (pageNumber - 1) * cardsPerPage;
    let end = start + cardsPerPage;
    let slicedCards = cards.slice(start, end);
    catalog.innerHTML = "";
    slicedCards.forEach((el) => {
      catalog.appendChild(el);
    });
  });
}

let data = 0;
for (let i = 0; i < lists.length; i++) {
  lists[i].addEventListener("click", function (event) {
    const parent = event.target;
    const child = event.target.firstElementChild;

    parent.classList.toggle("active");

    if (parent.classList.contains("sub_category_item")) {
      data = parent.dataset["f"];
    }

    if (parent.classList.contains("active")) {
      child.setAttribute("checked", "checked");
    } else {
      child.removeAttribute("checked", "checked");
    }

    cards.forEach((element) => {
      if (element.classList.contains(data)) {
        element.classList.toggle("open");
      }
      if (
        parent.classList.contains("active") &&
        !element.classList.contains(data)
      ) {
        element.classList.add("hide");
      } else element.classList.remove("hide");

      if (element.classList.contains("open")) {
        element.classList.remove("hide");
      } else element.classList.add("hide");
    });

    const active_lists = document.querySelectorAll(".sub_category_item.active");
    console.log(active_lists.length);
    if (active_lists.length < 1) {
      cards.forEach((el) => {
        el.classList.remove("hide");
      });
    }
  });
}
