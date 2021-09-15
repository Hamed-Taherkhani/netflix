const collections = document.querySelectorAll(".collection");
const moviesMatrix = createMatrix(collections);

/* Mouse listener */
moviesMatrix.forEach((value) => {
  for (let i = 0; i < value.childElementCount; i++) {
    value.children[i].addEventListener("mouseover", mouseOverHandler);
    value.children[i].addEventListener("mouseout", mouseOutHandler);
  }
});
function mouseOverHandler() {
  let elementStyle = this.style;
  elementStyle.transform = "scale(1.1)";
  elementStyle.zIndex = "1";
}

function mouseOutHandler() {
  let elementStyle = this.style;
  elementStyle.transform = "scale(1)";
  elementStyle.zIndex = "auto";
}
/* end */

function createMatrix(collections) {
  let collectionLength = collections.length,
    matrix = new Array(collectionLength);
  for (let i = 0; i < collectionLength; i++) {
    matrix[i] = collections[i].children[1];
  }
  return matrix;
}
