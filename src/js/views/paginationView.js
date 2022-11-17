import icons from "url:../../img/icons.svg";
import View from "./View";
class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");
  _errorMessage = "Pagination error";
  _message = "";
  _generateHtml() {
    const page = this._data.currentPage;
    const maxpage = this._data.numberOfPage;
    const prevButton =
      page > 1 ? this._generetHtmlForButton("prev", "left", page - 1) : "";
    const nextButton =
      page < maxpage
        ? this._generetHtmlForButton("next", "right", page + 1)
        : "";
    return prevButton + nextButton;
  }
  _generetHtmlForButton(type, typeDirect, page) {
    return `<button data-goto=${page} class="btn--inline pagination__btn--${type}">
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-${typeDirect}"></use>
    </svg>
    <span>Page ${page}</span>
  </button>`;
  }

  addHandlerPaginationButton(callback) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");
      if (!btn) return;
      callback(Number(btn.dataset.goto));
    });
  }
}
export default new PaginationView();
