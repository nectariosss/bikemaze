class Accordion extends HTMLElement {
  constructor() {
    super();
    this.canMultipleOpen = this.hasAttribute('data-allow-multiple-open');
    if (this.hasAttribute('data-first-open')) {
      const contentHeight = this.querySelectorAll(
        '[data-accordion="content"]'
      )[0].offsetHeight;
      const firstButton = this.querySelectorAll(
        '[data-accordion="trigger"]'
      )[0];
      if (!firstButton) return;
      this.openBody(firstButton, firstButton.nextElementSibling, contentHeight);
    }

    this.querySelectorAll('[data-accordion="trigger"]').forEach((button) =>
      button.addEventListener('click', this.toggleBody.bind(this, button))
    );
  }

  openBody(trigger, el, heightLimit) {
    el.style.height = heightLimit + 'px';
    trigger.classList.add('is-collapsed');
  }

  closeBody(trigger, el) {
    el.style.height = '0';
    trigger.classList.remove('is-collapsed');
  }

  toggleBody(elem) {
    if (elem.classList.contains('is-collapsed')) {
      this.closeBody(elem, elem.nextElementSibling);
    } else {
      const contentHeight = elem.nextElementSibling.querySelectorAll(
        '[data-accordion="content"]'
      )[0].offsetHeight;
      if (!this.canMultipleOpen) {
        for (const e of document.querySelectorAll(
          '[data-accordion="trigger"]'
        )) {
          this.closeBody(elem, e.nextElementSibling);
          e.classList.remove('is-collapsed');
        }
      }

      this.openBody(elem, elem.nextElementSibling, contentHeight);
    }
  }
}
customElements.define('accordion', Accordion);
