import { useEffect, useState } from "react";
import { useWeatherContextData } from "../context/Weather";
import axios from "axios";
interface countryProps {
  flags: { png: string };
  region: string;
}

const Wikepedia = () => {
  const [country, setCountry] = useState<countryProps | null>(null);
  const { weatherData } = useWeatherContextData();
  const location = weatherData?.name;
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://restcountries.com/v3.1/name/${location}`
        );
        setCountry(response.data[0]);
      } catch (error) {
        console.log((error as Error).message);
      }
    }
    fetchData();
  }, [location]);

  if (country) {
    return (
      <div className=" p-2">
        <img src={`${country?.flags?.png}`} className="" />
        <p>Region : {country.region}</p>
      </div>
    );
  }
};

export default Wikepedia;
