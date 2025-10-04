import { Info } from "lucide-react";
import WeatherCard from "./WeatherCard";
import { useWeatherContextData } from "../context/Weather";
import { useState } from "react";

const LocationInfo = () => {
  const { weatherData } = useWeatherContextData();
  const [show, setShow] = useState<boolean>(false);
  if (!weatherData) return null;
  return (
    <div className="relative z-20 ">
      <div className="bg-white p-1 text-gray-600 rounded-lg absolute top-20 left-4">
        <div className="p-2 flex flex-col gap-2 top-40 left-20">
          <div className="flex p-2 gap-2">
            <Info
              onClick={() => {
                setShow(!show);
              }}
              size={25}
              className="cursor-pointer"
            />
            <p className="text-xl">
              View
              <span className="text-xl font-medium p-1 cursor-pointer">
                {weatherData?.name}
              </span>
            </p>
          </div>
          {show && <WeatherCard />}
        </div>
      </div>
    </div>
  );
};

export default LocationInfo;
