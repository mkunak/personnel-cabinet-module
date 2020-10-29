/* eslint-disable max-len */

const exitWindow = document.querySelector(".exit-window");
const exitButton = document.querySelector(".sidebar__exit_button");
const agreeButton = document.querySelector(".exit-window .sidebar__quest-agree");
const cancelButton = document.querySelector(".exit-window .sidebar__quest-cancel");

exitButton.addEventListener("click", () => {
  exitWindow.classList.add("active");
});

agreeButton.addEventListener("click", () => {
  exitWindow.classList.remove("active");
});

cancelButton.addEventListener("click", () => {
  exitWindow.classList.remove("active");
});
