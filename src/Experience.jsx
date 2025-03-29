import { useFrame, useThree } from "@react-three/fiber";
import {
  BakeShadows,
  ContactShadows,
  Environment,
  OrbitControls,
  useHelper,
  useTexture,
} from "@react-three/drei";
import { useEffect, useRef } from "react";
import { Perf } from "r3f-perf";
import * as THREE from "three";
import { useControls } from "leva";

export default function Experience() {
  const scene = useThree((state) => state.scene);

  const cube = useRef();
  const sphere = useRef();

  const sphereTexture = useTexture("./textures/rock_wall_12_diff_1k.jpg");
  const cubeTexture = useTexture("./cubeTexture/dark_brick_wall_diff_1k.jpg");

  const directionalLightRef = useRef();
  useHelper(directionalLightRef, THREE.DirectionalLightHelper, 2);

  useFrame((state, delta) => {
    cube.current.rotation.y += delta * 0.2;
    const time = state.clock.getElapsedTime();
    sphere.current.position.y = Math.sin(time * 1.5) + 2;
  });

  const { color, opacity, blur } = useControls("Contact Shadow", {
    color: { value: "#4b2709" },
    opacity: { value: 0.4, min: 0, max: 5, step: 0.01 },
    blur: { value: 2.8, min: 0, max: 4, step: 0.01 },
  });

  const { envMapIntensity, envMapHeight, envMapRadius, envMapScale } =
    useControls("environment Map", {
      envMapIntensity: { value: 3.5, min: 0, max: 12 },
      envMapHeight: { value: 7, min: 0, max: 100 },
      envMapRadius: { value: 20, min: 10, max: 1000 },
      envMapScale: { value: 100, min: 10, max: 1000 },
    });
  useEffect(() => {
    scene.environmentIntensity = envMapIntensity;
  }, [envMapIntensity]);

  return (
    <>
      <BakeShadows />
      <Perf position="top-left" />
      <color args={["ivory"]} attach="background" />
      <OrbitControls makeDefault />
      <ContactShadows
        position={[0, 0, 0]}
        scale={10}
        resolution={128}
        far={5}
        color={color}
        opacity={opacity}
        blur={blur}
        frames={1000}
      />

      <Environment
        preset="city"
        ground={{
          height: envMapHeight,
          radius: envMapRadius,
          scale: envMapScale,
        }}
      />
      <mesh ref={sphere} position-x={-2} position-y={1} castShadow>
        <sphereGeometry />
        <meshStandardMaterial color="blue" map={sphereTexture} />
      </mesh>
      <mesh ref={cube} position-x={2} position-y={1} scale={1.5} castShadow>
        <boxGeometry />
        <meshStandardMaterial color="brown" map={cubeTexture} />
      </mesh>
    </>
  );
}
