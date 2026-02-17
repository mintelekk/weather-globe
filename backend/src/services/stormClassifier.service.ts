export function classifyStorm(temp: number, precipitation: number, snowfall: number) {
  if (snowfall > 0) return "snow";
  if (precipitation > 0) return "rain";
  return null;
}
