import View from "./View";
import icons from "url:../../img/icons.svg";
class AddrecipeView extends View {
  _parentElement = document.querySelector(".upload");
  _window = document.querySelector(".add-recipe-window");
  _overlay = document.querySelector(".overlay");
  _bntOpen = document.querySelector(".nav__btn--add-recipe");
  _bntClose = document.querySelector(".btn--close-modal");
  _message = "Succesfull upload your own recipe!";

  constructor() {
    super();
    this._overlay.addEventListener("click", this.showHideForm.bind(this));
    this._bntClose.addEventListener("click", this.showHideForm.bind(this));
  }

  _generateHtml() {
    return `
        <div class="upload__column">
          <h3 class="upload__heading">Recipe data</h3>
          <label>Title</label>
          <input required name="title" type="text" />
          <label>URL</label>
          <input required name="sourceUrl" type="text" />
          <label>Image URL</label>
          <input required name="image" type="text" />
          <label>Publisher</label>
          <input required name="publisher" type="text" />
          <label>Prep time</label>
          <input required name="cookingTime" type="number" />
          <label>Servings</label>
          <input required name="servings" type="number" />
        </div>

        <div class="upload__column">
          <h3 class="upload__heading">Ingredients</h3>
          <label>Ingredient 1</label>
          <input
            type="text"
            required
            name="ingredient-1"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 2</label>
          <input
            type="text"
            name="ingredient-2"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 3</label>
          <input
            type="text"
            name="ingredient-3"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 4</label>
          <input
            type="text"
            name="ingredient-4"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 5</label>
          <input
            type="text"
            name="ingredient-5"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 6</label>
          <input
            type="text"
            name="ingredient-6"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
        </div>

        <button class="btn upload__btn">
          <svg>
            <use href="${icons}#icon-upload-cloud"></use>
          </svg>
          <span>Upload</span>
        </button>`;
  }
  showHideForm() {
    this._window.classList.toggle("hidden");
    this._overlay.classList.toggle("hidden");
  }

  addHandlerUpload(callback) {
    this._parentElement.addEventListener("submit", function (event) {
      event.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      callback(data);
    });
  }

  addHandlerOpenModal(callback) {
    this._bntOpen.addEventListener(
      "click",
      function () {
        this.showHideForm();
        callback();
      }.bind(this)
    );
  }
}
export default new AddrecipeView();
