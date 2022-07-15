import { useState, createContext, useContext, useEffect } from "react";

import { ChartContext } from "./chart.context";
import { SecondaryChartContext } from "./secondary-chart.context";

import { compare } from "../utils/date.utils";

export const VolumesComparatorContext = createContext({
  minEvolution: 0,
  maxEvolution: 0,
  avgEvolution: 0,
  primaryMin: 0,
  primaryMax: 0,
  primaryAvg : 0,
  secondaryMin: 0,
  secondaryMax: 0,
  secondaryAvg : 0,
});

export const VolumesComparatorProvider = ({ children }) => {
  const { filtredData, averageData } = useContext(ChartContext);
  const { filtredData_sec, averageData_sec } = useContext(SecondaryChartContext);

  const [minEvolution, setMinEvolution] = useState(0);
  const [maxEvolution, setMaxEvolution] = useState(0);
  const [avgEvolution, setAvgEvolution] = useState(0);
  const [primaryMin, setPrimaryMin] = useState(0);
  const [primaryMax, setPrimaryMax] = useState(0);
  const [primaryAvg, setPrimaryAvg] = useState(0);
  const [secondaryMin, setSecondaryMin] = useState(0);
  const [secondaryMax, setSecondaryMax] = useState(0);
  const [secondaryAvg, setSecondaryAvg] = useState(0);

  

  useEffect(() => {
    let newComparaison = compare(filtredData, filtredData_sec, averageData[0], averageData_sec[0]);
    setPrimaryMin(newComparaison.primaryMin);
    setPrimaryMax(newComparaison.primaryMax);
    setPrimaryAvg(newComparaison.primaryAvg);

    setSecondaryMin(newComparaison.secondaryMin);
    setSecondaryMax(newComparaison.secondaryMax);
    setSecondaryAvg(newComparaison.secondaryAvg);

    setMinEvolution(newComparaison.minEvolution);
    setMaxEvolution(newComparaison.maxEvolution);
    setAvgEvolution(newComparaison.avgEvolution);
    

  }, [filtredData, filtredData_sec, averageData, averageData_sec]);

  const value = {
    minEvolution,
    setMinEvolution,
    maxEvolution,
    setMaxEvolution,
    avgEvolution,
    setAvgEvolution,
    primaryMin,
    setPrimaryMin,
    primaryMax,
    setPrimaryMax,
    primaryAvg,
    setPrimaryAvg,
    secondaryMin,
    setSecondaryMin,
    secondaryMax,
    setSecondaryMax,
    secondaryAvg,
    setSecondaryAvg
  };

  return (
    <VolumesComparatorContext.Provider value={value}>
      {children}
    </VolumesComparatorContext.Provider>
  );
};
