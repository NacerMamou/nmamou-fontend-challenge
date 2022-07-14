import { useContext } from "react";
import { FavoriteCategoriesContext } from "../../contexts/favorite-categories.context";
import { ChartContext } from "../../contexts/chart.context";
import { SecondaryChartContext } from "../../contexts/secondary-chart.context";
import { CurrentCategoryContext } from "../../contexts/current-category.context";

import {
  getVolumeForCustomPeriod,
  getNumberOfRecords,
  getAverageData,
} from "../../utils/date.utils";

function CategorySelector({ id, nbKeywords, name }) {
  function getVolumeById(categoryId) {
    const url = `http://localhost:8000/api/volumes/${categoryId}.json`;
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((res) => res.json())
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
          console.log(err);
        });
    });
  }

  const { currentCategoryInfos, setCurrentCategoryInfos } = useContext(
    CurrentCategoryContext
  );
  const { categories, addCategoryToFavorites, removeCategoryFromFavorites } =
    useContext(FavoriteCategoriesContext);

  const { setData, setFiltredData, setAverageData, startingDate, endingDate } =
    useContext(ChartContext);

  const {
    setFiltredData_sec,
    setAverageData_sec,
    startingDate_sec,
    endingDate_sec,
  } = useContext(SecondaryChartContext);

  async function selectorClickHandler(e) {
    const parentClassName = String(e.currentTarget.parentNode.className);
    const eventId = Number(e.currentTarget.id);
    let clickedCategory = categories.find(
      (category) => category.id === eventId
    );
    delete clickedCategory.ancestors;

    if (parentClassName === "categories-container") {
      addCategoryToFavorites({
        id: clickedCategory.id,
        name: clickedCategory.name,
        nbKeywords: clickedCategory.nbKeywords,
      });
    }
    if (parentClassName === "cards-container") {
      removeCategoryFromFavorites({
        id: clickedCategory.id,
        name: clickedCategory.name,
        nbKeywords: clickedCategory.nbKeywords,
      });
    }
    if (parentClassName === "categories-dashboard-container") {
      setCurrentCategoryInfos({
        id: clickedCategory.id,
        title: clickedCategory.name,
        nbKeywords: clickedCategory.nbKeywords,
      });

      let newSearchVolume = await getVolumeById(eventId);
      setData(newSearchVolume);

      let newfiltredData = getVolumeForCustomPeriod(
        newSearchVolume,
        startingDate,
        getNumberOfRecords(startingDate, endingDate)
      );
      setFiltredData(newfiltredData);
      let newAverageData = getAverageData(newfiltredData);
      setAverageData(newAverageData);

      let newfiltredData_sec = getVolumeForCustomPeriod(
        newSearchVolume,
        startingDate_sec,
        getNumberOfRecords(startingDate_sec, endingDate_sec)
      );

      setFiltredData_sec(newfiltredData_sec);

      let newAverageData_sec = getAverageData(newfiltredData_sec);
      setAverageData_sec(newAverageData_sec);
    }
  }
  return (
    <div className="category-selector" onClick={selectorClickHandler} id={id}>
      <div className="category-id-container">
        <p>Id</p>
        <span>{id}</span>
      </div>
      <strong className="category-name-container">{name}</strong>
      <div className="category-keywords-container">
        <p>nbKeywords</p>
        <span> {nbKeywords}</span>
      </div>
    </div>
  );
}

export default CategorySelector;
