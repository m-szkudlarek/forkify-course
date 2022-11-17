import icons from "url:../../img/icons.svg";
export default class View {
  _data;

  render(data, render = true) {
    if (!data) return this.renderErrorMessage();
    this._data = data;
    const markup = this._generateHtml();
    if (!render) return markup;

    this._insertHtml(markup);
  }
  update(data) {
    if (!data) return this.renderErrorMessage();
    this._data = data;
    const newMarkup = this._generateHtml();
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll("*"));
    const currentElements = Array.from(
      this._parentElement.querySelectorAll("*")
    );

    newElements.forEach((newEl, index) => {
      const curEl = currentElements[index];
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ""
      )
        curEl.textContent = newEl.textContent;

      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach((attr) => {
          curEl.setAttribute(attr.name, attr.value);
        });
    });
  }
  _insertHtml(markup) {
    this._parentElement.innerHTML = "";
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  renderSpinner() {
    const html = `
        <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>`;
    this._insertHtml(html);
  }

  renderErrorMessage(message = this._errorMessage) {
    const html = `<div class="error">
    <div>
      <svg>
        <use href="${icons}#icon-alert-triangle"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div>`;
    this._insertHtml(html);
  }
  renderMessage(message = this._message) {
    const html = `<div class="message">
    <div>
      <svg>
        <use href="${icons}#icon-smile"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div>`;
    this._insertHtml(html);
  }
}
