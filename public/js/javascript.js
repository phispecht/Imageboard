const showInput = document.getElementById("show-input");
const inputElement = document.getElementsByClassName("input-form-element");
const inputForm = document.getElementsByClassName("input-form");

showInput.addEventListener("click", handleEvent);

function handleEvent() {
    for (let i = 0; i < inputElement.length; i++) {
        inputElement[i].classList.add("show");
        inputForm[0].classList.add("changeColor");
    }

    if (showInput.innerHTML == "Close") {
        for (let i = 0; i < inputElement.length; i++) {
            inputElement[i].classList.remove("show");
            inputForm[0].classList.remove("changeColor");
        }
        showInput.innerHTML = "Add Image";
        return;
    }
    showInput.innerHTML = "Close";
}
