import React, { createContext, useState, useContext } from "react";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshPage = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  return (
    <GlobalContext.Provider value={{ refreshKey, refreshPage }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
