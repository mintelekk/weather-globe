import * as THREE from "three";
import type { StormCell } from "../../hooks/useForecast";

interface Props {
  storms: StormCell[];
}

function latLonToVector3(lat: number, lon: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}
const EARTH_RADIUS = 4;
const STORM_RADIUS = EARTH_RADIUS + 0.2;

export default function SnowSystem({ storms }: Props) {
  const positions = storms.map(s =>
    latLonToVector3(s.lat, s.lon, STORM_RADIUS)
  );

  return (
    <>
      {positions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color="#bde3ff" />
        </mesh>
      ))}
    </>
  );
}
