import "core-js/stable";
import { async } from "regenerator-runtime";
import "regenerator-runtime/runtime";
import * as model from "./model";
import recipeView from "./views/recipeView";
import searchResultView from "./views/searchResultView";
import searchFormView from "./views/searchFormView";
import paginationView from "./views/paginationView";
import bookmarkView from "./views/bookmarkView";
import addRecipeView from "./views/addRecipeView";
import { MODAL_CLOSE_TIME_SEC } from "./config";

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRenderRecipe = async function () {
  try {
    // Take recepi id from hash url
    const recipeId = window.location.hash.slice(1);
    if (!recipeId) return;
    //render spinner when waitning for data fetch
    recipeView.renderSpinner();

    //1.Loadin data to object state
    await model.loadRecipe(recipeId);
    //2.render search recipe
    recipeView.render(model.state.recipe);

    // update bgc on search view and same for bookmarks
    searchResultView.update(model.getSearchRecipesPage());
    bookmarkView.update(model.state.bookmarks);
  } catch (error) {
    recipeView.renderErrorMessage();
  }
};
const controlSearchRecipes = async function () {
  try {
    // get search key from user
    const searchKey = searchFormView.getSearchKey();
    if (!searchKey) return;
    searchResultView.renderSpinner();

    // 1.load data to state
    await model.searchRecipes(searchKey);
    // 2. render search view
    searchResultView.render(model.getSearchRecipesPage());
    // 3. render pagination
    paginationView.render(model.state.search);
  } catch (error) {
    searchResultView.renderErrorMessage();
  }
};
const controlPagination = function (goto) {
  searchResultView.render(model.getSearchRecipesPage(goto));
  paginationView.render(model.state.search);
};

const controlServingsNumber = function (numberOfServings) {
  model.updateServings(numberOfServings);
  recipeView.update(model.state.recipe);
};

const controlBookmarks = function () {
  try {
    if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
    else model.unBookmark(model.state.recipe);
    bookmarkView.render(model.state.bookmarks);
  } catch (error) {
    bookmarkView.renderErrorMessage();
  }
  recipeView.update(model.state.recipe);
};
const loadBookmarksFromLoacalStorage = function () {
  try {
    if (model.state.bookmarks.length === 0) throw new Error();
    bookmarkView.render(model.state.bookmarks);
  } catch (error) {
    bookmarkView.renderErrorMessage();
  }
};
const openUploadRecipe = function () {
  addRecipeView.render("somethingToWork");
};

const controlUploadRecipe = async function (newRecipeData) {
  try {
    addRecipeView.renderSpinner();

    await model.setUploadData(newRecipeData);
    // render upload recipe on screen
    recipeView.render(model.state.recipe);

    addRecipeView.renderMessage();
    bookmarkView.render(model.state.bookmarks);
    searchResultView.update(model.getSearchRecipesPage());
    // change id of the url
    window.history.pushState(null, "", `#${model.state.recipe.id}`);
    // wait for close modal open
    setTimeout(function () {
      addRecipeView.showHideForm();
    }, MODAL_CLOSE_TIME_SEC * 1000);
  } catch (error) {
    addRecipeView.renderErrorMessage(error.message);
    setTimeout(function () {
      addRecipeView.showHideForm();
    }, MODAL_CLOSE_TIME_SEC * 1000);
  }
};
const init = function () {
  recipeView.addHandlerRender(controlRenderRecipe);
  searchFormView.addHandlerSearch(controlSearchRecipes);
  paginationView.addHandlerPaginationButton(controlPagination);
  recipeView.addHandlerServings(controlServingsNumber);
  recipeView.addHandlerBookmark(controlBookmarks);
  bookmarkView.addHandlerRenderBookmarks(loadBookmarksFromLoacalStorage);
  addRecipeView.addHandlerUpload(controlUploadRecipe);
  addRecipeView.addHandlerOpenModal(openUploadRecipe);
};
init();

// ["hashchange", "load"].forEach((e) => window.addEventListener(e, showRecipe));
