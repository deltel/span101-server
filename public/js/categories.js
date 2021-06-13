const filterByCategory = async (category, listBody) => {
  const response = await fetch(`/words?category=${category}`);
  const data = await response.json();

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
    const response = await fetch("/words/categories");
    const data = await response.json();

    listBody.innerHTML = null;

    data.forEach(populateList);
  };

  try {
    getData();
  } catch (e) {}
};
