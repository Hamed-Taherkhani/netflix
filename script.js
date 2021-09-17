const collections = document.querySelectorAll(".collection"),
  moviesMatrix = createMatrix(collections),
  categories = document.querySelector("#categories"),
  closeBtn = document.querySelector("#close"),
  header = document.querySelector("header"),
  htmlTag = document.querySelector("html"),
  webpageMode = document.querySelector("#mode"),
  lightMode = webpageMode.children[1],
  darkMode = webpageMode.children[0],
  nav = document.querySelector("aside nav"),
  navIcons = document.querySelectorAll("aside li img"),
  fade = document.querySelector("#fade"),
  play = document.querySelector("#play"),
  audio = new Audio(
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

/* key listener and change the focus of movie's box in category section */
let row = 0,
  column = 0,
  scaledElement = moviesMatrix[row][column],
  isFirst = true,
  flag = false,
  isFull = false;
window.addEventListener("keyup", moveBetweenMovies);
function moveBetweenMovies() {
  focusOnMovie(row, column, "1", "auto");
  changeTranslateZAndBlur("-15px", "0", "auto", collections[row]);
  let code = this.event.keyCode;
  if (!isFirst)
    switch (code) {
      case 37:
        column--;
        playAudio();
        break;
      case 38:
        row--;
        playAudio();
        break;
      case 39:
        column++;
        playAudio();
        break;
      case 40:
        row++;
        playAudio();
        break;
    }
  wholeScreenOrNot(code);
  if (!flag) {
    changeTranslateZAndBlur("-15px", "3px", "auto", ...collections);
    isFull = true;
  } else {
    changeTranslateZAndBlur("0", "0", "1", ...collections);
    isFull = false;
    flag = false;
  }
  if (row > 3) row = 0;
  if (row < 0) row = 3;
  if (column > 5) column = 0;
  if (column < 0) column = 5;
  focusOnMovie(row, column, "1.1", "1");
  changeTranslateZAndBlur("0", "0", "1", collections[row]);
  scaledElement = moviesMatrix[row][column];
  isFirst = false;
}

/* prevent arrow keys default */
window.onkeydown = (event) => {
  let code = event.keyCode;
  if (code === 38 || code === 40) event.preventDefault();
};

/* change web mode to dark or light */
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

/* end */
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

function increaseScale() {
  if (!isFull) {
    scaledElement.style.transform = "scale(1)";
    changeScaleZIndex(this, "1.1", "1");
  }
}

function decreaseScale() {
  if (!isFull) changeScaleZIndex(this, "1", "auto");
}

function changeScaleZIndex(element, scale, zI) {
  element.style.transform = `scale(${scale})`;
  element.style.zIndex = zI;
}

function playAudio() {
  audio.play();
  setTimeout(() => audio.load(), 500);
}

function changeTranslateZAndBlur(z, blur, zIndex, ...arg) {
  arg.forEach((value) => {
    value.style.transform = `translateZ(${z})`;
    value.style.filter = `blur(${blur})`;
    value.style.zIndex = zIndex;
  });
}

function focusOnMovie(row, column, scale, zI) {
  let = element = moviesMatrix[row][column];
  changeScaleZIndex(element, scale, zI);
  element.scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "center",
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
  let arrTemp = [],
    matrix = [];
  collections.forEach((value) => {
    arrTemp.push(...value.children[1].children);
    matrix.push(arrTemp);
    arrTemp = [];
  });
  return matrix;
}
