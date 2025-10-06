import axios from "axios";
import {  Search } from "lucide-react";
import { useState } from "react";
import type { weatherProps } from "../data/types";
import { useWeatherContextData } from "../context/Weather";

interface searchBoxProps {
  onLocationSelect: (data: weatherProps) => void;
}

const SearchBox = ({ onLocationSelect }: searchBoxProps) => {
  const { setWeatherData } = useWeatherContextData();
  const apiKey = import.meta.env.VITE_API_KEY;
  const [cityName, setCityName] = useState("");
  async function handleSearch() {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=`;
    try {
      const response = await axios.get(URL + apiKey);
      onLocationSelect(response.data);
      setWeatherData(response.data);
    } catch (error) {
      console.log((error as Error).message);
    }
  }
  return (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20 flex bg-white rounded shadow p-2">
      <input
        className="border px-2 py-1 rounded-l text-gray-600 outline-none"
        type="search"
        placeholder="Enter Place or City Name"
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-3 flex items-center cursor-pointer hover:bg-green-400 rounded-r hover:text-black"
      >
        <Search size={20} />
      </button>
    </div>
  );
};

export default SearchBox;
