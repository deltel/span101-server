import { executeRequest } from "./modules/executeRequest.js";

const filterByCategory = async (category, listBody) => {
  const data = await executeRequest(`/words?category=${category}`);

  const populateList = (word) => {
    const listItem = document.createElement("li");
    const link = document.createElement("a");
    link.href = `/${word.id}`;
    const card = document.createElement("div");

    card.className = "card";
    card.textContent = word.value;
    link.appendChild(card);
    listItem.appendChild(link);
    listBody.appendChild(listItem);
  };

  listBody.innerHTML = null;

  data.forEach(populateList);
};

window.onload = async () => {
  const populateList = ({ keyword }) => {
    const listItem = document.createElement("li");
    const link = document.createElement("a");
    link.href = "#";
    link.addEventListener("click", (e) => {
      e.preventDefault();
      filterByCategory(keyword, listBody);
    });
    const card = document.createElement("div");

    card.className = "card";
    card.textContent = keyword;
    link.appendChild(card);
    listItem.appendChild(link);
    listBody.appendChild(listItem);
  };

  const listBody = document.querySelector(".list");

  const getData = async () => {
    const data = await executeRequest("/words/categories");

    listBody.innerHTML = null;

    data.forEach(populateList);
  };

  try {
    getData();
  } catch (e) {}
};
