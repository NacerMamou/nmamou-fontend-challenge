import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChartProvider } from "./contexts/chart.context";
import { SecondaryChartProvider } from "./contexts/secondary-chart.context";
import { CurrentCategoryProvider } from "./contexts/current-category.context";
import { FavoriteCategoriesProvider } from "./contexts/favorite-categories.context";
import { VolumesComparatorProvider } from "./contexts/volumes-comparator.context";

import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <FavoriteCategoriesProvider>
        <ChartProvider>
          <SecondaryChartProvider>
            <CurrentCategoryProvider>
              <VolumesComparatorProvider>
                <App />
              </VolumesComparatorProvider>
            </CurrentCategoryProvider>
          </SecondaryChartProvider>
        </ChartProvider>
      </FavoriteCategoriesProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
