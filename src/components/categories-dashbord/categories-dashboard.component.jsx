import { useContext } from "react";
import CategorySelector from "../category-selector/category-selector.component";
import { FavoriteCategoriesContext } from "../../contexts/favorite-categories.context";

function CategoriesDashboard() {
  const { favoriteCategoriesArray } = useContext(FavoriteCategoriesContext);
  return (
    <div className="categories-dashboard">
      <div className="header-container">
        <div className="title">
          <i class="fa-solid fa-heart"></i> <p>Favorites</p>
        </div>
      </div>
      <div className="categories-dashboard-container">
        {favoriteCategoriesArray.map((category, index) => {
          return (
            <CategorySelector
              id={category.id}
              nbKeywords={category.nbKeywords}
              name={category.name}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
}

export default CategoriesDashboard;
