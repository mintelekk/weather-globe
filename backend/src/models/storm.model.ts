export interface StormCell {
  lat: number;
  lon: number;
  type: "cloud" | "rain" | "snow" | "storm" | null;
  intensity: number;
}
