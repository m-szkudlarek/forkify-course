import previewView from "./previewView";
import View from "./View";
class SearchResultView extends View {
  _parentElement = document.querySelector(".results");
  _errorMessage = "No search result for this query";
  _message = "";

  _generateHtml() {
    const searched = this._data;
    return searched
      .map((element) => previewView.render(element, false))
      .join("");
  }
  addHandlerSelectRecipe(callback) {
    this._parentElement.addEventListener("click", callback);
  }
}
export default new SearchResultView();
