//global variables
var hit_random_number;
var timer = 30;
var score = 0;
var bubble_count;

//media queries
const windowWidth = window.innerWidth;
if (windowWidth >= 320 && windowWidth < 768) {
  bubble_count = 20;
} else if (windowWidth >= 768 && windowWidth < 1024) {
  bubble_count = 60;
} else if (windowWidth >= 1024) {
  bubble_count = 126;
}

//this function will generate new hit target after every refresh
function getNewHit() {
  hit_random_number = Math.floor(Math.random() * 10);
  document.querySelector(".hit-box").textContent = hit_random_number;
}

//this function will start the countdown timer
function startTimer() {
  let countDown = setInterval(function () {
    if (timer > 0) {
      timer--;
      document.querySelector(".timer-box").textContent = timer;
    } else {
      clearInterval(countDown);
      document.querySelector(
        ".down-container"
      ).innerHTML = `<h1>Thank you for playing!</h1>`;
      document.querySelector(".hit-box").textContent = "-";
    }
  }, 1000);
}

//this function will increase the score by 5
function increaseScore() {
  score += 5;
  document.querySelector(".increase-score").textContent = score;
}

//this function will generate buubles
function makeBubbles() {
  let clutter = "";
  for (let i = 1; i <= bubble_count; i++) {
    clutter += `<div class="bubble">${Math.floor(Math.random() * 10)}</div>`;
  }
  document.querySelector(".down-container").innerHTML = clutter;
}

//adding event listeners on bubble div parent , so that event bubbling can do it's magic
document
  .querySelector(".down-container")
  .addEventListener("click", (details) => {
    let bubble_shoot = Number(details.target.textContent);
    if (bubble_shoot === hit_random_number) {
      increaseScore();
      getNewHit();
      makeBubbles();
    }
  });

//invoking our functions
getNewHit();
startTimer();
makeBubbles();
