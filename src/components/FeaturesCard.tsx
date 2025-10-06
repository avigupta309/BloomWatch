import mockData from "../data/data.json";
import type React from "react";
const FeaturesCard: React.FC = () => {
  return (
    <div className="w-auto text-gray-700 bg-[url('/lotus.gif')] grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-5 ">
      {mockData.features.map((val, id) => {
        return (
          <div key={id} className="card p-2 rounded-lg bg-white shadow-2xs">
            <div className="flex items-center justify-between">
             🌸
              <p className="text-xl font-medium text-pink-600">
                {val.properties.Flower}
              </p>
              <button className="btn btn-accent">
                {val.properties.Season}
              </button>
            </div>
            <div className="flex col-2 p-2">
              <div>
                <h1 className="text-xl text-orange-400 font-bold animate-pulse">
                  Description
                </h1>
                <p>
                  <strong> Site:</strong>
                  {val.properties.Site}
                </p>
                <p>
                  <strong> Type:</strong>
                  {val.properties.Type}
                </p>
                <p>
                  <strong> Shape:</strong>
                  {val.geometry.type}
                </p>
                <p>
                  <strong> Latitude:</strong>
                  {val.properties.Latitude}
                </p>
                <p>
                  <strong> Longitude:</strong>
                  {val.properties.Longitude}
                </p>
                <p>
                  <strong> Description:</strong>
                  {val.properties.Description}
                </p>
              </div>
              <div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FeaturesCard;
