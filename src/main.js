import "bootstrap/dist/css/bootstrap.min.css";
import "./css/style.css";
import { formEl, listEl } from "./refs/";
import { save, load } from "./api";
import { createMarkup } from "./markup";

const STORAGE_KEY = "message";

formEl.addEventListener("submit", getValues);
init();

function getValues(ev) {
  ev.preventDefault();

  const message = ev.target.message.value.trim();
  if (!message) {
    return;
  }
  const resultCreate = createObj(message);

  const array = load(STORAGE_KEY);
  array.push(resultCreate);
  save(STORAGE_KEY, array);
  ev.target.reset();
  const markup = createMarkup([resultCreate]);
  addMarkup(markup);
}

function createObj(message) {
  return {
    message,
    id: Date.now(),
    checked: false,
  };
}

function init() {
  const dataValue = load(STORAGE_KEY);
  if (!dataValue.length) {
    return;
  }

  const markup = createMarkup(dataValue);
  addMarkup(markup);
}

function addMarkup(markup) {
  listEl.insertAdjacentHTML("beforeend", markup);
}
