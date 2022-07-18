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



const BeginDateSelector = ({ label, options }) => {
  const { startingDate, endingDate, data, setFiltredData, setAverageData, setStartingDate,  } =
    useContext(ChartContext);
  const {
    data_sec,
    setFiltredData_sec,
    setAverageData_sec,
    setStartingDate_sec,
    setEndingDate_sec,
  } = useContext(SecondaryChartContext);

  useEffect(()=>{  
  let beginDateElt = document.getElementById("begin-date-selector");
  let startingDateIndex = getDateIndexInSelector(startingDate, opt);
  beginDateElt.options.selectedIndex = startingDateIndex;
  }, [startingDate]);


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

    localStorage.setItem("ChartContext", JSON.stringify({
      startingDate : newStartingDate,
      endingDate: endingDate,
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
        name="begin-date-selector"
        onChange={(e) => {
          handleStartingDateChange(e);
        }}
        className="selector"
        id="begin-date-selector"
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
