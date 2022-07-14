import { useState, createContext, useEffect } from "react";

const addCategoryTo = (favoriteCategories, categoryToAdd) => {
  const existingCategory = favoriteCategories.find(
    (category) => category.id === categoryToAdd.id
  );

  if (!existingCategory) {
    return [...favoriteCategories, categoryToAdd];
  }
  return favoriteCategories;
};

function RemoveCategoryFrom(favoriteCategories, categoryToRemove) {
  const existingCategory = favoriteCategories.find(
    (category) => category.name === categoryToRemove.name
  );
  if (existingCategory) {
    return favoriteCategories.filter(
      (category) => category.id !== categoryToRemove.id
    );
  }
  return favoriteCategories;
}

export const FavoriteCategoriesContext = createContext({
  categories: [],
  isEmpty: true,
  setIsEmpty: () => {},
  setCategories: () => {},
  favoriteCategoriesArray: [],
  addCategoryToFavorites: () => {},
  removeCategoryFromFavorites: () => {},
  clearFavoriteCategories: () => {},
});

export const FavoriteCategoriesProvider = ({ children }) => {
  const [favoriteCategoriesArray, setFavoriteCategoriesArray] = useState([]);
  const [isEmpty, setIsEmpty] = useState(true);
  const [categories, setCategories] = useState([]);

  function addCategoryToFavorites(categoryToAdd) {
    setFavoriteCategoriesArray(
      addCategoryTo(favoriteCategoriesArray, categoryToAdd)
    );
    console.log(favoriteCategoriesArray);
  }

  function removeCategoryFromFavorites(categoryToRemove) {
    setFavoriteCategoriesArray(
      RemoveCategoryFrom(favoriteCategoriesArray, categoryToRemove)
    );
  }

  useEffect(() => {
    setIsEmpty(favoriteCategoriesArray.length === 0);
  }, [favoriteCategoriesArray]);
  const value = {
    isEmpty,
    setIsEmpty,
    categories,
    setCategories,
    favoriteCategoriesArray,
    setFavoriteCategoriesArray,
    addCategoryToFavorites,
    removeCategoryFromFavorites,
  };

  return (
    <FavoriteCategoriesContext.Provider value={value}>
      {" "}
      {children}
    </FavoriteCategoriesContext.Provider>
  );
};
