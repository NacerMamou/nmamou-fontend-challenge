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

const CategorySelector = ({ id, nbKeywords, name, selected }) => {
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
  const {
    categories,
    favoriteCategoriesArray,
    isEmpty,
    seletedElementId,
    setSeletedElementId,
    addCategoryToFavorites,
    removeCategoryFromFavorites,
  } = useContext(FavoriteCategoriesContext);

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
      const updatedFavoriteCategoriesArray = addCategoryToFavorites({
        id: clickedCategory.id,
        name: clickedCategory.name,
        nbKeywords: clickedCategory.nbKeywords,
      });

      localStorage.setItem(
        "FavoriteCategoriesContext",
        JSON.stringify({
          categories: categories,
          favoriteCategoriesArray: updatedFavoriteCategoriesArray,
          isEmpty: isEmpty,
          seletedElementId: seletedElementId,
        })
      );
    }

    // When a categori is clicked to be deleted
    if (parentClassName === "cards-container") {
      const updatedFavoriteCategoriesArray = removeCategoryFromFavorites({
        id: clickedCategory.id,
        name: clickedCategory.name,
        nbKeywords: clickedCategory.nbKeywords,
      });

      // When the current Element is deleted from favorite
      // We replace the selected element with the root category 250162
      // We get data and updates charts
      if (seletedElementId == clickedCategory.id) {
        let newSearchVolume = await getVolumeById(250162);
        setCurrentCategoryInfos({
          id: 250162,
          title: "Products",
          nbKeywords: 11818,
        });
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

        setSeletedElementId(250162);
      }

      localStorage.setItem(
        "FavoriteCategoriesContext",
        JSON.stringify({
          categories: categories,
          favoriteCategoriesArray: updatedFavoriteCategoriesArray,
          isEmpty: isEmpty,
          seletedElementId: seletedElementId,
        })
      );
      console.log(
        JSON.parse(localStorage.getItem("FavoriteCategoriesContext"))
      );
    }

    // New Current Category is clicked to display on charts
    if (parentClassName === "categories-dashboard-container") {
      setCurrentCategoryInfos({
        id: clickedCategory.id,
        title: clickedCategory.name,
        nbKeywords: clickedCategory.nbKeywords,
      });
      setSeletedElementId(Number(clickedCategory.id));

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

      localStorage.setItem(
        "CurrentCategoryContext",
        JSON.stringify({
          currentCategoryInfos: {
            id: clickedCategory.id,
            title: clickedCategory.name,
            nbKeywords: clickedCategory.nbKeywords,
          },
        })
      );

      localStorage.setItem(
        "FavoriteCategoriesContext",
        JSON.stringify({
          categories: categories,
          favoriteCategoriesArray: favoriteCategoriesArray,
          isEmpty: isEmpty,
          seletedElementId: Number(eventId),
        })
      );

      localStorage.setItem(
        "ChartContext",
        JSON.stringify({
          startingDate: startingDate,
          endingDate: endingDate,
          data: newSearchVolume,
          filtredData: newfiltredData,
          averageData: newAverageData,
        })
      );

      localStorage.setItem(
        "SecondaryChartContext",
        JSON.stringify({
          startingDate_sec: startingDate_sec,
          endingDate_sec: endingDate_sec,
          data_sec: newSearchVolume,
          filtredData_sec: newfiltredData_sec,
          averageData_sec: newAverageData_sec,
        })
      );
    }
  }
  return (
    <div
      className={
        selected
          ? "category-selector category-selector-clicked"
          : "category-selector"
      }
      onClick={selectorClickHandler}
      id={id}
    >
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
};

export default CategorySelector;
