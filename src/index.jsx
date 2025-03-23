import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import * as THREE from "three";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <Canvas
    shadows
    camera={{
      fov: 50,
      near: 0.1,
      far: 200,
      position: [-4, 3, 6],
    }}
  >
    <Experience />
  </Canvas>
);
