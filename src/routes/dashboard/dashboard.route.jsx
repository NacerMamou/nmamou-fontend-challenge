import Chart from "../../components/chart-component/chart.component";
import SecondaryChart from "../../components/secondary-chart/secondary-chart.component";
import CurrentCategory from "../../components/current-category/current-category.component";
import VolumesComparator from "../../components/volumes-comparator/volumes-comparator.component";
import CategoriesDashboard from "../../components/categories-dashbord/categories-dashboard.component";
import { ChartContext } from "../../contexts/chart.context";
import { CurrentCategoryContext } from "../../contexts/current-category.context";
import { oneYearBeforeDate } from "../../utils/date.utils";
import { useContext } from "react";

const Dashboard = () => {
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
        <VolumesComparator />
      </div>
    </div>
  );
}

export default Dashboard;
