import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';
import { formEl, listEl } from './refs/';
import { save, load } from './api';

const STORAGE_KEY = 'message';

formEl.addEventListener('submit', getValues);

function getValues(ev) {
  ev.preventDefault();

  const message = ev.target.message.value.trim();
  if (!message) {
    return;
  }
  const array = load(STORAGE_KEY);
  array.push(createObj(message));
  save(STORAGE_KEY, array);
  ev.target.reset();
}

function createObj(message) {
  return {
    message,
    id: Date.now(),
    checked: false,
  };
}
