const form = document.querySelector(".form");
const input = document.querySelector(".input");
const ul = document.querySelector(".todos");

//preventing the default behaviour of the form
form.addEventListener("submit", (event) => {
  event.preventDefault();
  addingLI();
});

//creating and appending our li's
function addingLI() {
  let inputValue = input.value;
  let li = document.createElement("li");
  li.innerHTML = `<span class="task">${inputValue}</span
  ><i class="fa-solid fa-circle-xmark cross_btn"></i>`;
  ul.appendChild(li);
  input.value = "";
}

//creating our cross button functionality (Event Delegation)
ul.addEventListener("click", (event) => {
  if (event.target.classList.contains("cross_btn")) {
    //.task & .cross_btn are siblings
    //li is their parent node

    let crossBtn = event.target;
    let task = crossBtn.previousSibling;

    //opacity will go down
    //btn becomes disabled
    //li will acquire a line-through
    crossBtn.classList.add("completed");
    task.classList.add("completed");

    //here our li will be removed after 1sec
    setTimeout(() => {
      ul.removeChild(crossBtn.parentNode);
    }, 1000);
  }
});
