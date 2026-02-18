import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { useEffect } from "react";

export default function Earth({ sunDirection, fullLight }: any) {
  const dayTexture = useLoader(
    THREE.TextureLoader,
    "https://raw.githubusercontent.com/jeromeetienne/threex.planets/master/images/earthmap1k.jpg"

  );


  const nightTexture = useLoader(
    THREE.TextureLoader,
    "https://threejs.org/examples/textures/planets/earth_lights_2048.png"
  );

  const material = new THREE.ShaderMaterial({
    uniforms: {
      dayMap: { value: dayTexture },
      nightMap: { value: nightTexture },
      sunDirection: { value: sunDirection },
      fullLight: { value: fullLight ? 1.0 : 0.0 }
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
      uniform float fullLight;
      varying vec2 vUv;
      varying vec3 vWorldNormal;

      void main() {
        float light = dot(normalize(vWorldNormal), normalize(sunDirection));

        vec4 dayColor = texture2D(dayMap, vUv);
        vec4 nightColor = texture2D(nightMap, vUv);

        float mixFactor = smoothstep(-0.2, 0.2, light);

        // If fullLight enabled, force daylight everywhere
        if (fullLight > 0.5) {
          gl_FragColor = dayColor;
        } else {
          gl_FragColor = mix(nightColor, dayColor, mixFactor);
        }

      }
    `
  });
  useEffect(() => {
    material.uniforms.fullLight.value = fullLight ? 1.0 : 0.0;
  }, [fullLight]);

  // 🔥 This is where useEffect goes
  useEffect(() => {
    material.uniforms.sunDirection.value = sunDirection;
  }, [sunDirection, material]);
  return (
    <mesh rotation={[0, Math.PI / 2, 0]}>
      <sphereGeometry args={[4, 64, 64]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
  
}
