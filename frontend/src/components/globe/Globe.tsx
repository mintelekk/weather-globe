import { OrbitControls } from "@react-three/drei";
import Earth from "./Earth";

export default function Globe({ sunDirection }: any) {
  return (
    <>
      <Earth sunDirection={sunDirection} />
      <OrbitControls enableZoom minDistance={5} maxDistance={25} />
    </>
  );
}
