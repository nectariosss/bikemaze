// Add click events here
document.addEventListener(
  "click",
  (event) => {
    if (event) {
      toggleCollectionFilter(event);
    }
  },
  false
);

// Add all load events here
window.addEventListener("DOMContentLoaded", function () {
  calculateAsideTop();
});

/**
 * Sort dropdown imitator
 */
const sortImitator = document.getElementById("SortBy-imitator");
const sortOrigin = document.getElementById("SortBy");

sortImitator.addEventListener(
  "change",
  function (item) {
    sortOrigin.value = item.target.value;
    sortOrigin.closest("form").dispatchEvent(new Event("input"));
  },
  false
);

/**
 * Sidebar top calculator
 */
function calculateAsideTop() {
  const header = document.getElementById("shopify-section-header");
  if (
    header.classList.contains("header--sticky") &&
    document.querySelector("[data-filters]")
  ) {
    document.querySelector("[data-filters]").style.top =
      header.offsetHeight + "px";
  }
}

function toggleCollectionFilter(evt) {
  const element = evt.target.closest("[data-filters-toggler]");
  if (element) {
    evt.preventDefault();
    document.body.classList.toggle("collection-filter-close");
  }
}
