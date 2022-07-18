import { useState, createContext, useEffect } from "react";
import { resolvePath } from "react-router-dom";
import { getRequest } from "../http/request-functions";
import { getVolumeForCustomPeriod, getNumberOfRecords, getAverageData, getDateIndexInSelector} from "../utils/date.utils"; 
import opt from "../utils/dates-data";

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

  const [startingDate, setStartingDate] = useState(Date.UTC(2018, 6, 1));
  const [endingDate, setEndingDate] = useState(Date.UTC(2022,5,1));
  const [data, setData] = useState([]);
  const [filtredData, setFiltredData] = useState([]);
  const [averageData, setAverageData ] = useState([]);
  
  useEffect(()=>{    
    let savedChartContext = JSON.parse(localStorage.getItem("ChartContext"));
    if(savedChartContext){
      setStartingDate(savedChartContext.startingDate);
      setEndingDate(savedChartContext.endingDate);
      setData(savedChartContext.data);
      setFiltredData(savedChartContext.filtredData);
      setAverageData(savedChartContext.averageData);
    }else{
      getRequest("/api/volumes/250162.json").then(data=>{
        setData(data);
        let initialfiltredData = getVolumeForCustomPeriod(
          data,
          startingDate,
          getNumberOfRecords(startingDate, endingDate)
        );
        setFiltredData(initialfiltredData);
  
        setAverageData(getAverageData(initialfiltredData));
      });
    }
  }, []);
  
  const [chartDescription, setChartDescription] = useState({
    title: "Chart",
    categoryName: ` "Products"`,
    recordName: "Search volume",
  });
  
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
