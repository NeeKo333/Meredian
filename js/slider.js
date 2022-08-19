new Swiper(".image_slider", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  slidesPerView: 4,

  breakpoints: {
    280: {
      slidesPerView: 1,
    },

    480: {
      slidesPerView: 2,
    },

    992: {
      slidesPerView: 3,
    },

    1620: {
      slidesPerView: 4,
    },
  },
});

new Swiper(".image_furniture_slider", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  pagination: {
    el: ".swiper-pagination",
    type: "fraction",
  },

  breakpoints: {
    280: {
      slidesPerView: 1,
    },
  },
});
