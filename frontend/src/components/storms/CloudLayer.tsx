import * as THREE from "three";
import type { StormCell } from "../../hooks/useForecast";

interface Props {
  storms: StormCell[];
}

const EARTH_RADIUS = 4;
const CLOUD_RADIUS = EARTH_RADIUS + 0.2;

function latLonToVector3(lat: number, lon: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

export default function CloudLayer({ storms }: Props) {
  return (
    <>
      {storms.map((storm, i) => {
        const position = latLonToVector3(
          storm.lat,
          storm.lon,
          CLOUD_RADIUS
        );

        return (
          <mesh key={i} position={position}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshBasicMaterial
              color="white"
              transparent
              opacity={0.25}
              depthWrite={false}
            />
          </mesh>
        );
      })}
    </>
  );
}
