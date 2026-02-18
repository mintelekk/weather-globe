import axios from "axios";
import { generateGrid } from "./grid.service";
import { classifyStorm } from "./stormClassifier.service";
import { StormCell } from "../models/storm.model";

let forecastCache: StormCell[] = [];

// Adjustable tuning
const STEP_DELAY_MS = 1000;        // delay between chunk requests
const CHUNK_SIZE = 300;           // number of points per request

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function refreshForecast() {
  try {
    console.log("Refreshing forecast...");

    const grid = generateGrid();
    const results: StormCell[] = [];

    for (let i = 0; i < grid.length; i += CHUNK_SIZE) {
      const chunk = grid.slice(i, i + CHUNK_SIZE);

      const latitudes = chunk.map(p => p.lat).join(",");
      const longitudes = chunk.map(p => p.lon).join(",");

      const url =
        `https://api.open-meteo.com/v1/forecast` +
        `?latitude=${latitudes}` +
        `&longitude=${longitudes}` +
        `&hourly=temperature_2m,precipitation,snowfall,cloudcover,wind_speed_10m` +
        `&forecast_days=1`;

      const response = await axios.get(url);

      const locations = response.data;

      locations.forEach((locationData: any, index: number) => {
        const hourly = locationData.hourly;

        const temp = hourly.temperature_2m[0];
        const precipitation = hourly.precipitation[0];
        const snowfall = hourly.snowfall[0];
        const cloudCover = hourly.cloudcover[0];
        const windSpeed = hourly.wind_speed_10m[0];

        const type = classifyStorm(
          temp,
          precipitation,
          snowfall,
          cloudCover,
          windSpeed
        );

        if (type) {
          results.push({
            lat: chunk[index].lat,
            lon: chunk[index].lon,
            type,
            intensity: precipitation
          });
        }
      });

      // prevent 429
      await sleep(STEP_DELAY_MS);
    }

    forecastCache = results;
    console.log(`Forecast updated: ${results.length} weather cells`);

  } catch (error) {
    console.error("Forecast refresh failed", error);
  }
}

// Route-safe snapshot (NO API CALLS HERE)
export function getForecastSnapshot(): StormCell[] {
  return forecastCache;
}
