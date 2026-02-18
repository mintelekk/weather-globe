import { useForecast } from "../../hooks/useForecast";
import RainSystem from "./RainSystem";
import SnowSystem from "./SnowSystem";
import CloudLayer from "./CloudLayer";
import StormSystem from "./StormSystem";

export default function StormLayer() {
  const storms = useForecast();
  const clouds = storms.filter((s:any) => s.type === "cloud");
  const rain = storms.filter((s:any) => s.type === "rain");
  const snow = storms.filter((s:any) => s.type === "snow");
  const stormsHeavy = storms.filter((s: any) => s.type === "storm");
  console.log("All storms:", storms);
  console.log(
    "Storm types:",
    storms.map(s => s.type)
  );
  const heavy = storms.filter(s => s.type === "storm");
  console.log("Heavy storms:", heavy.length);
  console.log("Hello there?");

  return (
    <>
      <CloudLayer storms={clouds} />
      <RainSystem storms={rain} />
      <SnowSystem storms={snow} />
      <StormSystem storms={stormsHeavy} />

    </>
  );
}
