// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

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
  ctx.strokeStyle = color;
}

function hd_rangeChange(e) {
  const range = e.target.value;
  ctx.lineWidth = range;
}

function hd_modeChange(e) {
  if (filling) {
    filling = false;
    mode.innerText = "fill";
  } else {
    filling = true;
    mode.innerText = "paint";
  }
  console.log(filling);
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
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
