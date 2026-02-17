import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

export default function Earth({ sunDirection }: any) {
  const dayTexture = useLoader(
    THREE.TextureLoader,
    "https://threejs.org/examples/textures/land_ocean_ice_cloud_2048.jpg"
  );

  const nightTexture = useLoader(
    THREE.TextureLoader,
    "https://threejs.org/examples/textures/planets/earth_lights_2048.png"
  );

  const material = new THREE.ShaderMaterial({
    uniforms: {
      dayMap: { value: dayTexture },
      nightMap: { value: nightTexture },
      sunDirection: { value: sunDirection }
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vWorldNormal;

      void main() {
        vUv = uv;

        // Convert normal to world space
        vWorldNormal = normalize(mat3(modelMatrix) * normal);

        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D dayMap;
      uniform sampler2D nightMap;
      uniform vec3 sunDirection;

      varying vec2 vUv;
      varying vec3 vWorldNormal;

      void main() {
        float light = dot(normalize(vWorldNormal), normalize(sunDirection));

        vec4 dayColor = texture2D(dayMap, vUv);
        vec4 nightColor = texture2D(nightMap, vUv);

        float mixFactor = smoothstep(-0.2, 0.2, light);

        gl_FragColor = mix(nightColor, dayColor, mixFactor);
      }
    `
  });

  return (
    <mesh rotation={[0, Math.PI / 2, 0]}>
      <sphereGeometry args={[3, 64, 64]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}
