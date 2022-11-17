class SearchFormView {
  _parentElement = document.querySelector(".search");

  getSearchKey() {
    const query = this._parentElement.querySelector(".search__field").value;
    this._clearInput();
    return query;
  }
  addHandlerSearch(callback) {
    // document.querySelector(".search__btn").addEventListener("click", callback);
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      callback();
    });
  }
  _clearInput() {
    this._parentElement.querySelector(".search__field").value = "";
  }
}
export default new SearchFormView();
