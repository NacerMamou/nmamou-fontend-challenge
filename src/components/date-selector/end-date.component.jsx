import opt from "../../utils/dates-data";
import { ChartContext } from "../../contexts/chart.context";
import { SecondaryChartContext } from "../../contexts/secondary-chart.context";
import { useContext, useEffect } from "react";

import {
  getVolumeForCustomPeriod,
  getNumberOfRecords,
  getAverageData,
  oneYearBeforeDate,
  getDateIndexInSelector,
} from "../../utils/date.utils";

const EndDateSelector = ({ label, options }) => {
  const { data, setFiltredData, setAverageData, startingDate,endingDate, setEndingDate } =
    useContext(ChartContext);

    useEffect(()=>{  
      let endDateElt = document.getElementById("end-date-selector");
      let endingDateIndex = getDateIndexInSelector(endingDate, opt);
      endDateElt.options.selectedIndex = endingDateIndex;
      // console.log(endingDateIndex);
      }, [endingDate]);

  const {
    data_sec,
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

    localStorage.setItem("ChartContext", JSON.stringify({
      startingDate : startingDate,
      endingDate: newEndingDate,
      data: data,
      filtredData: newfiltredData,
      averageData: newAverageData,
    }
    ));

    localStorage.setItem("SecondaryChartContext", JSON.stringify({
      startingDate_sec : newStartingDate_sec,
      endingDate_sec: newEndingDate_sec,
      data_sec: data_sec,
      filtredData_sec: newfiltredData_sec,
      averageData_sec: newAverageData_sec,
    }
    ));
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
        id="end-date-selector"
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
