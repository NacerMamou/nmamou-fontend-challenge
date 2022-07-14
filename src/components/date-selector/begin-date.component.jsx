import { ChartContext } from "../../contexts/chart.context";
import { SecondaryChartContext } from "../../contexts/secondary-chart.context";
import { useContext } from "react";
import {
  getVolumeForCustomPeriod,
  getNumberOfRecords,
  getAverageData,
  oneYearBeforeDate,
} from "../../utils/date.utils";


function BeginDateSelector({ label, options }) {
  const { data,setFiltredData, setAverageData, setStartingDate, endingDate } =
    useContext(ChartContext);
  const {
    setFiltredData_sec,
    setAverageData_sec,
    setStartingDate_sec,
    setEndingDate_sec,
  } = useContext(SecondaryChartContext);

  function handleStartingDateChange(e) {
    let newStartingDate = Number(e.target.value);
    setStartingDate(newStartingDate);

    let newfiltredData = getVolumeForCustomPeriod(
      data,
      newStartingDate,
      getNumberOfRecords(newStartingDate, endingDate)
    );
    setFiltredData(newfiltredData);

    let newAverageData = getAverageData(newfiltredData);
    setAverageData(newAverageData);

    let newStartingDate_sec = oneYearBeforeDate(newStartingDate);
    setStartingDate_sec(newStartingDate_sec);

    let newEndingDate_sec = oneYearBeforeDate(endingDate);
    setEndingDate_sec(newEndingDate_sec);

    let newfiltredData_sec = getVolumeForCustomPeriod(
      data,
      newStartingDate_sec,
      getNumberOfRecords(newStartingDate_sec, newEndingDate_sec)
    );

    setFiltredData_sec(newfiltredData_sec);

    let newAverageData_sec = getAverageData(newfiltredData_sec);
    setAverageData_sec(newAverageData_sec);
  }

  return (
    <div className="date-selector">
      <label for="pet-select" className="label">
        {label}
      </label>
      <select
        name="begin-date-selector"
        onChange={(e) => {
          handleStartingDateChange(e);
        }}
        className="selector"
      >
        {options.map(({ label, key, value }) => {
          return (
            <option value={value} key={key}>
              {label}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default BeginDateSelector;
