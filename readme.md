
# Avex Shopify Theme Boilerplate 🌠

  

## DEV STORE

  

https://onlinestore2-test.myshopify.com/

  

Password: **avex**

  

## Getting started

  

1. Clone the repo -

```

git clone https://github.com/avex-designs/avex-boilerplate

```

  

2. Install dependencies - `npm install`

3. Change git origin url -

```

git remote set-url origin new.git.url/here

git branch -M main

git push -u origin main

```

  

4. Connect theme in Shopify admin via Github - `Themes -> Add theme -> Connect from Github`

  

5. Make sure [Themekit](https://shopify.github.io/themekit) is installed - `theme help`

  

6. Add `config.yml` (use sample - `sample-config.yml`).

  

7. Run `npm run watch` to simultaneously watch, build and upload changes to Shopify

  

## NPM Commands

  

1.  `npm run zip` - creates archived theme files, ready for manual theme upload.

2.  `npm run watch` - runs webpack and themekit watch commands in parallel.

3.  `npm run build` - runs webpack build command, to compile scss/js files.

4.  `npm run export` - to unminify and un-uglify css/js files. (file names will stay .min extension)

  

## Top Features

  

1. Upload ready built and minifed CSS/JS files to Shopify

  

2. SCSS/JS files are divided into modular parts based on the sections

  

3. Full integration with **Liquid Ajax Cart**. All product forms automatically ajaxified. For more details please visit [https://liquid-ajax-cart.js.org](https://liquid-ajax-cart.js.org)

	✅ Latest version added with npm support!

  

3.  **Swiper Slider**  [Docs](https://swiperjs.com/swiper-api). Please use `window.Swiper` object.

Please use only needed modules:

```javascript

import  SwiperCore, { Navigation, Pagination, Thumbs, Mousewheel } from  "swiper/core";

SwiperCore.use([Navigation, Pagination, Thumbs]);

window.Swiper = SwiperCore;

```

4. Based on Shopify [DAWN Theme](https://github.com/Shopify/dawn).

  

5. ⚠️~~Responsive Image using native `loading='lazy'` - `/snippets/image.liquid`~~
	<br>Use native shopify ``image_tag`` [filter](https://shopify.dev/api/liquid/filters/html-filters#image_tag). 
	✅Added new `image-acf.liquid` for acf images. 

6. CSS Lazyload - `/snippets/stylesheet.liquid`

7. JS load using defer -

```javascript

<script  src="{{ 'common.min.js' | asset_url }}"  defer="defer"></script>

```

  

5. Global SCSS Resource Loader. `src/scss/resources.scss`

```

1. REM mixin `rem(32px)`

2. Media queries mixin ` @include media(tablet){ h1{ color: red } }`

3. Feel free to add more mixins for global usage.

```

6. All scripts loading from Node modules.

Install needed npm package and import it to `common.js`. Please assign your libraries to `window` object for global usage (please look to `common.js` for sample).

  

9. ❌ THIS VERSION DOESN'T HAVE SUPPORT OF JQUERY!❌ Vanilla JS only!✅

10. ❌ DOESN'T SUPPORT IE! ❌

  

## Reusable Web Components

  

1.  **Modal popup** - `common.js::206(line)`

  

Usage:

```html

<modal-opener  class=""  data-modal="#PopupModal">

<button  type="button">Open</button>

</modal-opener>

<modal-dialog  id="PopupModal">

Some text or html here....

</modal-dialog>

```

Sample CSS (already added in common.scss):

```css

.popup-modal {

box-sizing: border-box;

opacity: 0;

position: fixed;

visibility: hidden;

z-index: -1;

margin: 0  auto;

top: 0;

left: 0;

overflow: auto;

width: 100%;

background: #0003;

height: 100%;

}

  

.popup-modal[open] {

opacity: 1;

visibility: visible;

z-index: 101;

}

  

.popup-modal__content {

background-color: #fff;

overflow: auto;

height: 80%;

margin: 0  auto;

left: 50%;

transform: translateX(-50%);

margin-top: 5rem;

width: 92%;

position: absolute;

top: 0;

padding: 0  1.5rem  0  3rem;

}

```

2.  **Accordion** - `common.js::105(line)`

  

Usage:

```html

<accordion-block  data-allow-multiple-open  data-first-open>

<ul  class="accordion">

{%- for  item in accordion_items  -%}

<li  class="accordion__item">

<button  data-accordion="trigger">

{{  item.title }}

</button>

<div  data-accordion="content-container">

<div  data-accordion="content">

{{  item.content }}

</div>

</div>

</li>

{%- endfor  -%}

</ul>

</accordion-block>

```

Sample CSS (already added in common.scss):

```css

[data-accordion="content-container"] {

height: 0;

overflow: hidden;

transition: all  0.1s  linear;

}

```

3.  **Product Carousel** - `common.js::160(line)`

❌Web components with Swiper js not well supported in Safari. Removed.❌


4.  **Predictive search** - `search.js`

Usage:

```html

<predictive-search  data-loading-text="{{ 'accessibility.loading' | t }}">

<form  action="{{  routes.search_url }}"  method="get"  role="search"  class="search">

<div  class="field">

<input

class="search__input field__input"

id="Search-In-Template"

type="search"

name="q"

value="{{  search.terms | escape }}"

placeholder="{{ 'general.search.search' | t }}"

role="combobox"

aria-expanded="false"

aria-owns="predictive-search-results-list"

aria-controls="predictive-search-results-list"

aria-haspopup="listbox"

aria-autocomplete="list"

autocorrect="off"

autocomplete="off"

autocapitalize="off"

spellcheck="false">

<input  name="options[prefix]"  type="hidden"  value="last">

<div  class="predictive-search predictive-search--search-template"  tabindex="-1"  data-predictive-search>

<div  class="predictive-search__loading-state">

<div  class="spinner">Loading</div>

</div>

</div>

<span  class="predictive-search-status visually-hidden"  role="status"  aria-hidden="true"></span>

<button  type="submit"  class="search__button field__button"  aria-label="{{ 'general.search.search' | t }}">{%- render  'icon-search'  -%}</button>

</div>

</form>

</predictive-search>

```

Sample SCSS

```scss

.predictive-search {

display: none;

position: absolute;

top: calc(100% + 0.1rem);

width: calc(100% + 0.2rem);

left: -0.1rem;

border: 0.1rem  solid  #000;

background-color: #fff;

z-index: 3;

&__item {

display: flex;

padding: 1rem;

text-align: left;

text-decoration: none;

width: 100%;

}

&__item-heading {

font-size: 14px;

text-transform: none;

margin-bottom: 5px;

}

&__item--term {

justify-content: space-between;

align-items: center;

padding: 1.3rem  2rem;

word-break: break-all;

line-height: 1.4;

border: none;

height: 40px;

font-size: 12px;

cursor: pointer;

&:hover {

opacity: 0.7;

}

.icon-arrow {

width: 1.4rem;

height: 1.4rem;

flex-shrink: 0;

margin-left: 2rem;

color: #000;

}

}

&__heading {

border-bottom: 0.1rem  solid  #ccc;

font-size: rem(12px);

text-transform: uppercase;

margin: 0  auto;

padding: 1.5rem  0  0.75rem;

display: flex;

justify-content: space-between;

align-items: center;

width: calc(100% - 2rem);

color: #000;

}

&__results-list {

margin: 0;

padding: 0;

list-style: none;

}

&__item--link {

display: grid;

grid-template-columns: 50px  1fr;

grid-column-gap: 1rem;

grid-template-areas: "product-image product-content";

&:hover {

background-color: #cccccc21;

}

}

&__image {

grid-area: product-image;

object-fit: cover;

width: 50px;

height: 50px;

}

&__item-content {

grid-area: product-content;

display: flex;

flex-direction: column;

}

}

.predictive-search--search-template {

z-index: 2;

}

predictive-search:not([loading]) .predictive-search-status__loading,

predictive-search:not([loading]) .predictive-search__heading  .spinner,

predictive-search:not([loading]) .predictive-search__loading-state {

display: none;

}

predictive-search[loading] .predictive-search,

predictive-search[open] .predictive-search {

display: block;

}

```

**Don't forget to copy/paste `predictive-search.liquid` section if you don't have one.**

  

5.  **Product Recommendations** - `product-recommendations.js`

  

Usage:

```html

<product-recommendations  data-url="{{  routes.product_recommendations_url }}?section_id={{  section.id }}&product_id={{  product.id }}&limit=4">

{%- if  recommendations.performed and recommendations.products_count > 0  -%}

{%- for  product in recommendations.products  -%}

{%- render  'product-card', product: product  -%}

{% endfor  %}

{%- endif  -%}

</product-recommendations>

```

6. 🆕**Klaviyo Back in Stock widget**

<br>Usage:

```html

1. Copy paste {%- section  'klaviyo-backinstock'  -%} to theme.liquid

2. In product.liquid add <script  type="application/json"  data-bis-variants>{{  product.variants | json }}</script> inside product form. (if you already have it just add data-bis-vaiants attribute)

3. Adjust klaviyo ID in this section. (in code or create section fields and let the client to edit it)

```

  
  

## Contributors

  

<!-- Copy-paste in your Readme.md file -->

  

<a  href="https://github.com/Sanj718">

<img  src="https://github.com/Sanj718.png?size=50"/>

</a>

<a  href="https://github.com/kaboomdev">

<img  src="https://github.com/kaboomdev.png?size=50"/>

</a>

<a  href="https://github.com/EvgeniyMukhamedjanov">

<img  src="https://github.com/EvgeniyMukhamedjanov.png?size=50"/>

</a>

<a  href="https://github.com/namurray">

<img  src="https://github.com/namurray.png?size=50"/>

</a>

  

##### License

Copyright (c) 2021 [Avex Designs](https://avexdesigns.com/)

  

Licensed under the MIT license.

  

Free as in beer 🍺.