import React from "react";
import { Canvas } from "@react-three/fiber";
import Spiral from "./Spiral";
import { OrbitControls, Stage } from "@react-three/drei";

const Background = () => {
  return (
    <Canvas
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <ambientLight />
      <pointLight intensity={1.8} position={[-10, 0, 8]} />
      <Spiral position={[1.5, -4, 1]} />
      <OrbitControls />
    </Canvas>
  );
};

export default Background;
