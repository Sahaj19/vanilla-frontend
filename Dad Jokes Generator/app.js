let btn = document.querySelector(".btn");
let para = document.querySelector(".para");

let url = `https://icanhazdadjoke.com/`;

btn.addEventListener("click", () => {
  getJoke();
});

async function getJoke() {
  let config = {
    headers: {
      Accept: "application/json",
    },
  };
  let response = await fetch(url, config);
  let data = await response.json();
  let result = data.joke;
  para.innerText = result;
}
