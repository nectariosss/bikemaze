import { findAncestor, swiperArrows } from "./helpers";
import Swiper, { Navigation, Pagination, Thumbs } from "swiper";
import { configureCart } from "liquid-ajax-cart";
console.log("Hello");
/**
 * Configure Liquid Ajax Cart
 */
configureCart("addToCartCssClass", "js-ajax-cart-opened");

/**
 * Configure Swiper Modules
 */
Swiper.use([Navigation, Pagination, Thumbs]);
window.Swiper = Swiper;

/**
 * Event Listeners
 */
document.addEventListener(
  "click",
  (event) => {
    if (event) {
      sampleMethod(event);
    }
  },
  false
);

window.addEventListener("resize", () => {});

document.addEventListener("DOMContentLoaded", () => {
  productsCarousel();
});

// TODO: refactor event listener and menu-items
/**
 * Header menu
 */
const menuItemsWithSub = document.querySelectorAll("[data-mainmenu-hassub]");

menuItemsWithSub.forEach((item) => {
  item.addEventListener("mouseenter", function () {
    this.querySelector("[data-mega-menu]")?.classList.add("mega-menu--active");
  });
  // Navigation menu mouse leave delay
  item.addEventListener("mouseleave", function () {
    setTimeout(() => {
      const elem = this.querySelector("[data-mega-menu]");
      if (elem?.classList) {
        elem.classList.remove("mega-menu--active");
      }
    }, 300);
  });
});

/**
 * Mobile menu
 */
const mobileMenuItems = document.querySelectorAll("[data-drawer-itemtoggle]");

mobileMenuItems.forEach((item) => {
  const parentItem = findAncestor(item, ".hasSub");

  item.addEventListener("click", function () {
    parentItem.querySelector("[data-drawer-child]").classList.toggle("open");
  });
});

const drawer = document.querySelector("[data-drawer]");
const openDrawer = document.querySelectorAll("[data-open-drawer]");
const closeDrawer = document.querySelectorAll("[data-close-drawer]");

openDrawer.forEach((item) => {
  item.addEventListener("click", function () {
    drawer.classList.add("open");
    document.body.classList.add("disable-body");
  });
});

closeDrawer.forEach((item) => {
  item.addEventListener("click", function () {
    drawer.classList.remove("open");
    document.body.classList.remove("disable-body");
  });
});

/**
 * Swiper products carousel component
 */
function productsCarousel() {
  const carouselElements = document.querySelectorAll(
    ".products-carousel-swiper"
  );
  if (carouselElements.length) {
    console.log(carouselElements);
    carouselElements.forEach((carousel) => {
      const limitPerView = carousel.getAttribute("data-limit_per_view");
      const limitPerViewMobile = carousel.getAttribute(
        "data-limit_per_view_mobile"
      );
      new Swiper(carousel, {
        spaceBetween: 0,
        slidesPerView: limitPerViewMobile ? limitPerViewMobile : 2,
        allowTouchMove: true,
        autoHeight: true,
        watchOverflow: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        pagination: {
          el: ".swiper-pagination",
          type: "bullets",
          clickable: true,
        },
        cssMode: false,
        breakpoints: {
          768: {
            slidesPerView: limitPerViewMobile ? limitPerViewMobile : 2,
          },
          990: {
            cssMode: false,
            allowTouchMove: true,
            slidesPerView: limitPerView ? limitPerView : 2,
          },
        },
        on: {
          init: function () {
            swiperArrows(this, limitPerViewMobile, limitPerView);
          },
          resize: function () {
            swiperArrows(this, limitPerViewMobile, limitPerView);
          },
        },
      });
    });
  }
}

function sampleMethod(event) {
  const element = event.target.closest("[data-some-attr]"); // add your element class/id/data-attr.
  if (element) {
    event.preventDefault();
    //.... your logic here
  }
}
