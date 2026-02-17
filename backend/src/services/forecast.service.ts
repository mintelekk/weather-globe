import axios from "axios";
import { generateGrid } from "./grid.service";
import { classifyStorm } from "./stormClassifier.service";
import { StormCell } from "../models/storm.model";

let cachedData: StormCell[] = [];
let lastUpdated: number | null = null;

export async function refreshForecast() {
  const grid = generateGrid();
  const results: StormCell[] = [];

  const latitudes = grid.map(p => p.lat).join(",");
  const longitudes = grid.map(p => p.lon).join(",");

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitudes}&longitude=${longitudes}&hourly=temperature_2m,precipitation,snowfall&forecast_days=1`;

  try {
    const response = await axios.get(url);
    const dataArray = response.data;

    dataArray.forEach((locationData: any, index: number) => {
      const hourly = locationData.hourly;

      const temp = hourly.temperature_2m[0];
      const precipitation = hourly.precipitation[0];
      const snowfall = hourly.snowfall[0];

      const type = classifyStorm(temp, precipitation, snowfall);

      if (type) {
        results.push({
          lat: grid[index].lat,
          lon: grid[index].lon,
          type,
          intensity: precipitation
        });
      }
    });

    cachedData = results;
    lastUpdated = Date.now();

    console.log("Forecast refreshed:", new Date().toISOString());

  } catch (err: any) {
    console.error("Forecast refresh failed");
    console.error(err.response?.data || err.message);
  }
}

export function getForecastSnapshot(): StormCell[] {
  return cachedData;
}
