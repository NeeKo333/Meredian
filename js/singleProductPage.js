const main = document.querySelector("main");

const pruductId = Number(location.search.replace("?product-id=", ""));

const url = "../json/cards.json";

async function getSingleProduct(url) {
  const response = await fetch(url);
  const resultData = await response.json();
  renderPruductData(resultData.cards);
}

getSingleProduct(url);

function renderPruductData(array) {
  array.forEach((element) => {
    const template = document.createElement("img");
    if (pruductId === element.id) {
      const productImg = element.src;
      template.setAttribute("src", productImg);
      main.insertAdjacentElement("afterbegin", template);
    }
  });
}
