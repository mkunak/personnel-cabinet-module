/* eslint-disable max-len */

// selecting position
const positionBlocks = [...document.querySelectorAll(".main__form-positions-item")];

positionBlocks.forEach((block) => {
  block.addEventListener("click", () => {
    positionBlocks.forEach((positionBlock) => {
      positionBlock.classList.remove("active");
    });
    block.classList.add("active");
  });
});
