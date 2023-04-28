import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';
import { formEl, listEl } from './refs/';
import { save, load } from './api';
import { createMarkup } from './markup';

const STORAGE_KEY = 'message';

formEl.addEventListener('submit', getValues);
listEl.addEventListener('click', isChecked);
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
  listEl.insertAdjacentHTML('beforeend', markup);
}

listEl.addEventListener('click', ev => {
  if (ev.target.tagName !== 'BUTTON') {
    return;
  }
  const parent = ev.target.closest('.item');
  const taskId = parent.dataset.id;
  const items = load(STORAGE_KEY);
  const filterData = items.filter(({ id }) => {
    return Number(id) !== Number(taskId);
  });
  save(STORAGE_KEY, filterData);
  parent.remove();
});

function isChecked(event) {
  if (event.target.tagName !== 'P') {
    return;
  }

  if (!event.target.parentNode.classList.contains('checked')) {
    addChecked(event);
  } else {
    disChecked(event);
  }
}

function addChecked(ev) {
  ev.target.parentNode.classList.add('checked');
  const taskId = Number(ev.target.parentNode.dataset.id);
  const items = load(STORAGE_KEY);
  const checkedArr = items.map(el => {
    if (el.id === taskId) {
      el.checked = true;
    }
    return el;
  });
  save(STORAGE_KEY, checkedArr);
}

function disChecked(ev) {
  ev.target.parentNode.classList.remove('checked');
  const taskId = Number(ev.target.parentNode.dataset.id);
  const items = load(STORAGE_KEY);
  const checkedArr = items.map(el => {
    if (el.id === taskId) {
      el.checked = false;
    }
    return el;
  });
  save(STORAGE_KEY, checkedArr);
}
