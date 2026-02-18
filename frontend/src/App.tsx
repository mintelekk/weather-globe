import { Canvas } from "@react-three/fiber";
import Globe from "./components/globe/Globe";
import { useMemo } from "react";
import * as THREE from "three";
import { useState } from "react";

function App() {
  const [fullLight, setFullLight] = useState(false);

  const sunDirection = useMemo(() => {
  const now = new Date();

  const hours = now.getUTCHours() + now.getUTCMinutes() / 60;
  const angle = (hours / 24) * Math.PI * 2;

  const axialTilt = 23.44 * (Math.PI / 180); // Earth's tilt


  // + Math.PI/2 aligns with mesh rotation
  const correctedAngle = angle;

  // Winter in Northern Hemisphere → tilt away
  return new THREE.Vector3(
    Math.sin(correctedAngle),
    -Math.sin(axialTilt),   // negative = winter in north
    Math.cos(correctedAngle)
  ).normalize();
}, []);


  return (
  <>
    <Canvas
      style={{ width: "100vw", height: "100vh", background: "black" }}
      camera={{ position: [0, 0, 10], fov: 60 }}
    >

      <directionalLight
  position={sunDirection.clone().multiplyScalar(20)}
  intensity={2}
/>

<Globe sunDirection={sunDirection} fullLight={fullLight} />

    </Canvas>
    <div
      style={{
        position: "absolute",
        bottom: "2px",
        left: "2px",
        color: "white",
        background: "rgba(0,0,0,0.6)",
        padding: "3px",
        borderRadius: "2px",
        fontFamily: "sans-serif",
        fontSize: "8px",
        display: "flex",
      }}
        >
      <label>
        <input
          type="checkbox"
          checked={fullLight}
          onChange={(e) => setFullLight(e.target.checked)}
        />
        {" "}Ignore night
      </label>
    </div>

  </>
  );
}

export default App;



