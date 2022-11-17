import View from "./View";
import previewView from "./previewView";
class BookmarkView extends View {
  _parentElement = document.querySelector(".bookmarks__list");
  _errorMessage = "No bookmarks yet. Find a nice recipe and bookmark it :)";
  _message = "";

  _generateHtml() {
    const bookmarks = this._data;
    return bookmarks
      .map((element) => previewView.render(element, false))
      .join("");
  }

  addHandlerRenderBookmarks(callback) {
    window.addEventListener("load", callback);
  }
}
export default new BookmarkView();
