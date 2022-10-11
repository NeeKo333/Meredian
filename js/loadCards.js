import { addTo_Cart } from "/js/add_to_cart.js";
import { filterFn } from "/js/filter.js";

/*------------functions--------------*/

async function getGardsFromFile() {
  const url = "json/cards.json";

  let response = await fetch(url, { method: "GET" });
  if (response.ok) {
    let result = await response.json();
    loadCards(result);
    addTo_Cart();
    filterFn();
  } else {
    alert("Data base Error!");
  }
}

function loadCards(data) {
  data.cards.forEach((el) => {
    const itemId = el.id;
    const itemName = el.card_name;
    const itemSrc = el.src;
    const itemCatalog = document.querySelector(".catalog_cards");

    const tamplate = `<div data-card_id=${itemId} class="collection_card ${itemName}">
    <a href=/Cards/?product-id=${itemId} target="_blank">
      <img src="${itemSrc}" alt="" />
    </a>
    <div class="add_to_cart_btn">
      <button>ADD TO CART</button>
    </div>
    <div class="cards_info">
      <div class="cards_info_name">
        <p>Serene Linen Deluxe Cloud</p>
      </div>
      <div class="cards_info_cost">
        <span>£2,500.00</span> £2600.00 <span>40% Off</span>
      </div>
    </div>
  </div>`;

    itemCatalog.innerHTML += tamplate;
  });
}

/*------------functions--------------*/

getGardsFromFile();
