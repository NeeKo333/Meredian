const cart_items = document.querySelectorAll(".collection_card");
const cartIcon = document.querySelector(".cart");
const cart = document.querySelector(".cart_body");

cart_items.forEach((el) => {
  el.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const id = el.dataset.card_id;
      addToCart(e.target, id);
    }
  });
});

function addToCart(targetButton, cardId) {
  targetButton.classList.add("_fly");

  //   const cart_item = targetButton.closest(".collection_card");
  const cart_item = document.querySelector(`[data-card_id = "${cardId}"]`);
  const cart_item_img = cart_item.querySelector("img");
  const cart_item_img_fly = cart_item_img.cloneNode();

  const cart_item_img_fly_W = cart_item_img.offsetWidth;
  const cart_item_img_fly_H = cart_item_img.offsetHeight;
  const cart_item_img_fly_Top = cart_item_img.getBoundingClientRect().top;
  const cart_item_img_fly_Left = cart_item_img.getBoundingClientRect().left;

  cart_item_img_fly.setAttribute("class", "_flyImg");
  cart_item_img_fly.style.cssText = `
        width: ${cart_item_img_fly_W}px;
        height: ${cart_item_img_fly_H}px;
        top: ${cart_item_img_fly_Top}px;
        left: ${cart_item_img_fly_Left}px
  `;

  document.body.appendChild(cart_item_img_fly);

  const cartTop = cartIcon.getBoundingClientRect().top;
  const cartLeft = cartIcon.getBoundingClientRect().left;

  cart_item_img_fly.style.cssText = `
  top: ${cartTop}px;
  left: ${cartLeft}px;
  width: 0px;
  height: 0px;
  opacity: 0;
`;
  cart_item_img_fly.addEventListener("transitionend", (e) => {
    if (targetButton.classList.contains("_fly")) {
      cart_item_img_fly.remove();
      updateCart(targetButton, cardId);
      targetButton.classList.remove("_fly");
    }
  });
}

function updateCart(targetButton, cardId, cardAdd = true) {
  const cartQty = document.querySelector(".header_icons span");
  const cartProduct = document.querySelector(
    `[data-cart-card_id = "${cardId}"]`
  );
  const cartList = document.querySelector(".cart_list");

  if (cardAdd) {
    if (cartQty) {
      cartQty.classList.add("active");
      cartQty.innerHTML = ++cartQty.innerHTML;
    } else cartIcon.insertAdjacentHTML("afterend", `<span>1</span>`);
  }
  if (!cartProduct) {
    const origItem = document.querySelector(`[data-card_id = "${cardId}"]`);
    const origItemImg = origItem.querySelector("img").src;
    console.log(origItemImg);
    const origItemName = origItem.querySelector(".cards_info_name").innerHTML;
    const cartListContent = `
    <img src = '${origItemImg}' />
    <div class = 'cart_list_body'>
      <a href ='' class = "cart_list_name">${origItemName}</a>
      <div class = 'cart_list_qty'>Qty: <span>1</span></div>
      <a href ='' class = "cart_list_delete">Delete</a>
    </div>
    `;
    console.log(cartListContent);
    cartList.insertAdjacentHTML(
      "beforeend",
      `<li data-cart-card_id = "${cardId}" class = 'cart_list_item'> ${cartListContent}</li>`
    );
  } else {
    const cartListItemQty = cartProduct.querySelector(".cart_list_qty span");
    cartListItemQty.innerHTML = ++cartListItemQty.innerHTML;
  }
}

body.addEventListener("click", (e) => {
  if (e.target == cartIcon) {
    cartIcon.classList.toggle("open");
  } else if (e.target != cartIcon && e.target.tagName != "BUTTON") {
    cartIcon.classList.remove("open");
  }
  if (cartIcon.classList.contains("open")) {
    cart.classList.add("active");
  } else cart.classList.remove("active");
});
