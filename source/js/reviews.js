const reviewContentItems = document.querySelectorAll(
  ".reviews__content .reviews__item"
);
const reviewContentItemsLength = reviewContentItems.length;
const reviewArrowPreview = document.querySelector(".reviews__arrow-preview");
const reviewArrowNext = document.querySelector(".reviews__arrow-next");

// Функция для отрисовки нужного количества точек-переключателей
let renderReviewDots = function (contentItemsLength) {
  // Контейнер для точек
  let reviewDotsWrapper = document.querySelector(".dots__wrapper");

  for (let d = 0; d < contentItemsLength; d++) {
    let reviewDot = makeElement("a", "dots__item");
    reviewDot.setAttribute("href", "#");

    if (d === 0) {
      reviewDot.classList.add("dots__item--active");
    }

    reviewDotsWrapper.appendChild(reviewDot);
  }

  let reviewsDots = document.querySelectorAll(".reviews__dots .dots__item");
  if (reviewsDots) return reviewsDots;
};

// Функция для удаления у точек-переключателей класса `active` (методом map)
let removeActiveClassInDots = function (dot) {
  dot.classList.remove("dots__item--active");
};

let reviewArrowClick = function (event, position) {
  event.preventDefault();

  let reviewsItemActive = 0;
  for (let i = 0; i < reviewContentItemsLength; i++) {
    if (reviewContentItems[i].classList.contains("reviews__item--active")) {
      reviewsItemActive = i;
      reviewContentItems[i].classList.remove("reviews__item--active");
    }
  }

  let countItems = reviewContentItemsLength - 1;
  if (reviewsItemActive > 0 && position === "prev") reviewsItemActive--;
  if (reviewsItemActive < countItems && position === "next")
    reviewsItemActive++;

  reviewContentItems[reviewsItemActive].classList.add("reviews__item--active");

  // Переназначаем активную точку
  let reviewAllDots = [
    ...document.querySelectorAll(".reviews__dots .dots__item"),
  ];
  // Убираем со всех точек класс `active`
  reviewAllDots.map(removeActiveClassInDots);
  // Добавляем класс `active` нужной точке
  reviewAllDots[reviewsItemActive].classList.add("dots__item--active");
};

if (reviewArrowPreview) {
  reviewArrowPreview.onclick = function (event) {
    reviewArrowClick(event, "prev");
  };
}

if (reviewArrowNext) {
  reviewArrowNext.onclick = function (event) {
    reviewArrowClick(event, "next");
  };
}

if (reviewContentItemsLength > 0) {
  // Создаем точки-переключатели исходя из кол-ва элементов contentItems
  const reviewDotsItems = renderReviewDots(reviewContentItemsLength);

  for (let i = 0; i < reviewContentItemsLength; i++) {
    reviewDotsItems[i].onclick = function (event) {
      event.preventDefault();

      // Убираем со всех точек и элементов слайдера класс `active`
      for (let a = 0; a < reviewDotsItems.length; a++) {
        reviewDotsItems[a].classList.remove("dots__item--active");
        reviewContentItems[a].classList.remove("reviews__item--active");
      }
      reviewDotsItems[i].classList.add("dots__item--active");
      reviewContentItems[i].classList.add("reviews__item--active");
    };
  }
}

// Использование swipe
const reviewsWrapper = document.querySelector(".reviews__wrapper");

if (reviewsWrapper) {
  // обработка свайпов
  reviewsWrapper.addEventListener("swiped-right", function (e) {
    reviewArrowClick(event, "prev");
  });

  reviewsWrapper.addEventListener("swiped-left", function (e) {
    reviewArrowClick(event, "next");
  });
}
