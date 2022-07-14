import { useState, createContext } from "react";
import record from "../data/volumes/250162.json";
import { getVolumeForCustomPeriod, getNumberOfRecords, getAverageData} from "../utils/date.utils"; 


export const ChartContext = createContext({
  chartDescription: {
    title: "Chart",
    categoryName: "Products",
    recordName: "Search volume",
  },
  startingDate: null,
  endingDate: null,
  data: null,
  filtredData: [],
  averageData: [],
});

export const ChartProvider = ({ children }) => {
  const [chartDescription, setChartDescription] = useState({
    title: "Chart",
    categoryName: ` "Products"`,
    recordName: "Search volume",
  });
  const [startingDate, setStartingDate] = useState(Date.UTC(2018, 6, 1));
  const [endingDate, setEndingDate] = useState(Date.UTC(2022,5,1));
  const [data, setData] = useState(record);
  const [filtredData, setFiltredData] = useState(getVolumeForCustomPeriod(
    data,
    startingDate,
    getNumberOfRecords(startingDate, endingDate)
  ));
  const [averageData, setAverageData ] = useState(getAverageData(filtredData));

  const value = {
    startingDate,
    setStartingDate,
    endingDate,
    setEndingDate,
    chartDescription,
    setChartDescription,
    data,
    setData,
    filtredData,
    setFiltredData,
    averageData,
    setAverageData,
  };
  return (
    <ChartContext.Provider value={value}>{children}</ChartContext.Provider>
  );
};
