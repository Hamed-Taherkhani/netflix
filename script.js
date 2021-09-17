const collections = document.querySelectorAll(".collection");
const moviesMatrix = createMatrix(collections);
const categories = document.querySelector("#categories");
const closeBtn = document.querySelector("#close");
const header = document.querySelector("header");
const htmlTag = document.querySelector("html");
const webpageMode = document.querySelector("#mode");
const audio = new Audio(
  "https://ringtonegram.ir/ringtones/RingtoneGram.IR_1613058833_18303.mp3"
);
audio.volume = 0.07;

/* Scroll handler */
let headerColor = "#000";
window.addEventListener("scroll", () => {
  let top = htmlTag.scrollTop;
  if (top < 70) header.style.backgroundColor = "#0000";
  else header.style.background = headerColor;
});

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
  isFirst = true,
  flag = false;
window.addEventListener("keyup", moveBetweenMovies);
function moveBetweenMovies() {
  scaledElement.style.transform = "scale(1)";
  scaledElement.style.zIndex = "auto";
  changeTranslateZAndBlur("-15px", "0", "auto", collections[row]);
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
  if (!flag) {
    changeTranslateZAndBlur("-15px", "3px", "auto", ...collections);
  } else {
    changeTranslateZAndBlur("0", "0", "1", ...collections);
    flag = false;
  }
  if (row > 3) row = 0;
  if (row < 0) row = 3;
  if (column > 5) column = 0;
  if (column < 0) column = 5;
  scaledElement = moviesMatrix[row][column];
  scaledElement.style.transform = "scale(1.1)";
  scaledElement.style.zIndex = "1";
  scaledElement.scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "center",
  });
  changeTranslateZAndBlur("0", "0", "1", collections[row]);
  isFirst = false;
}

/* prevent arrow keys default */
window.onkeydown = (event) => {
  let code = event.keyCode;
  if (code === 38 || code === 40) event.preventDefault();
};

/* change web mode to dark or light */
const lightMode = webpageMode.children[1],
  darkMode = webpageMode.children[0],
  nav = document.querySelector("aside nav"),
  navIcons = document.querySelectorAll("aside li img"),
  fade = document.querySelector("#fade"),
  play = document.querySelector("#play");
let isDarkMode = true;

webpageMode.addEventListener("click", () => {
  if (isDarkMode) {
    syncColor("none", "inline-block", "#000000", "#ffffff", 0, "#017eff");
    isDarkMode = false;
  } else {
    syncColor("inline-block", "none", "#ffffff", "#000000", 100, "#f1f1f1");
    isDarkMode = true;
  }
});

function syncColor(dDisplay, lDisplay, from, to, brightness, btnColor) {
  darkMode.style.display = dDisplay;
  lightMode.style.display = lDisplay;
  document.body.style.background = to;
  document.body.style.color = from;
  navIcons.forEach(
    (value) => (value.style.filter = `brightness(${brightness})`)
  );
  nav.style.borderRight = `1px solid ${from}25`;
  fade.style.background = `linear-gradient(90deg,${to} 10%, #fff0 60%)`;
  play.style.background = btnColor;
  headerColor = to;
  closeBtn.style.color = "#fff";
}

/* end */
function changeTranslateZAndBlur(z, blur, zIndex, ...arg) {
  arg.forEach((value) => {
    value.style.transform = `translateZ(${z})`;
    value.style.filter = `blur(${blur})`;
    value.style.zIndex = zIndex;
  });
}
function backdropBlur(blurLevel, top, padding) {
  categories.style.backdropFilter = `blur(${blurLevel}px)`;
  categories.style.top = top;
  categories.style.padding = padding + " 0 1rem";
}

function wholeScreenOrNot(code) {
  if (code === 27) {
    backdropBlur(0, "80%", "0");
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
    flag = true;
  } else backdropBlur(10, "0", "13vh");
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
