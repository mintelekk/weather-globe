import { OrbitControls } from "@react-three/drei";
import Earth from "./Earth";
import StormLayer from "../storms/StormLayer";

export default function Globe({ sunDirection, fullLight }: any) {
  return (
    <>
      <Earth sunDirection={sunDirection} fullLight={fullLight} />
      <StormLayer></StormLayer>
      <OrbitControls enableZoom minDistance={5} maxDistance={25} />
    </>
  );
}
