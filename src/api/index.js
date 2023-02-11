const STORAGE_KEY = "items";

export function saveDataForm(value) {
  const arrItem = getDataPrev();
  arrItem.push(value);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(arrItem));
}

export function getDataPrev() {
  try {
    const dataJson = localStorage.getItem(STORAGE_KEY);
    return dataJson ? JSON.parse(dataJson) : [];
  } catch (error) {
    console.log(error);
  }
}
