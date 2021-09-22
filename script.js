const APIURL = "https://api.github.com/users/";

const main = document.querySelector("main");
const search = document.querySelector("#search");
const form = document.querySelector("#form");

getUser("deeppsy");

async function getUser(username) {
  const resp = await fetch(APIURL + username);
  const respData = await resp.json();

  console.log(respData);

  createUserCard(respData);
  getRepos(username);
}

async function getRepos(username) {
  const resp = await fetch(APIURL + username + "/repos");
  const respData = await resp.json();

  addReposToCard(respData);
}

function createUserCard(user) {
  const cardHTML = `
    <div class = "card">
        <div>
            <img class="avatar" src="${user.avatar_url}" alt ="${user.name}" />
        </div>
        <div class ="user-info">
            <h2>${user.name}</h2>
            <h4>${user.location}</h4>
            <p>${user.bio}</p>
            <ul class = "info">
                <li>${user.followers}<strong>Followers</strong></li>
                <li>${user.following}<strong>Following</strong></li>
                <li>${user.public_repos}<strong>Repos</strong></li>
            </ul>
            
            
            <div id = "repos">

            </div>
        </div>
    </div>
  
  `;

  main.innerHTML = cardHTML;
}

function addReposToCard(repos) {
  const reposEl = document.getElementById("repos");

  repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  repos.slice(0, 10).forEach((repo) => {
    const repoEl = document.createElement("a");
    repoEl.classList.add("repo");
    repoEl.href = repo.html_url;
    repoEl.target = "_blank";
    repoEl.innerText = repo.name;

    reposEl.appendChild(repoEl);
  });

  console.log(repos);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = search.value;
  if (user) {
    getUser(user);

    search.value = "";
  }
});
