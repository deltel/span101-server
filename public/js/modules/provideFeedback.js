export const provideFeedback = (element, message, className = "success") => {
  element.textContent = message;
  element.classList.toggle(className);
  setTimeout(() => {
    element.textContent = undefined;
    element.classList.toggle(className);
  }, 2000);
};
