/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  CircleMarker,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";

import data from "../data/data.json";
import SearchBox from "../components/SearchBox";
import LocationInfo from "../components/LocationInfo";
import Wikepedia from "../components/Wikepedia";
import type { weatherProps } from "../data/types";

// Helper: calculate centroid of a MultiPolygon
const getCentroid = (coords: number[][][][]): [number, number] => {
  let latSum = 0,
    lngSum = 0,
    count = 0;
  coords.forEach((polygon) => {
    polygon.forEach((ring) => {
      ring.forEach(([lng, lat]) => {
        latSum += lat;
        lngSum += lng;
        count++;
      });
    });
  });
  return [latSum / count, lngSum / count];
};

// Configure Leaflet marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  iconUrl: "/leaflet/marker-icon.png",
  shadowUrl: "/leaflet/marker-shadow.png",
});

const Map = () => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );

  function weatherDetails(data: weatherProps) {
    setUserLocation([data.coord.lat, data.coord.lon]);
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 overflow-hidden p-6">
      {/* Map Section (full width, fixed height) */}
      <div
        className="w-full h-[70vh] border-4 border-pink-400 rounded-2xl overflow-hidden shadow-lg 
                   relative animate-fadeInLeft"
      >
        <SearchBox onLocationSelect={weatherDetails} />
        <LocationInfo />

        <MapContainer
          center={userLocation ? userLocation : [34.5, -118.5]}
          zoom={5}
          scrollWheelZoom={true}
          className="h-full w-full z-10"
        >
          {userLocation && <RecenterMap center={userLocation} />}

          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Circle markers for flowers */}
          {data.features.map((feature: any, index: number) => {
            if (feature.geometry.type === "MultiPolygon") {
              const centroid = getCentroid(feature.geometry.coordinates);
              const color =
                feature.properties.Type === "Rare"
                  ? "red"
                  : feature.properties.Type === "Common"
                  ? "green"
                  : "blue";

              return (
                <CircleMarker
                  key={index}
                  center={centroid}
                  radius={8}
                  color={color}
                  fillColor={color}
                  fillOpacity={0.6}
                >
                  <Popup>
                    <div className="popup-content text-sm">
                      <strong>{feature.properties.Site}</strong> <br />
                      <strong>Flower:</strong> {feature.properties.Flower}{" "}
                      <br />
                      <strong>Type:</strong> {feature.properties.Type} <br />
                      <strong>Season:</strong> {feature.properties.Season}{" "}
                      <br />
                      <strong>Area:</strong> {feature.properties.Area}
                    </div>
                  </Popup>
                </CircleMarker>
              );
            }
            return null;
          })}

          {/* Marker for searched location */}
          {userLocation && (
            <Marker position={userLocation}>
              <Popup>
                Your searched location
                <Wikepedia />
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>

      {/* Text Section (under the map) */}
      <div
        className="w-full flex flex-col items-center justify-center 
                   text-center py-10 animate-fadeInRight"
      >
        <h1 className="text-5xl font-extrabold text-pink-600 drop-shadow-lg mb-4 animate-bounceSlow">
          🌸 Terra Bloom
        </h1>

        <p className="text-lg text-gray-700 max-w-2xl leading-relaxed">
          Discover the hidden{" "}
          <span className="text-pink-600 font-semibold">beauty of nature</span>{" "}
          across the globe. Explore{" "}
          <span className="text-purple-600 font-semibold">
            rare and common flowers
          </span>{" "}
          blooming in diverse landscapes — from lush meadows to alpine peaks.
        </p>

        <div className="mt-8 text-3xl text-pink-500 font-bold animate-floating">
          🌺 🌼 🌷 🌻
        </div>
      </div>
    </div>
  );
};

// Helper component: re-center map
function RecenterMap({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
}

export default Map;
