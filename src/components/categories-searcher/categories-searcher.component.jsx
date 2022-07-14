import { useEffect, useState, useContext } from "react";
import CategorySelector from "../category-selector/category-selector.component";
import { FavoriteCategoriesContext } from "../../contexts/favorite-categories.context";

function CategoriesSearcher() {
  const { categories, setCategories } = useContext(FavoriteCategoriesContext);
  const [filtredCategories, setFiltredCategories] = useState([]);
  const [searchField, setSearchField] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/api/categories.json")
      .then((res) => res.json())
      .then((res) => {
        setCategories(res);
        setFiltredCategories(res);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    let newFiltredCategories = categories.filter((category) => {
      return category.name.toLowerCase().includes(searchField);
    });
    setFiltredCategories(newFiltredCategories);
  }, [searchField, categories]);

  function onChangeHandler(e) {
    e.preventDefault();
    const newTypedKeyword = e.target.value.toLowerCase();
    setSearchField(newTypedKeyword);
  }

  return (
    <div className="categories-searcher-container">
      <div className="top-header">
        <div className="page-name-container">
          <i class="fa-solid fa-gears"></i>
          <h2>Settings</h2>
        </div>
        <form className="search-bar">
          <label>
            <i class="fa-solid fa-magnifying-glass"></i>
          </label>
          <input
            type="search"
            placeholder="Search..."
            onChange={(e) => onChangeHandler(e)}
          />
        </form>
      </div>

      <div className="categories-container">
        {filtredCategories.map((category, index) => {
          return (
            <CategorySelector
              key={index}
              id={category.id}
              name={category.name}
              nbKeywords={category.nbKeywords}
            />
          );
        })}
      </div>
    </div>
  );
}

export default CategoriesSearcher;
