export function save(key, value) {
  const data = JSON.stringify(value);
  localStorage.setItem(key, data);
}
export function load(key) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.log(error.message);
  }
}
