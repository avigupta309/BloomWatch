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
import data from "../data/data.json";
import SearchBox from "../components/SearchBox";
import { useEffect, useState } from "react";
import type { weatherProps } from "../data/types";
import LocationInfo from "../components/LocationInfo";
import Wikepedia from "../components/Wikepedia";

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

const Map = () => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );
  function weatherDetails(data: weatherProps) {
    setUserLocation([data.coord.lat, data.coord.lon]);
  }

  return (
    <div className="relative">
      {/* Pass function to get user's searched location */}
      <SearchBox onLocationSelect={weatherDetails} />
      <LocationInfo />

      <MapContainer
        center={userLocation ? userLocation : [34.5, -118.5]}
        zoom={5}
        scrollWheelZoom={true}
        className="h-screen w-screen"
      >
        {userLocation && <RecenterMap center={userLocation} />}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Draw colored circles for each feature */}
        {data.features.map((feature: any, index: number) => {
          if (feature.geometry.type === "MultiPolygon") {
            const centroid = getCentroid(feature.geometry.coordinates);

            // Assign color based on some property
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
                  <div className="popup-content">
                    <strong>{feature.properties.Site}</strong> <br />
                    <strong>Flower:</strong> {feature.properties.Flower} <br />
                    <strong>Type:</strong> {feature.properties.Type} <br />
                    <strong>Season:</strong> {feature.properties.Season} <br />
                    <strong>Area:</strong> {feature.properties.Area} <br />
                  </div>
                </Popup>
              </CircleMarker>
            );
          }
          return null;
        })}

        {/* Marker for user-selected location */}
        {userLocation && (
          <Marker position={userLocation}>
            <Popup>Your searched location
              <Wikepedia/>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

function RecenterMap({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
}

export default Map;
