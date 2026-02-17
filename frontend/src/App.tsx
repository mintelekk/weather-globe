import { Canvas } from "@react-three/fiber";
import Globe from "./components/globe/Globe";
import { useMemo } from "react";
import * as THREE from "three";

function App() {
  const sunDirection = useMemo(() => {
  const now = new Date();

  const hours = now.getUTCHours() + now.getUTCMinutes() / 60;
  const angle = (hours / 24) * Math.PI * 2;

  const axialTilt = 23.44 * (Math.PI / 180); // Earth's tilt


  // + Math.PI/2 aligns with mesh rotation
  const correctedAngle = angle + Math.PI / 2;

  // Winter in Northern Hemisphere → tilt away
  return new THREE.Vector3(
    Math.sin(correctedAngle),
    -Math.sin(axialTilt),   // negative = winter in north
    Math.cos(correctedAngle)
  ).normalize();
}, []);


  return (
    <Canvas
      style={{ width: "100vw", height: "100vh", background: "black" }}
      camera={{ position: [0, 0, 10], fov: 60 }}
    >
      <directionalLight
  position={sunDirection.clone().multiplyScalar(20)}
  intensity={2}
/>

<Globe sunDirection={sunDirection} />

    </Canvas>
  );
}

export default App;



