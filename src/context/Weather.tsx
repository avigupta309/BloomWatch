/* eslint-disable react-refresh/only-export-components */
import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { weatherProps } from "../data/types";

interface childrenProps {
  children: ReactNode;
}

interface weatherContextType {
  weatherData: weatherProps | null;
  setWeatherData: React.Dispatch<React.SetStateAction<weatherProps | null>>;
}

export const WeatherData = createContext<weatherContextType | undefined>(
  undefined
);

export const ContextProvider: React.FC<childrenProps> = ({ children }) => {
  const [weatherData, setWeatherData] = useState<weatherProps | null>(null);
  return (
    <WeatherData.Provider value={{ weatherData, setWeatherData }}>
      {children}
    </WeatherData.Provider>
  );
};

export const useWeatherContextData = (): weatherContextType => {
  const context = useContext(WeatherData);
  if (!context) {
    throw new Error(
      "useWeatherContextData must be used within a ContextProvider"
    );
  }

  return context;
};
