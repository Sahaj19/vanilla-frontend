//All screens
const screens = document.querySelectorAll(".page");

//page-1
const start_btn = document.getElementById("start-btn");

//page-2
const choose_insects_btn = document.querySelectorAll(".choose-insect-btn");

//page-3
const timeEl = document.getElementById("time");
const scoreEl = document.getElementById("score");
const messageEl = document.getElementById("message");
const game_container = document.getElementById("game-container");

//global variables
let score = 0;
let seconds = 0;
let selected_insect = {};

//+++++++++++++++(1st screen movement)+++++++++++++++++++++++
start_btn.addEventListener("click", () => {
  screens[0].classList.add("up");
});

//++++++++++++++(2nd screen movement + game start logic)++++++
choose_insects_btn.forEach((button) => {
  button.addEventListener("click", () => {
    const img = button.querySelector("img");
    const src = img.getAttribute("src");
    const alt = img.getAttribute("alt");

    selected_insect = { src, alt };

    screens[1].classList.add("up");

    setTimeout(createInsect, 1000);
    startGame();
  });
});

//+++++++++++++++++++++(catch insect game)+++++++++++++++++++++++
function startGame() {
  setInterval(increaseTime, 1000);
}

//++++++++++++++++++++++(it will start out timer)++++++++++++++++
function increaseTime() {
  let min = Math.floor(seconds / 60);
  let sec = seconds % 60;
  min = min < 10 ? `0${min}` : min;
  sec = sec < 10 ? `0${sec}` : sec;
  timeEl.innerHTML = `Time : ${min}:${sec}`;
  seconds++;
}

//+++++++++++++++++(Creating our insect)++++++++++++++++++++++++++
function createInsect() {
  const insect_div = document.createElement("div");
  insect_div.classList.add("insect");

  insect_div.innerHTML = `<img 
  src="${selected_insect.src}" 
  alt="${selected_insect.alt}"
  style="transform : rotate(${Math.random() * 360}deg)" />`;

  const { x, y } = insectLocation();
  insect_div.style.top = `${y}px`;
  insect_div.style.left = `${x}px`;

  game_container.appendChild(insect_div);

  //in future when we use "this" keyword
  //inside catchInsect
  //it will represent insect class
  insect_div.addEventListener("click", catchInsect);
}

//random insect location (will be used to extract the top and left values)
function insectLocation() {
  const height = window.innerHeight;
  const width = window.innerWidth;
  const x = Math.random() * (width - 200) + 100;
  const y = Math.random() * (height - 200) + 100;
  return { x, y };
}

//+++++++++++++++++(functionality after catching the insect)++++++++++
function catchInsect() {
  increaseScore();
  this.classList.add("caught");
  setTimeout(() => {
    return this.remove();
  }, 0);
  addMoreInsects();
}

//+++++++++++++++++++++++(it will add more insects)+++++++++++++++++++
function addMoreInsects() {
  setTimeout(createInsect, 10);
  setTimeout(createInsect, 10);
  setTimeout(createInsect, 10);
  setTimeout(createInsect, 10);
  setTimeout(createInsect, 10);
  setTimeout(createInsect, 10);
  setTimeout(createInsect, 10);
  setTimeout(createInsect, 10);
  setTimeout(createInsect, 10);
  setTimeout(createInsect, 10);
}

////+++++++++++++++++++++++(It will increase our score board)++++++++++
function increaseScore() {
  score++;
  if (score >= 10) {
    messageEl.classList.add("mess_visible");
  }
  scoreEl.innerHTML = `Score : ${score}`;
}

//+++++++++++++++++++++++(end game logic)+++++++++++++++++++++++++++++++
const end_game_btn = document.querySelector("#end_game");

end_game_btn.addEventListener("click", () => {
  //removing the timer
  seconds = 0;
  timeEl.innerHTML = `Time : 00:00`;

  //remving our score
  score = 0;
  scoreEl.innerHTML = `Score : 0`;

  //removing our message
  messageEl.classList.remove("mess_visible");

  // Removing all insects from the game container
  const insects = document.querySelectorAll(".insect");
  insects.forEach((insect) => insect.remove());

  //moving to 1st page
  screens[1].classList.remove("up");
  screens[0].classList.remove("up");

  //reloding our page
  setTimeout(() => {
    location.reload();
  }, 500);
});
