import React from "react";

export interface MainContextValues {}

const MainContext = React.createContext<MainContextValues>({});

export const MainContextProvider = (props) => {
  const { children } = props;
  return <MainContext.Provider value={1}>{children}</MainContext.Provider>;
};
