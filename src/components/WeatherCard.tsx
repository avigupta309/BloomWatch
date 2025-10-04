// WeatherCard.tsx
import { LandPlot, Thermometer, Wind } from "lucide-react";
import { useWeatherContextData } from "../context/Weather";

const weatherColors: Record<string, string> = {
  Clear: "from-yellow-400 to-orange-500",
  Clouds: "from-gray-400 to-gray-600",
  Rain: "from-blue-400 to-blue-600",
  Snow: "from-white to-gray-300",
  Thunderstorm: "from-purple-700 to-purple-900",
  Drizzle: "from-teal-400 to-teal-600",
  Mist: "from-gray-300 to-gray-500",
  default: "from-indigo-400 to-indigo-600",
};

const WeatherCard = () => {
  const { weatherData } = useWeatherContextData();

  if (!weatherData) {
    return (
      <div className="text-center text-gray-500 p-6">
        Loading weather data...
      </div>
    );
  }

  const weatherMain = weatherData.weather[0].main;
  const gradient = weatherColors[weatherMain] || weatherColors.default;

  return (
    <div
      className={`max-w-sm mx-auto p-6 rounded-2xl shadow-xl bg-gradient-to-br ${gradient} text-white transform transition-all duration-700 opacity-100`}
    >
      {/* Header: City & Weather */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{weatherData.name}</h2>
          <p className="capitalize">{weatherData.weather[0].description}</p>
        </div>
        <img
          src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
          alt={weatherData.weather[0].description}
          className="w-20 h-20 animate-bounce"
        />
      </div>

      {/* Weather Details */}
      <div className="mt-6 flex justify-between items-center gap-4">
        {/* Temperature */}
        <div className="flex items-center gap-2">
          <Thermometer className="w-6 h-6" />
          <p className="text-4xl font-bold">
            {Math.round(Number(weatherData.main.temp))}°C
          </p>
        </div>

        {/* Wind and Coordinates */}
        <div className="flex flex-col gap-2 text-right">
          <div className="flex items-center justify-end gap-2">
            <Wind className="w-5 h-5" />
            <p>{weatherData.wind.speed} m/s</p>
          </div>
          <div className="flex items-center justify-end gap-2">
            <LandPlot className="w-5 h-5" />
            <p>
              {weatherData.coord.lat}, {weatherData.coord.lon}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
