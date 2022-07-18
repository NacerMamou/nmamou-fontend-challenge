import { useContext, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { FavoriteCategoriesContext } from "../../contexts/favorite-categories.context";
import CategorySelector from "../category-selector/category-selector.component";

const FavoriteCategories = () => {
  const { isEmpty, favoriteCategoriesArray } = useContext(
    FavoriteCategoriesContext
  );

  return (
    <Fragment>
      <div className="favorite-categories">
        <div className="header">Favorite Categories</div>

        {isEmpty && (
          <p className="info-message">You d'ont have categories to display</p>
        )}
        <div className="cards-container">
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
        {!isEmpty && (
          <div className="confirmation-container">
            <Link to="/dashboard">Confirm</Link>
          </div>
        )}
      </div>
    </Fragment>
  );
}

export default FavoriteCategories;
