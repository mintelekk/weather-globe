import { useForecast } from "../../hooks/useForecast";
import RainSystem from "./RainSystem";
import SnowSystem from "./SnowSystem";

export default function StormLayer() {
  const storms = useForecast();

  const rain = storms.filter(s => s.type === "rain");
  const snow = storms.filter(s => s.type === "snow");

  return (
    <>
      <RainSystem storms={rain} />
      <SnowSystem storms={snow} />
    </>
  );
}
