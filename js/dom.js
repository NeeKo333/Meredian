import { addToCart } from "/js/add_to_cart.js";
addToCart();

// const conteiner = document.querySelector(
//   ".main_accomplishments_block_conteiner"
// );

// const new_div = document.createElement("div");
// const test_div = document.createElement("div");
// const ul = `<ul>
// <li>1</li>
// <li>2</li>
// <li>3</li>
// <li>4</li>
// <li>5</li>
// </ul>`;

// const newUl = document.createElement("ul");
// const ulContent = `
// <p>Параграф 1</p>
// <p>Параграф 2</p>
// `;
// newUl.innerHTML = ulContent;

// const img = document.createElement("img");
// img.src = "/img/rust 1 (Traced).svg";
// new_div.appendChild(img);

// new_div.classList.add("accomplishments_item");
// test_div.classList.add("test");
// test_div.innerHTML = ul;

// conteiner.appendChild(new_div);

// new_div.insertAdjacentElement("beforebegin", test_div);
// test_div.insertAdjacentElement("beforebegin", newUl);
// newUl.lastElementChild.remove();

// const carsList = [
//   {
//     year: 2015,
//     model: "Tesla",
//     color: "Red",
//   },
//   {
//     year: 2019,
//     model: "BMW",
//     color: "Blue",
//   },
//   {
//     year: 2020,
//     model: "Mers",
//     color: "Black",
//   },
// ];

// const GeneratedCards = (year, model, color) => {
//   return `<div class = "autocard">
//   <h2> Model:${model}</h2>
//   <p>Year:${year}</p>
//   <p>Color${color}:</p>
//   <button class = "delete_btn">Delete</button>
//   </div>`;
// };

// const autoHTML = carsList.map((el) => {
//   return GeneratedCards(el.year, el.model, el.color);
// });

// console.log(autoHTML);

// autoHTML.forEach((el) => {
//   new_div.innerHTML += el;
//   console.log(el);
// });

// const items = document.querySelectorAll(".accomplishments_item");
// const btns = document.querySelectorAll(".delete_btn");

// items.forEach((el) => {
//   el.addEventListener("click", (e) => {
//     btns.forEach((element) => {
//       if (e.target === element) {
//         e.target.closest(".autocard").remove();
//       }
//     });
//   });
// });
