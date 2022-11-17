import { async } from "regenerator-runtime/runtime";
import { API_URL, ITEM_ON_PAGE, API_KEY } from "./config";
import { AJAX } from "./helper";
export const state = {
  recipe: {},
  search: {
    searchKey: "",
    result: [],
    resultPerPage: ITEM_ON_PAGE,
    numberOfPage: 0,
    currentPage: 1,
  },
  bookmarks: [],
};
const creatRecipeObject = function (data) {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    sourceUrl: recipe.source_url,
    publisher: recipe.publisher,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};
export const loadRecipe = async function (recipeId) {
  try {
    const data = await AJAX(`${API_URL}/${recipeId}?key=${API_KEY}`);
    state.recipe = creatRecipeObject(data);
    if (state.bookmarks.some((b) => b.id === recipeId))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (error) {
    throw error;
  }
};

export const searchRecipes = async function (searchKey) {
  try {
    state.search.searchKey = searchKey;
    const data = await AJAX(`${API_URL}?search=${searchKey}&key=${API_KEY}`);
    state.search.result = data.data.recipes.map((rec) => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
        ...(rec.key && { key: rec.key }),
      };
    });
    state.search.currentPage = 1;
    state.search.numberOfPage = calculateNumberOfPage(
      state.search.result.length,
      state.search.resultPerPage
    );
    if (!state.search.result.length) throw new Error();
  } catch (error) {
    throw error;
  }
};

export const getSearchRecipesPage = function (page = state.search.currentPage) {
  state.search.currentPage = page;
  return state.search.result.slice(
    (page - 1) * state.search.resultPerPage,
    page * state.search.resultPerPage
  );
};

const calculateNumberOfPage = function (lengthResults, resultsPerPage) {
  return Math.ceil(lengthResults / resultsPerPage);
};

export const updateServings = function (newNumberServings = 4) {
  state.recipe.ingredients.forEach((element) => {
    element.quantity =
      element.quantity * (newNumberServings / state.recipe.servings);
  });
  state.recipe.servings = newNumberServings;
};

export const addBookmark = function (recipe) {
  //Add recipe to bookmark state
  state.bookmarks.push(recipe);
  // jesli to ten co jest wyswietlany na true
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  setLocalStoragOfBookmarks();
};

export const unBookmark = function (recipe) {
  const index = state.bookmarks.findIndex((b) => b.id === recipe.id);
  state.bookmarks.splice(index, 1);
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = false;
  setLocalStoragOfBookmarks();
  if (state.bookmarks.length === 0) throw new Error();
};

const setLocalStoragOfBookmarks = function () {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};

const init = function () {
  const bookmarks = localStorage.getItem("bookmarks");
  if (bookmarks) state.bookmarks = JSON.parse(bookmarks);
};
init();

export const setUploadData = async function (newRecipeData) {
  const ingredients = [];
  try {
    let i = 1;
    while (
      newRecipeData[`ingredient-${i}`] &&
      newRecipeData[`ingredient-${i}`] !== ""
    ) {
      const ingArr = newRecipeData[`ingredient-${i}`]
        .split(",")
        .map((el) => el.trim());
      if (ingArr.length !== 3)
        throw new Error("Wrong ingrident format.Use correct one!");
      const [quantity, unit, description] = ingArr;

      ingredients.push({
        quantity: quantity ? Number(quantity) : null,
        unit,
        description,
      });
      i++;
    }

    const recipe = {
      title: newRecipeData.title,
      source_url: newRecipeData.sourceUrl,
      publisher: newRecipeData.publisher,
      image_url: newRecipeData.image,
      servings: +newRecipeData.servings,
      cooking_time: +newRecipeData.cookingTime,
      ingredients: ingredients,
    };
    const data = await AJAX(`${API_URL}?key=${API_KEY}`, recipe);
    state.recipe = creatRecipeObject(data);
    addBookmark(state.recipe);
  } catch (error) {
    throw error;
  }
};
