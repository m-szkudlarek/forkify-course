import icons from "url:../../img/icons.svg";
import View from "./View";
import "fractional";
class RecipeView extends View {
  _parentElement = document.querySelector(".recipe");
  _errorMessage = "Couldn't find any recipe.Pleas try again!";
  _message = "Start by searching for a recipe or an ingredient. Have fun!";

  _generateHtml() {
    const recipe = this._data;
    return `<figure class="recipe__fig">
    <img src="${recipe.image}" alt="${recipe.title}" class="recipe__img" />
    <h1 class="recipe__title">
      <span>${recipe.title}</span>
    </h1>
  </figure>

  <div class="recipe__details">
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">${
        recipe.cookingTime
      }</span>
      <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-users"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">${
        recipe.servings
      }</span>
      <span class="recipe__info-text">servings</span>

      <div class="recipe__info-buttons">
        <button class="btn--tiny btn--increase-servings" data-update-to=${
          recipe.servings - 1
        }>
          <svg>
            <use href="${icons}#icon-minus-circle"></use>
          </svg>
        </button>
        <button class="btn--tiny btn--increase-servings" data-update-to=${
          recipe.servings + 1
        }>
          <svg>
            <use href="${icons}#icon-plus-circle"></use>
          </svg>
        </button>
      </div>
    </div>

    <div class="recipe__user-generated ${recipe.key ? "" : "hidden"}">
      <svg>
        <use href="${icons}#icon-user"></use>
      </svg>
    </div>
    <button class="btn--round btn-bookmark">
      <svg class="">
        <use href="${icons}#icon-bookmark${
      recipe.bookmarked ? "-fill" : ""
    }"></use>
      </svg>
    </button>
  </div>

  <div class="recipe__ingredients">
    <h2 class="heading--2">Recipe ingredients</h2>
    <ul class="recipe__ingredient-list">
      ${recipe.ingredients
        .map(
          (element) =>
            `<li class="recipe__ingredient">
      <svg class="recipe__icon">
        <use href="${icons}#icon-check"></use>
      </svg>
      <div class="recipe__quantity">${
        element.quantity ? new Fraction(element.quantity).toString() : ""
      }</div>
      <div class="recipe__description">
        <span class="recipe__unit">${element.unit}</span>
        ${element.description}
      </div>
  </li>`
        )
        .join("\n")}
    </ul>
  </div>

  <div class="recipe__directions">
    <h2 class="heading--2">How to cook it</h2>
    <p class="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe__publisher">${
        recipe.publisher
      }</span>. Please check out
      directions at their website.
    </p>
    <a
      class="btn--small recipe__btn"
      href="${recipe.sourceUrl}"
      target="_blank"
    >
      <span>Directions</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </a>
  </div>`;
  }

  addHandlerRender(callback) {
    ["hashchange", "load"].forEach((e) => window.addEventListener(e, callback));
  }
  addHandlerServings(callback) {
    this._parentElement.addEventListener("click", function (e) {
      const clicked = e.target.closest("button");
      if (!clicked) return;
      const updateTo = Number(clicked.dataset.updateTo);
      if (updateTo > 0 && updateTo < 11) callback(updateTo);
    });
  }
  addHandlerBookmark(callback) {
    this._parentElement.addEventListener("click", function (e) {
      const clicked = e.target.closest(".btn-bookmark");
      if (!clicked) return;
      callback();
    });
  }
}

export default new RecipeView();
