import { Outlet } from "react-router-dom";
import CategoriesSearcher from "../../components/categories-searcher/categories-searcher.component";
import FavoriteCategories from "../../components/favorite-categories/favorite-categories.component";

const Home = () => {
  return (
    <div id="homepage">
      <CategoriesSearcher />
      <FavoriteCategories />
      {/* <Outlet /> */}
    </div>
  );
};

export default Home;
