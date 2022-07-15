import { useState, createContext } from "react";

export const CurrentCategoryContext = createContext({
  currentCategoryInfos: {
    title: "Products",
    nbKeywords: 236734,
    id: 250162,
  },
});

export const CurrentCategoryProvider = ({ children }) => {
  const [currentCategoryInfos, setCurrentCategoryInfos] = useState({
    title: "Products",
    nbKeywords: 236734,
    id: 250162,
  });

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
