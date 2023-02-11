export function createMarkup(items = []) { 
    return items.map(({ id, value, checked }) => {
        let classLM = checked ? "checked" : "";
        return `<li class="item ${classLM}" data-id=${id}>
        <p class="text">${value}</p>
        <button type="button" class="button">x</button>
      </li>`; }).join("");
}