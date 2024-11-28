const modeItem = document.querySelectorAll(".form__mode-item label");
const modeIcon = document.querySelectorAll(".form__mode-item label svg");
const commonInput = document.querySelector(".form__mobile-common-input");

const cropInput = document.querySelector("#crop");
const fillInput = document.querySelector("#fill");
const contrastInput = document.querySelector("#contrast");

const uploadImage = document.querySelector(".form__picture img");

// Функция для применения изменений к изображению
let changeImage = function (style, styleValue, inputValue) {
  if (inputValue === "10") {
    uploadImage.style.setProperty(style, styleValue + "(1.0)");
  } else {
    uploadImage.style.setProperty(style, styleValue + "(0." + inputValue + ")");
  }
};

if (modeItem.length > 0) {
  commonInput.classList.toggle("form__mobile-common-input--disabled");
  commonInput.setAttribute("disabled", "disabled");

  for (let i = 0; i < modeItem.length; i++) {
    modeItem[i].onclick = function () {
      // Очистка стилей у иконок
      for (let c = 0; c < modeIcon.length; c++) {
        if (modeIcon[c].classList.contains("form__mode-icon--active")) {
          modeIcon[c].classList.remove("form__mode-icon--active");
        }
      }

      // Если отображается общий input radius, то выполняем
      let commonInputStyle = getComputedStyle(commonInput);
      if (commonInputStyle.display !== "none") {
        // Изменение стилей иконки
        modeIcon[i].classList.toggle("form__mode-icon--active");

        let item = document.getElementById(modeItem[i].htmlFor);
        let itemValue;

        if (item) {
          if (item.classList.contains("form__mode-input")) {
            itemValue = item.value;
            item.remove();
          }
        }

        // Изменение общего input radius
        if (
          commonInput.classList.contains("form__mobile-common-input--disabled")
        ) {
          commonInput.classList.remove("form__mobile-common-input--disabled");
          commonInput.removeAttribute("disabled");
        }
        commonInput.value = itemValue;
        commonInput.id = modeItem[i].htmlFor;
        commonInput.focus();
      }
    };
  }
}

if (commonInput) {
  commonInput.oninput = function () {
    if (commonInput.id === "crop") {
      changeImage("transform", "scale", commonInput.value);
    }

    if (commonInput.id === "fill") {
      changeImage("filter", "saturate", commonInput.value);
    }

    if (commonInput.id === "contrast") {
      changeImage("filter", "contrast", commonInput.value);
    }
  };
}

if (cropInput) {
  cropInput.oninput = function () {
    changeImage("transform", "scale", cropInput.value);
  };
}

if (fillInput) {
  fillInput.oninput = function () {
    changeImage("filter", "saturate", fillInput.value);
  };
}

if (contrastInput) {
  contrastInput.oninput = function () {
    changeImage("filter", "contrast", contrastInput.value);
  };
}
