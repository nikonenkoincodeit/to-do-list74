export function createMarkup(items = []) {
  return items
    .map(({ id, message, checked }) => {
      let classLM = checked ? "checked" : "";
      return `<li class="item ${classLM}" data-id=${id}>
        <p class="text">${message}</p>
        <button type="button" class="button">x</button>
      </li>`;
    })
    .join("");
}
