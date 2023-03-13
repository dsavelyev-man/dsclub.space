import React from "react";
import { Canvas } from "@react-three/fiber";
import Spiral from "./Spiral";
import {
  OrbitControls,
  Stage,
  AdaptiveDpr,
  AdaptiveEvents,
  useProgress,
  Html,
} from "@react-three/drei";

const CustomLoader = () => {
  const { progress } = useProgress();
  return (
    <Html>
      <span color="#FFF">{progress} loading</span>
    </Html>
  );
};

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
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
      <React.Suspense fallback={<CustomLoader />}>
        <Spiral />
      </React.Suspense>
      {/*<OrbitControls regress />*/}
    </Canvas>
  );
};

export default Background;
