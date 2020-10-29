/* eslint-disable max-len */

// hide and show error and success messages
const changePasswordButton = document.querySelector(".cabinet__form-change-password");
const successMessage = document.querySelector(".sidebar__success");
const errorMessage = document.querySelector(".sidebar__error");

changePasswordButton.addEventListener("click", () => {
  console.log("asd");
  if (Math.random() < 0.5) {
    successMessage.classList.add("active");
  } else {
    errorMessage.classList.add("active");
  }
  setTimeout(() => {
    successMessage.classList.remove("active");
    errorMessage.classList.remove("active");
  }, 3000);
});
