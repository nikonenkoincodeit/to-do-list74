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

listEl.addEventListener("click", (ev) => {
  if (ev.target.tagName !== "BUTTON") {
    return;
  }
  const parent = ev.target.closest(".item");
  const taskId = parent.dataset.id;
  const items = load(STORAGE_KEY);
  const filterData = items.filter(({ id }) => {
    return Number(id) !== Number(taskId);
  });
  save(STORAGE_KEY, filterData);
  parent.remove();
});

listEl.addEventListener("click", (ev) => {
  if (ev.target.tagName !== "P") {
    return;
  }
  const parent = ev.target.closest(".item");
  parent.classList.toggle("checked");
});
