export function filterFn() {
  const lists = document.getElementsByClassName("sub_category_item");
  const catalog = document.querySelector(".catalog_cards");
  let cards = document.getElementsByClassName("collection_card");

  const catalog_pagination = document.querySelector(".catalog_pagination");
  const cardsPerPage = 12;

  const all_qty = document.querySelector(".all_qty");
  const visible_qty = document.querySelector(".visible_qty");

  let paginationButtons = document.getElementsByClassName(
    "catalog_pagination_item"
  );

  const filter_menu = document.querySelector(".filter_burger");

  /*------------functions--------------*/
  function paginationButtonsQuantity() {
    let paginationBtnsQty = Math.ceil(cards.length / cardsPerPage);
    for (let i = 0; i < paginationBtnsQty; i++) {
      const button = document.createElement("button");
      button.classList.add("catalog_pagination_item");
      button.innerText = i + 1;
      catalog_pagination.appendChild(button);
    }
  }

  function displayPaginationArrows() {
    catalog_pagination.firstElementChild.classList.add("active");

    const leftPaginationArrow = `<button class="pagination_arrow left">
  <img src="/img/left_arrow.svg" alt="" />
</button>`;
    const rightPaginationArrow = `<button class="pagination_arrow right">
<img src="/img/right_arrow.svg" alt="" />
</button>`;

    catalog_pagination.insertAdjacentHTML("afterbegin", leftPaginationArrow);
    catalog_pagination.insertAdjacentHTML("beforeend", rightPaginationArrow);
  }

  function displayCardsQuantity() {
    all_qty.innerText = cards.length;
    visible_qty.innerText = `1 - 12`;
  }

  function filterMenu() {
    filter_menu.addEventListener("click", () => {
      const filter = document.querySelector(".collection_filter");
      filter.classList.toggle("filter_menu_open");
    });
  }

  function rangeFilter() {
    const rangeInput = document.querySelectorAll(".range_input input");
    const priceInput = document.querySelectorAll(".field input");
    const progress = document.querySelector(".progress");

    let priceGap = 1000;

    rangeInput.forEach((el) => {
      el.addEventListener("input", (el) => {
        let minValue = parseInt(rangeInput[0].value);
        let maxValue = parseInt(rangeInput[1].value);
        let percent = (minValue / rangeInput[1].max) * 100;

        if (maxValue - minValue < priceGap) {
          if (el.target.className === "range_min") {
            rangeInput[0].value = maxValue - priceGap;
          } else {
            rangeInput[1].value = minValue + priceGap;
          }
        } else {
          priceInput[0].value = minValue;
          priceInput[1].value = maxValue;
          progress.style.left = (minValue / rangeInput[0].max) * 100 + "%";
          progress.style.right =
            100 - (maxValue / rangeInput[1].max) * 100 + "%";
        }

        for (let i = 0; i < cards.length; i++) {
          const price = cards[i].lastElementChild.lastElementChild;
          let current_price = price.innerText.split("£")[2];
          current_price = Number(current_price.split(" ")[0]);
          if (current_price < minValue || current_price > maxValue) {
            cards[i].classList.add("price_hide");
          } else cards[i].classList.remove("price_hide");
        }
      });
    });
  }

  function paginationVisible(el) {
    if (
      el.nextElementSibling.classList.contains("catalog_pagination_item") &&
      el.previousElementSibling.classList.contains("catalog_pagination_item")
    ) {
      return [
        // Number(el.previousElementSibling.innerText) - 1,
        Number(el.innerText) - 1,
        Number(el.nextElementSibling.innerText) - 1,
      ];
    } else if (
      !el.nextElementSibling.classList.contains("catalog_pagination_item")
    ) {
      return [
        Number(el.previousElementSibling.innerText) - 1,
        // Number(el.previousElementSibling.previousElementSibling.innerText) - 1,
        Number(el.innerText) - 1,
      ];
    } else if (
      !el.previousElementSibling.classList.contains("catalog_pagination_item")
    ) {
      return [
        Number(el.innerText) - 1,
        Number(el.nextElementSibling.innerText) - 1,
        // Number(el.nextElementSibling.nextElementSibling.innerText) - 1,
      ];
    }
  }

  function pagination() {
    paginationButtons[0].classList.add("hide_pag");
    paginationButtons[1].classList.add("hide_pag");
    // paginationButtons[2].classList.add("hide_pag");

    paginationButtons = Array.from(paginationButtons);

    paginationButtons.forEach((el) => {
      el.addEventListener("click", (e) => {
        deleteNotSearchedClassAfterPagination();
        const visible_pagination = paginationVisible(el);
        paginationButtons.forEach((elem) => {
          if (elem.classList.contains("hide_pag")) {
            elem.classList.remove("hide_pag");
          }
        });
        for (let i = 0; i < paginationButtons.length; i++) {
          for (let j = 0; j < visible_pagination.length; j++) {
            if (i === visible_pagination[j]) {
              paginationButtons[i].classList.add("hide_pag");
            }
          }
        }
      });
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
        let start = (pageNumber - 1) * cardsPerPage;
        let end = start + cardsPerPage;
        let slicedCards = cards.slice(start, end);
        visible_qty.innerText = `${start} - ${end}`;
        if (pageNumber == 1) {
          visible_qty.innerText = `${start + 1} - ${end}`;
        }
        catalog.innerHTML = "";
        slicedCards.forEach((el) => {
          catalog.appendChild(el);
        });
      });
    }
    const arrows = document.querySelectorAll(".pagination_arrow");
    arrows.forEach((arrow) => {
      arrow.addEventListener("click", (e) => {
        const el = document.querySelector(".catalog_pagination_item.active");
        if (arrow.classList.contains("right")) {
          el.nextElementSibling.click();
        } else if (arrow.classList.contains("left")) {
          el.previousElementSibling.click();
        }
      });
    });
  }

  function deleteNotSearchedClassAfterPagination() {
    catalog.querySelectorAll(".not_searched").forEach((el) => {
      el.classList.remove("not_searched");
      if (document.querySelector(".not_found").classList.contains("active")) {
        document.querySelector(".not_found").classList.remove("active");
      }
    });
  }

  function mainFilters() {
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

        const active_lists = document.querySelectorAll(
          ".sub_category_item.active"
        );
        if (active_lists.length < 1) {
          cards.forEach((el) => {
            el.classList.remove("hide");
          });
        }
      });
    }
  }

  /*------------functions--------------*/

  paginationButtonsQuantity();

  displayPaginationArrows();

  displayCardsQuantity();

  cards = Array.from(cards);
  const start_cards = cards.slice(0, 12);

  filterMenu();

  /*------------range_slider--------------*/

  rangeFilter();

  /*------------pagination--------------*/

  catalog.innerHTML = "";
  start_cards.forEach((el, index) => {
    catalog.appendChild(el);
  });

  pagination();

  mainFilters();
}
