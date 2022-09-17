export function addToCart() {
  const card_items = document.querySelectorAll(".collection_card");
  const cartIcon = document.querySelector(".cart");
  const cart = document.querySelector(".cart_body");
  const cartList = document.querySelector(".cart_list");
  const cartQty = document.querySelector(".header_icons span");

  cartQty.innerHTML = localStorage.getItem("cartListQty");
  cartList.innerHTML = localStorage.getItem("cartList");
  cartQty.className = localStorage.getItem("cartListClass");

  // const test = document.querySelector(".bonq");

  // test.addEventListener("click", (el) => {
  //   var opened = window.open("");
  //   opened.document.write(
  //     `<html>
  //     <head>
  //           <title>MyTitle</title>
  //     </head>
  //     <body>
  //           test
  //     </body>
  //     </html>`
  //   );
  // });

  if (cartQty.className === "null") {
    cartQty.className = "cart_span_qty";
  }

  if (cartList.innerHTML === "") {
    const el = document.createElement("span");
    el.classList.add("empty_cart_span");
    el.innerText = "Cart is Empty!";
    cartList.appendChild(el);
  }

  card_items.forEach((el) => {
    el.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") {
        const id = el.dataset.card_id;
        addToCart(e.target, id);
      }
    });
  });

  function localStorageUpdateCart() {
    let cartListStor = cartList.innerHTML;
    localStorage.setItem("cartList", cartListStor);
  }

  function localStorageUpdateQty() {
    let cartListQtyStor = cartQty.innerHTML;
    localStorage.setItem("cartListQty", cartListQtyStor);

    let cartListQtyClass = cartQty.className;
    localStorage.setItem("cartListClass", cartListQtyClass);
  }

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
        localStorageUpdateCart();
        targetButton.classList.remove("_fly");
      }
    });
  }

  function updateCart(targetButton, cardId, cardAdd = true) {
    const cartProduct = document.querySelector(
      `[data-cart-card_id = "${cardId}"]`
    );

    if (cardAdd) {
      if (cartQty) {
        cartQty.classList.add("active");
        cartQty.innerHTML = ++cartQty.innerHTML;
        localStorageUpdateQty();
      }
      // else cartIcon.insertAdjacentHTML("afterend", `<span>1</span>`);
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
        <div class = 'cart_list_qty'>Quantity: <span>1</span></div>
        <button class = "cart_list_delete">Delete</button>
      </div>
      `;
      cartList.insertAdjacentHTML(
        "beforeend",
        `<li data-cart-card_id = "${cardId}" class = 'cart_list_item'> ${cartListContent}</li>`
      );
    } else {
      const cartListItemQty = cartProduct.querySelector(".cart_list_qty span");
      cartListItemQty.innerHTML = ++cartListItemQty.innerHTML;
    }

    if (cartList.lastElementChild.tagName != "SPAN") {
      const empty_cart_span = cartList.querySelector(".empty_cart_span");
      empty_cart_span.classList.add("empty");
    }
  }

  document.body.addEventListener("click", (e) => {
    if (e.target == cartIcon) {
      cartIcon.classList.toggle("open");
    } else if (
      e.target != cartIcon &&
      e.target.tagName != "BUTTON" &&
      e.target != cart
    ) {
      cartIcon.classList.remove("open");
    }
    if (cartIcon.classList.contains("open")) {
      cart.classList.add("active");
    } else {
      cart.classList.remove("active");
    }

    const added_cards = cart.querySelectorAll(".cart_list_item");
    const cart_body = document.querySelector(".cart_body ");
    added_cards.forEach((el) => {
      const el_button = el.lastElementChild.lastElementChild;
      const qty_span = el.querySelector(".cart_list_qty span");
      const empty_cart_span = cartList.querySelector(".empty_cart_span");
      // el.lastElementChild.firstElementChild.nextElementSibling.lastElementChild;
      if (e.target == el_button && qty_span.innerText == "1") {
        el.closest(".cart_list_item").remove();
        localStorageUpdateCart();
        cartQty.innerHTML = --cartQty.innerHTML;
        localStorageUpdateQty();
      } else if (e.target == el_button && qty_span.innerText != "1") {
        qty_span.innerHTML = --qty_span.innerHTML;
        cartQty.innerHTML = --cartQty.innerHTML;
        localStorageUpdateQty();
        localStorageUpdateCart();
      }

      if (cartQty.innerText == "0") {
        cartQty.classList.remove("active");
        cart_body.classList.remove("active");
        cartIcon.classList.remove("open");
        empty_cart_span.classList.remove("empty");
        localStorageUpdateCart();
        localStorageUpdateQty();
      }
    });
  });
}
