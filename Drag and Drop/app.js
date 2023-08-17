//selecting html elements
let boxes = document.querySelectorAll(".box");
let image = document.querySelector("#image");

//event listeners on boxes
for (let box of boxes) {
  box.addEventListener("dragover", dragOver);
  box.addEventListener("dragenter", dragEnter);
  box.addEventListener("dragleave", dragLeave);
  box.addEventListener("drop", dragDrop);
}

//event listeners on image
image.addEventListener("dragstart", dragStart);
image.addEventListener("dragend", dragEnd);

//image functions
function dragStart() {
  setTimeout(() => {
    image.id = "none";
  }, 0);
}

function dragEnd() {
  image.id = "image";
}

//box functions
function dragOver(e) {
  e.preventDefault();
  this.classList.add("hover");
}

function dragEnter(e) {
  e.preventDefault();
}

function dragLeave() {
  this.classList.remove("hover");
}

function dragDrop() {
  this.className = "box";
  this.appendChild(image);
}
