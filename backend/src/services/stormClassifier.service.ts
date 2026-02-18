export type WeatherType =
  | "clear"
  | "cloud"
  | "rain"
  | "snow"
  | "storm";

export function classifyStorm(
  temp: number,
  precipitation: number,
  snowfall: number,
  cloudCover: number,
  windSpeed: number
) {
  // Snow
  if (snowfall > 0.3) return "snow";

  // Heavy storm
  if (precipitation > 0.6) return "storm";

  // Moderate rain
  if (precipitation > 0.3) return "rain";

  // Cloudy
  if (cloudCover > 60) return "cloud";

  return null;
}

