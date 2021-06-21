import { provideFeedback } from "./modules/provideFeedback.js";
import { getId } from "./modules/utils.js";

window.onload = async () => {
  const valueField = document.querySelector("#value");
  const translationField = document.querySelector("#translation");
  const categoryField = document.querySelector("#category");
  const keywordField = document.querySelector("#keyword");
  const partOfSpeechField = document.querySelector("#partOfSpeech");
  const exampleField = document.querySelector("#example");
  const form = document.querySelector("form");
  const feedbackDiv = document.querySelector(".feedback");

  const id = getId();
  const wordData = JSON.parse(localStorage.getItem("word"));
  localStorage.removeItem("word");

  valueField.value = wordData.value;
  translationField.value = wordData.translation;
  partOfSpeechField.value = wordData.part_of_speech;
  categoryField.value = wordData.category;
  keywordField.value = wordData.keyword;
  exampleField.value = wordData.example;

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = {
      value: valueField.value,
      translation: translationField.value,
      part_of_speech: partOfSpeechField.value,
      category: categoryField.value,
      keyword: keywordField.value,
      example: exampleField.value,
    };

    const response = await fetch(`/words/${id}`, {
      method: "PATCH",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseJson = await response.json();

    if (response.status !== 200) {
      provideFeedback(feedbackDiv, responseJson.error, "danger");
      return;
    }

    provideFeedback(feedbackDiv, "Successfully updated");
  };

  form.onsubmit = submitHandler;
};
