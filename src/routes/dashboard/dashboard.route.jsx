import Chart from "../../components/chart-component/chart.component";
import SecondaryChart from "../../components/secondary-chart/secondary-chart.component";
import BeginDateSelector from "../../components/date-selector/begin-date.component";
import EndDateSelector from "../../components/date-selector/end-date.component";
import CurrentCategory from "../../components/current-category/current-category.component";

import CategoriesDashboard from "../../components/categories-dashbord/categories-dashboard.component";

import { ChartContext } from "../../contexts/chart.context";
import { CurrentCategoryContext } from "../../contexts/current-category.context";

import { oneYearBeforeDate } from "../../utils/date.utils";

import opt from "../../utils/dates-data";
import { useContext } from "react";

function Dashboard() {
  const { startingDate, endingDate } = useContext(ChartContext);
  const { currentCategoryInfos } = useContext(CurrentCategoryContext);
  return (
    <div id="dashboard">
      <div className="charts-container">
        <div className="top-header">
          <div className="page-name-container">
            <i class="fa-solid fa-house"></i>
            <h2>Dashboard</h2>
          </div>
        </div>
        <CategoriesDashboard />
        <div className="main-container">
          <div className="date-selectors">
            <BeginDateSelector label={"From"} options={opt} />
            <EndDateSelector label={"To"} options={opt} />
          </div>
          <CurrentCategory
            startingDate={startingDate}
            endingDate={endingDate}
            title={currentCategoryInfos.title}
          />
          <Chart />
        </div>
        <div className="secondary-container">
          <CurrentCategory
            startingDate={oneYearBeforeDate(startingDate)}
            endingDate={oneYearBeforeDate(endingDate)}
            title={currentCategoryInfos.title}
          />
          <SecondaryChart />
        </div>
      </div>

      <div className="extra-container">
        <p>Extra container</p>
      </div>
    </div>
  );
}

export default Dashboard;
