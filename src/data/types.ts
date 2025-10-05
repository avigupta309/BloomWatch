export interface weatherProps {
  coord: { lon: number; lat: number };
  main: { temp: string };
  name: string;
  weather: [{ description: string; icon: string; main: string }];
  wind: { speed: number };
}

export interface CardFeatures {
  features: [
    {
      properties: {
        id: number;
        Site: string;
        Type: string;
        Season: string;
        Flower: string;
        Description: string;
        Latitude: number;
        Longitude: number;
        geometry: { types: string };
      };
    }
  ];
}
