// Проверка заполненности полей
const submitButton = document.querySelector(".form-submit__button");
const popUpWarning = document.querySelector(".pop-up--warning .pop-up__wrapper--close");
const popUpSend = document.querySelector(".pop-up--send .pop-up__wrapper--close");
const popUpCloseBtns = document.querySelectorAll(".pop-up__btn-close");
const lastName = document.getElementById("lastname");
const name = document.getElementById("name");
const email = document.getElementById("email");

const allInputs = document.querySelectorAll(".input-text__input");

// Обязательные поля
let requiredInputs = [lastName, name, email];

let formCheck = true;

// Если есть - убираем `warning` у input
if (allInputs) {
  for (let i = 0; i < allInputs.length; i++) {
    allInputs[i].onfocus = function() {
      if (allInputs[i].classList.contains("input-text__input--warning")) {
        allInputs[i].classList.remove("input-text__input--warning");
      }
    };
  }
}

let checkInput = function(inputName, requiredInputs) {
  if (inputName.value === "") {

    // Помечаем пустые обязательные поля
    for (let i = 0; i < requiredInputs.length; i++) {
      if (requiredInputs[i].value === "") {
        if (!requiredInputs[i].classList.contains("input-text__input--warning")) {
          requiredInputs[i].classList.add("input-text__input--warning");
        }
      }
    }

    return false;
  } else {
    return true;
  }
}

let clearWarning = function(element) {
  element.classList.remove("input-text__input--warning");
}

if (submitButton) {
  submitButton.onclick = function(event) {
    event.preventDefault();

    if (formCheck) formCheck = checkInput(lastName, requiredInputs);
    if (formCheck) formCheck = checkInput(name, requiredInputs);
    if (formCheck) formCheck = checkInput(email, requiredInputs);

    if (!formCheck) {
      popUpWarning.classList.toggle("pop-up__wrapper--close");
      formCheck = true;
    } else {
      popUpSend.classList.toggle("pop-up__wrapper--close");
    }
  }
}

if (popUpCloseBtns) {

  for (let i = 0; i < popUpCloseBtns.length; i++) {
    popUpCloseBtns[i].onclick = function (event) {
      event.preventDefault();

      if (!popUpWarning.classList.contains("pop-up__wrapper--close")) {
        popUpWarning.classList.add("pop-up__wrapper--close");
      }
      if (!popUpSend.classList.contains("pop-up__wrapper--close")) {
        popUpSend.classList.add("pop-up__wrapper--close");
      }

    }
  }
}
