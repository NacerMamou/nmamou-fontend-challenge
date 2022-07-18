import { useState, useEffect, createContext } from "react";
import { getRequest } from "../http/request-functions";
import record from "../data/volumes/250162.json";

import {
  getVolumeForCustomPeriod,
  getNumberOfRecords,
  getAverageData,
} from "../utils/date.utils";

export const SecondaryChartContext = createContext({
  chartDescription_sec: {
    title: "SecondaryChart",
    categoryName: "Products",
    recordName: "Search volume One Year Before",
  },
  startingDate_sec: null,
  endingDate_sec: null,
  data_sec: null,
  filtredData_sec: [],
  averageData_sec: [],
});

export const SecondaryChartProvider = ({ children }) => {
  const [chartDescription_sec, setChartDescription_sec] = useState({
    title: "SecondaryChart",
    categoryName: "Products",
    recordName: "Search volume One Year Before",
  });
  const [startingDate_sec, setStartingDate_sec] = useState(
    Date.UTC(2018, 6, 1)
  );
  const [endingDate_sec, setEndingDate_sec] = useState(Date.UTC(2021, 5, 1));
  const [data_sec, setData_sec] = useState([]);
  const [filtredData_sec, setFiltredData_sec] = useState([]);
  const [averageData_sec, setAverageData_sec] = useState([]);

  useEffect(() => {
    let savedSecondaryChartContext = JSON.parse(
      localStorage.getItem("SecondaryChartContext")
    );
    if (savedSecondaryChartContext) {
      setStartingDate_sec(savedSecondaryChartContext.startingDate_sec);
      setEndingDate_sec(savedSecondaryChartContext.endingDate_sec);
      setData_sec(savedSecondaryChartContext.data_sec);
      setFiltredData_sec(savedSecondaryChartContext.filtredData_sec);
      setAverageData_sec(savedSecondaryChartContext.averageData_sec);
    } else {
      getRequest("/api/volumes/250162.json").then((data) => {
        setData_sec(data);
        let initialfiltredData_sec = getVolumeForCustomPeriod(
          data,
          startingDate_sec,
          getNumberOfRecords(startingDate_sec, endingDate_sec)
        );
        setFiltredData_sec(initialfiltredData_sec);
        setAverageData_sec(getAverageData(initialfiltredData_sec));
      });
    }
  }, []);

  const value = {
    startingDate_sec,
    setStartingDate_sec,
    endingDate_sec,
    setEndingDate_sec,
    chartDescription_sec,
    setChartDescription_sec,
    data_sec,
    setData_sec,
    filtredData_sec,
    setFiltredData_sec,
    averageData_sec,
    setAverageData_sec,
  };
  return (
    <SecondaryChartContext.Provider value={value}>
      {children}
    </SecondaryChartContext.Provider>
  );
};
