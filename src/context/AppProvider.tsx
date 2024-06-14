'use client'
/* eslint-disable @typescript-eslint/no-empty-function */
import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

type AppContextType = {
  generatedPackages: string;
  setGeneratedPackages: Dispatch<SetStateAction<string>>;
  isChartView: boolean;
  setIsChartView: Dispatch<SetStateAction<boolean>>;
};

const AppContext = createContext<AppContextType>({
  generatedPackages: "",
  setGeneratedPackages: () => { },
  isChartView: false,
  setIsChartView: () => { },
});
const useAppContext = () => useContext(AppContext);

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [generatedPackages, setGeneratedPackages] = useState<string>("");
  const [isChartView, setIsChartView] = useState<boolean>(false);

  return (
    <AppContext.Provider
      value={{
        generatedPackages,
        setGeneratedPackages,
        isChartView,
        setIsChartView,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, useAppContext };
