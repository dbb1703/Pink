const table = document.querySelector(".table");
const priceDotsItems = document.querySelectorAll(".price__dots .dots__item");

let scrollPosition1 = 0;
let scrollPosition2 = 265;
let scrollPosition3 = 520;

if (table) {
  table.scrollLeft = scrollPosition2;
}

let changePriceItemActive = function (num) {
  for (let a = 0; a < priceDotsItems.length; a++) {
    priceDotsItems[a].classList.remove("dots__item--active");
  }
  priceDotsItems[num].classList.add("dots__item--active");
};

if (table) {
  for (let i = 0; i < priceDotsItems.length; i++) {
    priceDotsItems[i].onclick = function (event) {
      event.preventDefault();

      changePriceItemActive(i);

      if (i === 0) {
        table.scrollLeft = scrollPosition1;
      } else if (i === 1) {
        table.scrollLeft = scrollPosition2;
      } else if (i === 2) {
        table.scrollLeft = scrollPosition3;
      }
    };
  }
}

if (table) {
  table.addEventListener("scroll", function (e) {
    if (table.scrollLeft === scrollPosition1) {
      changePriceItemActive(0);
    } else if (
      table.scrollLeft < scrollPosition2 ||
      table.scrollLeft === scrollPosition2 ||
      table.scrollLeft < scrollPosition3
    ) {
      changePriceItemActive(1);
    } else if (
      table.scrollLeft === scrollPosition3 ||
      table.scrollLeft > scrollPosition3
    ) {
      changePriceItemActive(2);
    }
  });
}
