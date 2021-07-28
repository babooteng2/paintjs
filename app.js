// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const DEFAULT_COLOR = "#2c2c2c";

let painting = false;
let filling = false;

function init() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = ctx.fillStyle = DEFAULT_COLOR;
  ctx.lineWidth = 2.5;
}

function onMouseMove(e) {
  const x = e.offsetX;
  const y = e.offsetY;

  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function onMouseDown(e) {
  console.log(e);
  painting = true;
}

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function hd_colorPick(e) {
  const color = e.target.style.backgroundColor;
  ctx.strokeStyle = ctx.fillStyle = color;
}

function hd_rangeChange(e) {
  const range = e.target.value;
  ctx.lineWidth = range;
}

function hd_modeChange(e) {
  if (filling) {
    console.log(ctx.fillStyle);
    filling = false;
    mode.innerText = "fill";
  } else {
    filling = true;
    mode.innerText = "paint";
    ctx.fillStyle = ctx.strokeStyle;
  }
  console.log(filling);
}

function hd_canvasClick(e) {
  if (filling) ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function hd_saveClick(e) {
  const image = canvas.toDataURL("image/jpeg");
  const link = document.createElement("a");
  link.href = image;
  link.download = "paintJs[💟]";
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", hd_canvasClick);
  canvas.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });
}

if (colors) {
  Array.from(colors).forEach((prop) =>
    prop.addEventListener("click", hd_colorPick)
  );
}

if (range) {
  range.addEventListener("input", hd_rangeChange);
}

if (mode) {
  mode.addEventListener("click", hd_modeChange);
}

if (saveBtn) {
  saveBtn.addEventListener("click", hd_saveClick);
}

init();
