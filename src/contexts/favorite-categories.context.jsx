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
  if (existingCategory && !(existingCategory.id == 250162)) {
    return favoriteCategories.filter(
      (category) => category.id !== categoryToRemove.id
    );
  }
  return favoriteCategories;
}

export const FavoriteCategoriesContext = createContext({
  categories: [],
  favoriteCategoriesArray: [],
  isEmpty: true,
  seletedElementId: 250162,

  setSeletedElementId: () => {},
  setIsEmpty: () => {},
  setCategories: () => {},
  addCategoryToFavorites: () => {},
  removeCategoryFromFavorites: () => {},
  clearFavoriteCategories: () => {},
});

export const FavoriteCategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [favoriteCategoriesArray, setFavoriteCategoriesArray] = useState([]);
  const [isEmpty, setIsEmpty] = useState(true);
  const [seletedElementId, setSeletedElementId] = useState(250162);

  function addCategoryToFavorites(categoryToAdd) {
    const newData = addCategoryTo(favoriteCategoriesArray, categoryToAdd);
    setFavoriteCategoriesArray(newData);
    return newData;
  }

  function removeCategoryFromFavorites(categoryToRemove) {
    const newData = RemoveCategoryFrom(
      favoriteCategoriesArray,
      categoryToRemove
    );
    setFavoriteCategoriesArray(newData);
    return newData;
  }

  useEffect(() => {
    let savedFavoriteCategoriesContext = JSON.parse(
      localStorage.getItem("FavoriteCategoriesContext")
    );
    if (savedFavoriteCategoriesContext) {
      setFavoriteCategoriesArray(
        savedFavoriteCategoriesContext.favoriteCategoriesArray
      );
      setCategories(savedFavoriteCategoriesContext.categories);
      setIsEmpty(
        savedFavoriteCategoriesContext.favoriteCategoriesArray.length === 0
      );
      setSeletedElementId(savedFavoriteCategoriesContext.seletedElementId);
    } else {
      setFavoriteCategoriesArray([
        { id: 250162, name: "Products", nbKeywords: 11818 },
      ]);
    }
  }, []);

  useEffect(() => {
    setIsEmpty(favoriteCategoriesArray.length === 0);
  }, [favoriteCategoriesArray]);

  const value = {
    isEmpty,
    setIsEmpty,
    seletedElementId,
    setSeletedElementId,
    categories,
    setCategories,
    favoriteCategoriesArray,
    setFavoriteCategoriesArray,
    addCategoryToFavorites,
    removeCategoryFromFavorites,
  };

  return (
    <FavoriteCategoriesContext.Provider value={value}>
      {children}
    </FavoriteCategoriesContext.Provider>
  );
};
