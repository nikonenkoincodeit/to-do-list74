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

  const {taskId, parent} = getTaskId(event);
  parent.remove();
  const filteredData = getDataPrev().filter(({ id }) => id !== Number(taskId));
  console.log(filteredData);
  saveData(filteredData);
}


listEl.addEventListener('click', onTaskSelected);
function onTaskSelected(event) { 
  if (event.target.nodeName !== "P") return;


  const {taskId, parent} = getTaskId(event);

  console.log(taskId, parent);

  const flag = parent.classList.toggle("checked");

  let tasks =  getDataPrev();
  const findedData = tasks.find(({ id }) => id === Number(taskId));
  console.log(findedData);
  findedData.checked = flag;
  saveData(tasks);
}

function getTaskId(event)
{
  const parent = event.target.closest(".item");
  const taskId = parent.dataset.id;
    return {taskId, parent};
}