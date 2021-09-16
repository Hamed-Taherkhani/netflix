const collections = document.querySelectorAll(".collection");
const moviesMatrix = createMatrix(collections);
const categories = document.querySelector("#categories");
const closeBtn = document.querySelector("#close");
const audio = new Audio(
  "https://ringtonegram.ir/ringtones/RingtoneGram.IR_1613058833_18303.mp3"
);
audio.volume = 0.1;

/* Mouse listener */
closeBtn.onclick = () => wholeScreenOrNot(27);
moviesMatrix.forEach((arr) => {
  arr.forEach((value) => {
    value.addEventListener("mouseover", increaseScale);
    value.addEventListener("mouseout", decreaseScale);
  });
});
function increaseScale() {
  let elementStyle = this.style;
  scaledElement.style.transform = "scale(1)";
  elementStyle.transform = "scale(1.1)";
  elementStyle.zIndex = "1";
}

function decreaseScale() {
  let elementStyle = this.style;
  elementStyle.transform = "scale(1)";
  elementStyle.zIndex = "auto";
}

/* key listener */
let row = 0,
  column = 0,
  scaledElement = moviesMatrix[row][column],
  isFirst = true;
window.addEventListener("keyup", moveBetweenMovies);
function moveBetweenMovies() {
  scaledElement.style.transform = "scale(1)";
  let code = this.event.keyCode;
  if (!isFirst && (code === 37 || code === 38 || code === 39 || code === 40)) {
    switch (code) {
      case 37:
        column--;
        break;
      case 38:
        row--;
        break;
      case 39:
        column++;
        break;
      case 40:
        row++;
        break;
    }
    audio.play();
    setTimeout(() => audio.load(), 500);
  }
  wholeScreenOrNot(code);
  if (row > 3) row = 0;
  if (row < 0) row = 3;
  if (column > 5) column = 0;
  if (column < 0) column = 5;
  scaledElement = moviesMatrix[row][column];
  scaledElement.style.transform = "scale(1.1)";
  scaledElement.scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "center",
  });
  isFirst = false;
}

/* prevent arrow keys default */
window.onkeydown = (event) => {
  let code = event.keyCode;
  if (code === 38 || code === 40) event.preventDefault();
};

/* end */
function backdropBlur(blurLevel, top, padding) {
  categories.style.backdropFilter = `blur(${blurLevel}px)`;
  categories.style.top = top;
  categories.style.padding = padding + " 0 1rem";
}

function wholeScreenOrNot(code) {
  backdropBlur(10, "0", "13vh");
  if (code === 27) {
    backdropBlur(0, "80%", "0");
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }
}

function createMatrix(collections) {
  let collectionLength = collections.length,
    arrTemp = [],
    matrix = [];
  for (let i = 0; i < collectionLength; i++) {
    arrTemp.push(...collections[i].children[1].children);
    matrix.push(arrTemp);
    arrTemp = [];
  }
  return matrix;
}
