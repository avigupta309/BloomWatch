import { Flower } from "lucide-react";
import features from "../data/features";

interface featuresProps {
  title: string;
  description: string;
  icon: string;
}

const LandingPage = () => {
  const featuresList: featuresProps[] = features;
  return (
    <div className="h-screen w-screen bg-[url('./nasa3.png')] bg-cover bg-center p-2">
      <div className="flex flex-col items-center relative">
        <div className="main flex justify-center items-center">
          <p className="text-5xl text-red-500 font-bold">Terra Bloom</p>
          <div>
            <Flower size={80} className="text-yellow-300" />
          </div>
        </div>
        <div className="max-w-2xl">
          <p className="text-xl text-center  text-white font-medium shadow-2xs">
            A NASA Space Apps Challenge project that harnesses satellite data
            and AI to monitor Earth's ecosystems, providing insights for
            sustainability, climate action, and a greener future.
          </p>
        </div>
        <div className="w-auto sm:absolute left-0 top-32 drop-shadow-lg border-4">
          <h1 className="text-2xl p-2 text-red-600">Abouts:</h1>
          <div className="p-3 overflow-y-auto h-64 scrollbar-none ">
            {featuresList.map((val, index) => {
              return (
                <details
                  key={index}
                  className="border rounded p-4 w-2xs mb-2  hover:bg-blue-400"
                >
                  <summary className="cursor-pointer font-semibold">
                    {val.title}
                  </summary>
                  <p className="mt-2 text-white">{val.description}</p>
                </details>
              );
            })}
          </div>
        </div>
        <div className="hidden sm:block w-screen relative">
          <img src="./nasa-satellite.jpg" alt="" className="absolute right-0" />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
