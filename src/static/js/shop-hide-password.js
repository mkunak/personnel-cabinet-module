/* eslint-disable max-len */

const showPasswordButtons = [...document.querySelectorAll(".main__form-item_button")];
const passwordInputs = [...document.querySelectorAll(".password-input")];

showPasswordButtons.forEach((showPasswordButton, index) => {
  showPasswordButton.addEventListener("click", () => {
    if (passwordInputs[index].type === "password") {
      passwordInputs[index].type = "text";
    } else {
      passwordInputs[index].type = "password";
    }
  });
});
