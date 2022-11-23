const animationItems = document.querySelectorAll(".animation_block");

if (animationItems.length > 0) {
  setTimeout(animatedScroll, 300);
  window.addEventListener("scroll", animatedScroll);
  function animatedScroll() {
    animationItems.forEach((el) => {
      const animatedItem = el;
      const animatedItemHeight = animatedItem.offsetHeight;
      const animatedItemOffset = offsetEl(animatedItem).top;
      const animationStart = 86;

      let animatedItemPoint =
        window.innerHeight - animatedItemHeight / animationStart;

      if (animatedItemHeight > innerHeight) {
        animatedItemPoint =
          window.innerHeight - window.innerHeight / animationStart;
      }

      if (
        scrollY > animatedItemOffset - animatedItemPoint &&
        scrollY < animatedItemOffset + animatedItemHeight
      ) {
        animatedItem.classList.add("scroll");
      } else if (!animatedItem.classList.contains("not_anim_twice")) {
        animatedItem.classList.remove("scroll");
      }
    });
  }
  function offsetEl(el) {
    const rect = el.getBoundingClientRect();
    scrollLeft = window.scrollX || document.documentElement.scrollLeft;
    scrollTop = window.scrollY || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + screenLeft };
  }
}
