const Swiper = window.Swiper;

/**
 * Image gallery with Swiperjs
 */
const swiperSlidersPerView = 4;
const thumbnailsLength = document.querySelectorAll(
  "[data-thumbnail-images] [data-thumbnail-item]"
)?.length;

const swiperThumbs = new Swiper("[data-thumbnail-images]", {
  spaceBetween: 8,
  observer: true,
  observeParents: true,
  slidesPerView: swiperSlidersPerView,
  preventClicks: false,
  preventClicksPropagation: false,
  allowTouchMove: false,
  watchOverflow: true,
  watchSlidesVisibility: true,
  watchSlidesProgress: true,
  direction: "vertical",
  loop: thumbnailsLength >= swiperSlidersPerView ? true : false,
  resizeReInit: true,
});

new Swiper("[data-main-images]", {
  thumbs: {
    swiper: swiperThumbs,
  },
  observer: true,
  observeParents: true,
  slidesPerView: 1,
  spaceBetween: 0,
  loop: true,
  cssMode: true,
  resizeReInit: true,
  allowTouchMove: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    type: "bullets",
    clickable: true,
  },

  breakpoints: {
    990: {
      loop: false,
      slidesPerView: 1,
      spaceBetween: 0,
      cssMode: false,
      pagination: false,
      navigation: false,
      allowTouchMove: false,
    },
  },
  watchOverflow: true,
});

/**
 * Image zoomer
 */
function initZoom() {
  function zoom(e) {
    const zoomer = e.currentTarget;

    const offsetX = e?.offsetX ? e.offsetX : e.touches[0].pageX;
    const offsetY = e?.offsetY ? e.offsetY : e.touches[0].pageX;

    const x = (offsetX / zoomer.offsetWidth) * 100;
    const y = (offsetY / zoomer.offsetHeight) * 100;
    zoomer.style.backgroundPosition = x + "% " + y + "%";
  }
  if (window.innerWidth > 768) {
    const zoomElems = document.getElementsByClassName("zoom");
    if (zoomElems && zoomElems.length) {
      [...zoomElems].forEach((item) => {
        item.addEventListener("mouseenter", function () {
          const img = item.dataset.zoomimg;
          if (img) {
            item.style.backgroundImage = `url(${img})`;
          }
        });
        item.addEventListener("mousemove", function (e) {
          zoom(e);
        });
      });
    }
  }
}

// TODO: move this components
/**
 * Variant Selector Select (dropdown) component
 */
class VariantSelects extends HTMLElement {
  constructor() {
    super();
    this.addEventListener("change", this.onVariantChange);
    this.productForm = document.getElementById("product-form");
    this.setUnavailableOptions();
  }

  onVariantChange() {
    this.updateOptions();
    this.setUnavailableOptions();
    if (this.options && this.options.includes(undefined)) return null;
    this.updateMasterId();
    this.toggleAddButton(true, "", false);
    this.removeErrorMessage();

    if (!this.currentVariant) {
      this.toggleAddButton(true, "", true);
      this.setUnavailable();
    } else {
      this.updateMedia();
      this.updateURL();
      this.updateVariantInput();
      this.renderProductInfo();
    }
  }

  updateOptions() {
    this.options = Array.from(
      this.querySelectorAll("select"),
      (select) => select.value
    );
  }

  setUnavailableOptions() {
    const option1Swatches = this.querySelector("[data-option-position='1']");
    const option2Swatches = this.querySelector("[data-option-position='2']");
    const option3Swatches = this.querySelector("[data-option-position='3']");
    const selectedOption1 = option1Swatches?.querySelector(
      "input[type=radio]:checked"
    );
    const selectedOption2 = option2Swatches?.querySelector(
      "input[type=radio]:checked"
    );

    this.disableFalseOptions(1, option1Swatches);
    this.disableFalseOptions(2, option2Swatches, selectedOption1);
    this.disableFalseOptions(
      3,
      option3Swatches,
      selectedOption1,
      selectedOption2
    );
  }

  disableFalseOptions(
    option,
    optionSwatches,
    selectedOption1 = false,
    selectedOption2 = false
  ) {
    if (!optionSwatches && !option) return null;

    function hashDataCollector(variant, item, hashData, option) {
      if (!item || !variant) return null;
      if (variant["option" + option] === item.value) {
        if (variant.available) {
          hashData[item.value] = hashData[item.value]
            ? hashData[item.value] + "1"
            : "1";
        } else {
          hashData[item.value] = hashData[item.value]
            ? hashData[item.value] + "0"
            : "0";
        }
      } else {
        hashData[item.value] = hashData[item.value]
          ? hashData[item.value] + "x"
          : "x";
      }
    }
    optionSwatches?.querySelectorAll("input[type='radio']")?.forEach((item) => {
      const hashData = {};
      for (let variant of this.getVariantData()) {
        if (option === 1) {
          hashDataCollector(variant, item, hashData, option);
        }
        if (
          option === 2 &&
          selectedOption1 &&
          variant.option1 === selectedOption1.value
        ) {
          hashDataCollector(variant, item, hashData, option);
        }
        if (
          option === 3 &&
          selectedOption1 &&
          selectedOption2 &&
          variant.option1 === selectedOption1.value &&
          variant.option2 === selectedOption2.value
        ) {
          hashDataCollector(variant, item, hashData, option);
        }
      }

      if (hashData[item.value]) {
        item.classList.remove("hidden");
        if (
          hashData[item.value].includes("0") &&
          !hashData[item.value].includes("1")
        ) {
          item.classList.add("unavailable");
        } else if (hashData[item.value].includes("1")) {
          item.classList.remove("unavailable");
        } else if (
          !hashData[item.value].includes("0") &&
          !hashData[item.value].includes("1")
        ) {
          item.classList.add("hidden");
          if (item.checked) {
            setTimeout(() => {
              const availableOption = item
                .closest("[data-option-position]")
                .querySelector("input[type='radio']:not(.hidden) + label");
              availableOption?.click();
            }, 0);
          }
        }
      }
    });
  }

  updateMasterId() {
    this.currentVariant = this.getVariantData().find((variant) => {
      return !variant.options
        .map((option, index) => {
          return this.options[index] === option;
        })
        .includes(false);
    });
  }

  updateMedia() {
    if (!this.currentVariant) return;
    if (!this.currentVariant.featured_media) return;
    const newMedia = document.querySelector(
      `[data-media-id="${this.dataset.section}-${this.currentVariant.featured_media.id}"]`
    );

    if (!newMedia) return;
    const modalContent = document.querySelector(
      `#ProductModal-${this.dataset.section} .product-media-modal__content`
    );
    const newMediaModal = modalContent.querySelector(
      `[data-media-id="${this.currentVariant.featured_media.id}"]`
    );
    const parent = newMedia.parentElement;
    if (parent.firstChild == newMedia) return;
    modalContent.prepend(newMediaModal);
    parent.prepend(newMedia);
    this.stickyHeader =
      this.stickyHeader || document.querySelector("header--sticky");
    if (this.stickyHeader) {
      this.stickyHeader.dispatchEvent(new Event("preventHeaderReveal"));
    }
    window.setTimeout(() => {
      parent
        .querySelector("li.product__media-item")
        .scrollIntoView({ behavior: "smooth" });
    });
  }

  updateURL() {
    if (!this.currentVariant || this.dataset.updateUrl === "false") return;
    window.history.replaceState(
      {},
      "",
      `${this.dataset.url}?variant=${this.currentVariant.id}`
    );
  }

  updateVariantInput() {
    const input = this.productForm.querySelector("input[name='id']");
    input.value = this.currentVariant.id;
    input.dispatchEvent(new Event("change", { bubbles: true }));
  }

  removeErrorMessage() {
    if (!this.productForm) return;
    this.productForm.querySelector("[data-ajax-cart-form-error]").innerHTML =
      "";
  }

  renderProductInfo() {
    fetch(
      `${this.dataset.url}?variant=${this.currentVariant.id}&section_id=${this.dataset.section}`
    )
      .then((response) => response.text())
      .then((responseText) => {
        const elem = "[data-price]";
        const html = new DOMParser().parseFromString(responseText, "text/html");
        const destination = document.querySelector(elem);
        const source = html.querySelector(elem);

        if (source && destination) destination.innerHTML = source.innerHTML;

        const price = document.querySelector(elem);

        if (price) price.classList.remove("visibility-hidden");
        this.toggleAddButton(
          !this.currentVariant.available,
          window.variantStrings.soldOut
        );
      });
  }

  toggleAddButton(disable = true, text, modifyClass = true) {
    const productForm = this.productForm;
    if (!productForm) return;
    const addButton = productForm.querySelector("[name='add']");

    if (!addButton) return;

    if (disable) {
      addButton.setAttribute("disabled", true);
      if (text) addButton.textContent = text;
    } else {
      addButton.removeAttribute("disabled");
      addButton.textContent = window.variantStrings.addToCart;
    }

    if (!modifyClass) return;
  }

  setUnavailable() {
    const addButton = document.querySelector("[name='add']");
    const priceWrapper = document.querySelector("[data-price]");
    if (!addButton) return;
    addButton.textContent = window.variantStrings.unavailable;
    if (priceWrapper) priceWrapper.classList.add("visibility-hidden");
  }

  getVariantData() {
    this.variantData =
      this.variantData ||
      JSON.parse(
        document.querySelector("[data-product-json-variants]").textContent
      );
    return this.variantData;
  }
}
customElements.define("variant-selects", VariantSelects);

// TODO: move this components
/**
 * Variant Selector Radio component
 */
class VariantRadios extends VariantSelects {
  constructor() {
    super();
  }

  updateOptions() {
    const fieldsets = Array.from(this.querySelectorAll("fieldset"));

    this.options = fieldsets.map((fieldset) => {
      return Array.from(fieldset.querySelectorAll("input")).find(
        (radio) => radio.checked
      )?.value;
    });
  }
}
customElements.define("variant-radios", VariantRadios);

/**
 * Add all load events here
 */
window.addEventListener("DOMContentLoaded", function () {
  initZoom();
});

/**
 * Add all resize events here
 */
window.addEventListener("resize", function () {
  initZoom();
});
