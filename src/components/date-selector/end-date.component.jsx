import { ChartContext } from "../../contexts/chart.context";
import { SecondaryChartContext } from "../../contexts/secondary-chart.context";
import { useContext } from "react";

import {
  getVolumeForCustomPeriod,
  getNumberOfRecords,
  getAverageData,
  oneYearBeforeDate,
} from "../../utils/date.utils";

function EndDateSelector({ label, options }) {
  const { data, setFiltredData, setAverageData, startingDate, setEndingDate } =
    useContext(ChartContext);

  const {
    setStartingDate_sec,
    setEndingDate_sec,
    setFiltredData_sec,
    setAverageData_sec,
  } = useContext(SecondaryChartContext);

  function handleEndingDateChange(e) {
    let newEndingDate = Number(e.target.value);
    setEndingDate(newEndingDate);
    let newfiltredData = getVolumeForCustomPeriod(
      data,
      startingDate,
      getNumberOfRecords(startingDate, newEndingDate)
    );
    setFiltredData(newfiltredData);
    let newAverageData = getAverageData(newfiltredData);
    setAverageData(newAverageData);

    let newEndingDate_sec = oneYearBeforeDate(newEndingDate);
    setEndingDate_sec(newEndingDate_sec);

    let newStartingDate_sec = oneYearBeforeDate(startingDate);
    setStartingDate_sec(newStartingDate_sec);

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
        name="end-date-selector"
        onChange={(e) => {
          handleEndingDateChange(e);
        }}
        className="selector"
      >
        {options.map(({ label, key, value }) => {
          return (
            <option value={value} key={key} selected>
              {label}{" "}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default EndDateSelector;
