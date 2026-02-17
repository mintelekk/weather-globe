import { useEffect, useState } from "react";

export interface StormCell {
  lat: number;
  lon: number;
  type: "rain" | "snow";
  intensity: number;
}

export function useForecast() {
  const [storms, setStorms] = useState<StormCell[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/forecast")
      .then(res => res.json())
      .then(setStorms)
      .catch(console.error);
  }, []);

  return storms;
}
