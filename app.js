const canvas = document.getElementById("jsCanvas");
let painting = false;

function stopPainging() {
  painting = false;
}

function onMouseMove(e) {
  if (!painting) return;
  const x = e.offsetX;
  const y = e.offsetY;

  console.log(`x : ${x}, y : ${y}`);
}

function onMouseDown(e) {
  console.log(e);
  painting = true;
}
function onMouseUp(e) {
  stopPainging();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", onMouseDown);
  canvas.addEventListener("mouseup", onMouseUp);
  canvas.addEventListener("mouseleave", stopPainging());
}
