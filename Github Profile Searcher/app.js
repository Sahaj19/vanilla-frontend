//API
let userAPI = `https://api.github.com/users/`;

//html elements
let form = document.querySelector("#form");
let input = document.querySelector("#input");
let main = document.querySelector(".main");

//form submission event
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    let profileName = input.value;
    let GithubResult = await getUser(profileName);
    appendingUserInfo(GithubResult);
    input.value = "";
  } catch (error) {
    alert("User Don't Exist!!");
    input.value = "";
    main.innerHTML = "";
  }
});

//getting response using axios request
async function getUser(username) {
  let { data: response } = await axios.get(userAPI + username);
  return response;
}

//appending user info function
function appendingUserInfo(user) {
  let requiredHTML = `
    <div id="card">
        <div class="image">
            <img
                 src=${user.avatar_url}
                 alt="user-image"
                 class="user-image"
            />
        </div>
        <div class="user-info">
            <h2>${user.name}</h2>

            <p>${user.bio}</p>
            
            <ul>
                <li>${user.followers} <strong>Followers</strong></li>
                <li>${user.following}<strong>Following</strong></li>
                <li>${user.public_repos} <strong>Repos</strong></li>
            </ul>

            <div id="repos">
                <a href=${user.html_url} class="repo" target="_blank">Github Profile Link</a>
            </div>
        </div>
  </div>
    `;

  main.innerHTML = requiredHTML;
}
