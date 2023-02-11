import { formEl, listEl } from "./refs";
import { saveDataForm, getDataPrev, saveData} from "./api";
import { createMarkup } from "./markup";


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
  const markup = createMarkup([data]);
  addMarkup(markup);
  event.target.reset();
}

function constructObject(value) {
  return {
    value,
    checked: false,
    id: Date.now(),
  };
}


function initDataOnLoad() { 
  const gettedData = getDataPrev();
  if (!gettedData.length) return;
    const markup = createMarkup(gettedData);
  addMarkup(markup);
}

initDataOnLoad();

function addMarkup(markup) { 
  listEl.insertAdjacentHTML("beforeend", markup);
}

listEl.addEventListener("click", onRemoveTask);

function onRemoveTask(event) { 
  if (event.target.nodeName !== "BUTTON") return;
  console.log(event.target.closest(".item"));
  const parent = event.target.closest(".item");
  const taskId = parent.dataset.id;
  console.log(taskId);
  parent.remove();
  const filteredData = getDataPrev().filter(({ id }) => id !== Number(taskId));
  console.log(filteredData);
  saveData(filteredData);
}
