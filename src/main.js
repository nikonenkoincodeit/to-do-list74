import { formEl } from "./refs";
import { saveDataForm } from "./api";

import "bootstrap/dist/css/bootstrap.min.css";
import "./css/style.css";

formEl.addEventListener("submit", readDataForm);

function readDataForm(event) {
  event.preventDefault();

  const value = event.target.message.value.trim();
  console.log(value);

  if (!value) {
    return;
  }

  const data = constructObject(value);
  saveDataForm(data);
}

function constructObject(value) {
  return {
    value,
    checked: false,
    id: Date.now(),
  };
}
