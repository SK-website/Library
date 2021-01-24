"use strict";

// DOM Elements
const cardContainer = document.querySelector(".card-container");
const btn = document.querySelector(".btn-add-user");
const form = document.querySelector(".add-user-form");

//получение и визуализация списка пользователей

function getUsersList(cb) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://jsonplaceholder.typicode.com/users");
  xhr.send();
  xhr.addEventListener("load", () => {
    if (xhr.status !== 200) {
      console.log("Error");
      return;
    }
    const response = JSON.parse(xhr.responseText);
    cb(response);
  });
}

getUsersList(createUsersList);

function createUsersList(res) {
  console.log(res);
  res.forEach((el) => {
    const card = userCardTemplate(el);
    cardContainer.insertAdjacentHTML("beforeend", card);
  });
}

function userCardTemplate(user) {
  return `
  <div class="card mb-3">
   <div class="card-body">
     <h5 class="card-title">${user.name}</h5>
       <ul class="list-group list-group-flush">
	<li class="list-group-item"><b>Email:</b> ${user.email}</li>
	<li class="list-group-item"><b>Phone number: </b> ${user.phone}</li>
       </ul>
       <div class="card-footer text-muted">Website: <a href="#"> ${user.website}</a></div>
     </div>
   </div>
 `;
}

// отправка POST запроса
function createPost(body, cb) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "https://jsonplaceholder.typicode.com/users");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(body));
  xhr.addEventListener("load", () => {
    if (Math.floor(xhr.status / 100) !== 2) {
      console.log("Error", xhr.status);
      return;
    }
    const response = JSON.parse(xhr.responseText);
    cb(response);
  });
}
form.addEventListener("submit", onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  const inputs = [...form.elements].filter((el) => el.nodeName !== "BUTTON");
  console.log(inputs);

  const newPost = inputs.reduce((acc, input) => {
    acc[input.name] = input.value;
    return acc;
  }, {});
  const inputsValue = [...form.elements].forEach((e) => {
    e.value = "";
  });
  createPost(newPost, onCreatePostResponse);
}
function onCreatePostResponse(res) {
  const newUserCard = userCardTemplate(res);
  cardContainer.insertAdjacentHTML("beforeend", newUserCard);
}
