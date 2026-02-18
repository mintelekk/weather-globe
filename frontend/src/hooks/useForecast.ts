import { useEffect, useState } from "react";

export interface StormCell {
  lat: number;
  lon: number;
  type: "rain" | "snow" | "cloud" | "storm";
  intensity: number;
}

export function useForecast() {
  const [storms, setStorms] = useState<StormCell[]>([]);

  useEffect(() => {
  fetch("http://localhost:5000/api/forecast")
    .then(res => res.json())
    .then(data => {
      console.log("Forecast data:", data);
      setStorms(data);
    })
    .catch(console.error);
}, []);


  return storms;
}
