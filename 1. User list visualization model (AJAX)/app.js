"use strict";

const container = document.querySelector(".container");
let arrayOfUsers = [];

function getAllUsers() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://jsonplaceholder.typicode.com/users");
  xhr.send();
  xhr.addEventListener("load", () => {
    if (xhr.status !== 200) {
      console.log("Error");
      return;
    }
    const response = JSON.parse(xhr.responseText);
    arrayOfUsers = response.concat();
    namesList(response);
  });
}

function namesList(users) {
  const fragment = document.createDocumentFragment();
  users.forEach((user) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("style", "width: 30rem");
    const userName = document.createElement("h6");
    userName.classList.add("card-header");
    userName.textContent = user.name;
    userName.dataset.id = user.id;
    card.appendChild(userName);
    fragment.appendChild(card);
  });
  container.appendChild(fragment);
}
getAllUsers();

function getUser(users, id) {
  const user = users.find((user) => user.id == id);
  return user;
}

function openObject(el) {
  const ul2 = document.createElement("ul");
  const arrOfData = Object.entries(el);
  arrOfData.forEach((el) => {
    const liItem = document.createElement("li");
    if (typeof el[1] === "object") {
      liItem.textContent = `${el[0]}: `;
      let ul3 = openObject(el[1]);
      liItem.insertAdjacentElement("beforeend", ul3);
    } else {
      liItem.textContent = el[0] + ": " + el[1];
    }
    ul2.appendChild(liItem);
  });
  return ul2;
}

function getUserInfo(user) {
  const arrayOfUserData = Object.entries(user);
  const ul = document.createElement("ul");
  ul.classList.add("list-group", "list-group-flush");
  ul.textContent = "Вся информация о пользователе";

  arrayOfUserData.forEach((el) => {
    const li = document.createElement("li");
    li.classList.add("list-group-item");
    if (typeof el[1] === "object") {
      li.textContent = `${el[0]}: `;
      let ul2 = openObject(el[1]);
      li.insertAdjacentElement("beforeend", ul2);
    } else {
      li.textContent = `${el[0]}:  ${el[1]}`;
    }
    ul.appendChild(li);
  });
  return ul;
}

container.addEventListener("click", (e) => {
  if (e.target.matches(".card-header")) {
    const elem = e.target;
    const dataId = elem.getAttribute("data-id");
    const user = getUser(arrayOfUsers, dataId);
    const info = getUserInfo(user);
    elem.insertAdjacentElement("afterend", info);
  }
});
