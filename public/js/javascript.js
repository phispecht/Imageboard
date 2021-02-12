const showInput = document.getElementsByClassName("show-input");
const logo = document.getElementsByClassName("logo");
const iconClose = document.getElementsByClassName("fa-times-circle");
const inputElement = document.getElementsByClassName("input-form-element");
const inputForm = document.getElementsByClassName("input-form");

showInput[0].addEventListener("click", handleEvent);

function handleEvent() {
    console.log(iconClose);
    if (iconClose.length == 0) {
        for (let i = 0; i < inputElement.length; i++) {
            inputElement[i].classList.add("show");
        }
        inputForm[0].classList.add("changeColor");
        inputForm[0].classList.add("input-form-hamburger-menu");
        logo[0].classList.add("logo-hamburger-menu");
        showInput[0].innerHTML = `<i class="fa fa-times-circle fa-lg"></i>`;
    } else {
        for (let i = 0; i < inputElement.length; i++) {
            inputElement[i].classList.remove("show");
        }
        inputForm[0].classList.remove("changeColor");
        inputForm[0].classList.remove("input-form-hamburger-menu");
        logo[0].classList.remove("logo-hamburger-menu");
        showInput[0].innerHTML = `<i class="fa fa-bars fa-2x"></i>`;
    }
}
