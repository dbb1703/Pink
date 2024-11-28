const navMain = document.querySelector(".main-nav");
const navToggle = document.querySelector(".nav-toggle");
const navToggleText = document.querySelector(".nav-toggle__text");
const siteList = document.querySelector(".site-list");
const headerWrapper = document.querySelector(".header__wrapper");

navMain.classList.remove("main-nav--nojs");

if (document.documentElement.clientWidth < 1200 - getScrollbarWidth()) {
  navToggle.style.display = "block";
  navToggleText.style.display = "none";
}

window.addEventListener("resize", function () {
  if (document.documentElement.clientWidth < 1200 - getScrollbarWidth()) {
    navToggle.style.display = "block";
    navToggleText.style.display = "none";
  } else {
    navToggle.style.display = "none";
  }
});

navToggle.addEventListener("click", function () {
  siteList.classList.toggle("site-list--closed");
  navToggle.classList.toggle("nav-toggle--closed");
  navToggle.classList.toggle("nav-toggle--opened");
  headerWrapper.classList.toggle("header__wrapper--close");
});
