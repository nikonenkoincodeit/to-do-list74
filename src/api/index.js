const STORAGE_KEY = "items";

export function saveDataForm(value) {
  const arrItem = getDataPrev();
  arrItem.push(value);
  saveData(arrItem);
}

export function getDataPrev() {
  try {
    const dataJson = localStorage.getItem(STORAGE_KEY);
    return dataJson ? JSON.parse(dataJson) : [];
  } catch (error) {
    console.log(error);
  }
}
export function saveData(dataArr=[])
{
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataArr));
}