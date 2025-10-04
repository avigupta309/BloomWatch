export interface weatherProps {
  coord: { lon: number; lat: number };
  main: { temp: string };
  name: string;
  weather: [{ description: string; icon: string; main: string }];
  wind: { speed: number };
}
