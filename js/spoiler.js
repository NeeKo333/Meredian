const items = document.getElementsByClassName("category_item");
for (let i = 0; i < items.length; i++) {
  const item = items[i];
  const next = item.nextElementSibling;
  item.addEventListener("click", function () {
    item.classList.toggle("active");
    if (next.classList.contains("sub_category")) {
      next.classList.toggle("open");
    }
  });
}
