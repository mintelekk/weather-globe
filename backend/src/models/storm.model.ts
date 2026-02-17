export interface StormCell {
  lat: number;
  lon: number;
  type: "rain" | "snow" | null;
  intensity: number;
}
