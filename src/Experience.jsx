import { useFrame, useThree } from "@react-three/fiber";
import {
  AccumulativeShadows,
  BakeShadows,
  ContactShadows,
  Environment,
  Lightformer,
  Line,
  OrbitControls,
  RandomizedLight,
  Sky,
  SoftShadows,
  Stage,
  useHelper,
} from "@react-three/drei";
import { useEffect, useRef } from "react";
import { Perf } from "r3f-perf";
import * as THREE from "three";
import { useControls } from "leva";

export default function Experience() {
  const scene = useThree((state) => state.scene);

  const cube = useRef();

  const directionalLightRef = useRef();
  useHelper(directionalLightRef, THREE.DirectionalLightHelper, 2);

  useFrame((state, delta) => {
    cube.current.rotation.y += delta * 0.2;
  });

  const { color, opacity, blur } = useControls("Contact Shadow", {
    color: { value: "#4b2709" },
    opacity: { value: 0.4, min: 0, max: 5, step: 0.01 },
    blur: { value: 2.8, min: 0, max: 4, step: 0.01 },
  });

  const { sunPosition } = useControls("sky", {
    sunPosition: { value: [1, 2, 3] },
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
      {/* <Environment
        preset="sunset"
        ground={{
          height: envMapHeight,
          radius: envMapRadius,
          scale: envMapScale,
        }}
      >
        {/* <color args={["#000000"]} attach="background" />
        <Lightformer
          position-z={-5}
          scale={5}
          color="red"
          intensity={10}
          form="ring"
        /> */}
      {/* </Environment> */} */}
      {/* <Sky sunPosition={sunPosition} /> */}
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
      {/* <directionalLight
        castShadow
        ref={directionalLightRef}
        position={sunPosition}
        intensity={1.5}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={5}
        shadow-camera-right={5}
        shadow-camera-bottom={-5}
        shadow-camera-left={-5}
      />{" "} */}
      // */}
      {/* <ambientLight intensity={1.5} /> */}
      {/* <Stage
        shadows={{
          type: "contact",
          opacity: 0.9,
          blur: 3,
        }}
        environment="sunset"
        preset="portrait"
        intensity={2}
      > */}
      <Environment
        preset="city"
        ground={{
          height: envMapHeight,
          radius: envMapRadius,
          scale: envMapScale,
        }}
      />
      <mesh position-x={-2} position-y={1} castShadow>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>
      <mesh ref={cube} position-x={2} position-y={1} scale={1.5} castShadow>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>
      {/* </Stage> */}
      {/* <mesh position-y={0} rotation-x={-Math.PI * 0.5} scale={10} receiveShadow>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh> */}
    </>
  );
}
