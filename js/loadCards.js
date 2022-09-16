getGardsFromFile();

async function getGardsFromFile() {
  const file = "json/cards.json";

  let response = await fetch(file, { method: "GET" });
  if (response.ok) {
    let result = await response.json();
    loadCards(result);
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
    <img src="${itemSrc}" alt="" />
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

// console.log("load");

// const cardss = [
//   {
//     id: 25,
//     card_name: "sofas",
//     src: "/img/collection/cards/Mask Group.png",
//   },
//   {
//     id: 26,
//     card_name: "love_seats",
//     src: "/img/collection/cards/Mask Group.png",
//   },
//   {
//     id: 27,
//     card_name: "chairs",
//     src: "/img/collection/cards/Mask Group.png",
//   },
//   {
//     id: 28,
//     card_name: "sectionals",
//     src: "/img/collection/cards/Mask Group.png",
//   },
// ];

// cardss.forEach((el) => {
//   const itemId = el.id;
//   const itemName = el.card_name;
//   const itemSrc = el.src;
//   const itemCatalog = document.querySelector(".catalog_cards");

//   const tamplate = `<div data-card_id=${itemId} class="collection_card ${itemName}">
//       <img src="${itemSrc}" alt="" />
//       <div class="add_to_cart_btn">
//         <button>ADD TO CART</button>
//       </div>
//       <div class="cards_info">
//         <div class="cards_info_name">
//           <p>Serene Linen Deluxe Cloud</p>
//         </div>
//         <div class="cards_info_cost">
//           <span>£2,500.00</span> £2600.00 <span>40% Off</span>
//         </div>
//       </div>
//     </div>`;

//   itemCatalog.innerHTML += tamplate;
//   console.log("async");
// });
