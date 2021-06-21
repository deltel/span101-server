import { transformLabel } from "./modules/utils.js";
import { executeRequest } from "./modules/executeRequest.js";

window.onload = async () => {
  const contentDiv = document.querySelector(".content");
  const updateInfoDiv = document.querySelector(".update-info");
  const titleDiv = document.querySelector(".title");
  const editPencil = document.querySelector(".edit-pencil");

  const clickHandler = (data) => {
    localStorage.setItem("word", JSON.stringify(data));
    window.location.assign(`/edit${window.location.pathname}`);
  };

  try {
    const responseJson = await executeRequest(
      `/words${window.location.pathname}`
    );
    const data = responseJson[0];

    editPencil.addEventListener("click", () => clickHandler(data));

    Object.keys(data).forEach((key) => {
      const returnArr = ["id", "created_at", "updated_at", "value"];
      if (returnArr.includes(key)) return;

      const div = document.createElement("div");
      div.className = "content-group";
      const labelSpan = document.createElement("span");
      labelSpan.className = "label";
      labelSpan.textContent = transformLabel(key);

      const valueSpan = document.createElement("span");
      valueSpan.className = "value";
      valueSpan.textContent = data[key];

      div.appendChild(labelSpan);
      div.appendChild(valueSpan);

      contentDiv.appendChild(div);
    });

    Object.keys(data).forEach((key) => {
      const returnArr = ["created_at", "updated_at"];
      if (!returnArr.includes(key)) return;

      const div = document.createElement("div");
      div.className = "info-group";
      const labelSpan = document.createElement("span");
      labelSpan.className = "label";
      labelSpan.textContent = transformLabel(key) + ": ";

      const valueSpan = document.createElement("span");
      valueSpan.className = "value";
      valueSpan.textContent = new Date(data[key]).toString().slice(0, 15);

      div.appendChild(labelSpan);
      div.appendChild(valueSpan);

      updateInfoDiv.appendChild(div);
    });
    titleDiv.textContent = data.value;
  } catch (e) {}
};
