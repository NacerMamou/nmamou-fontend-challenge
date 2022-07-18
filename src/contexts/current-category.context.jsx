import { useState, createContext, useEffect } from "react";

export const CurrentCategoryContext = createContext({
  currentCategoryInfos: null,
  setCurrentCategoryInfos: () => {},
});

export const CurrentCategoryProvider = ({ children }) => {
  const [currentCategoryInfos, setCurrentCategoryInfos] = useState({});

  useEffect(() => {
    let savedCurrentCategoryContext = JSON.parse(
      localStorage.getItem("CurrentCategoryContext")
    );
    if (savedCurrentCategoryContext) {
      setCurrentCategoryInfos(savedCurrentCategoryContext.currentCategoryInfos);
    } else {
      setCurrentCategoryInfos({
        title: "Products",
        nbKeywords: 236734,
        id: 250162,
      });
    }
  }, []);

  const value = {
    currentCategoryInfos,
    setCurrentCategoryInfos,
  };

  return (
    <CurrentCategoryContext.Provider value={value}>
      {children}
    </CurrentCategoryContext.Provider>
  );
};
