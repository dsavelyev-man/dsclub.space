//@ts-nocheck
import React, { useRef } from "react";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import { useGLTF, shaderMaterial, Stage } from "@react-three/drei";
import * as THREE from "three";

const MeshEdgesMaterial = shaderMaterial(
  {
    color: new THREE.Color("white"),
    size: new THREE.Vector3(1, 1, 1),
    thickness: 0.01,
    smoothness: 0.2,
  },
  /*glsl*/ `varying vec3 vPosition;
  void main() {
    vPosition = position;
    gl_Position = projectionMatrix * viewMatrix * instanceMatrix * vec4(position, 1.0);
  }`,
  /*glsl*/ `varying vec3 vPosition;
  uniform vec3 size;
  uniform vec3 color;
  uniform float thickness;
  uniform float smoothness;
  void main() {
    vec3 d = abs(vPosition) - (size * 0.5);
    float a = smoothstep(thickness, thickness + smoothness, min(min(length(d.xy), length(d.yz)), length(d.xz)));
    gl_FragColor = vec4(color, 1.0 - a);
  }`,
);

const temp = new THREE.Object3D();
const count = 10000;

extend({ MeshEdgesMaterial });

const Boxes = () => {
  const [down, setDown] = React.useState(false);
  const ref = useRef();

  useFrame((state, delta, frame) => {
    if (ref.current.position.y > 1) {
      if (!down) setDown(true);
    } else if (ref.current.position.y < 0.2) {
      if (down) setDown(false);
    }

    if (!down) {
      ref.current.position.y += delta / 10;
    } else {
      ref.current.position.y -= delta / 10;
    }

    ref.current.rotation.y += delta / 10;
  });

  React.useEffect(() => {
    let i = 0;
    const root = Math.round(Math.pow(count, 1 / 3));
    const halfRoot = root / 2;
    for (let x = 0; x < root; x++)
      for (let y = 0; y < root; y++)
        for (let z = 0; z < root; z++) {
          const id = i++;
          temp.rotation.set(Math.random(), Math.random(), Math.random());
          temp.position.set(
            halfRoot - x + Math.random(),
            halfRoot - y + Math.random(),
            halfRoot - z + Math.random(),
          );
          temp.updateMatrix();
          ref.current.setMatrixAt(id, temp.matrix);
        }
    ref.current.instanceMatrix.needsUpdate = true;
    //
    // outlines.current.geometry = ref.current.geometry;
    // outlines.current.instanceMatrix = ref.current.instanceMatrix;
  }, []);

  return (
    <instancedMesh ref={ref} args={[null, null, count]}>
      <sphereGeometry args={[0.12, 15, 15]} />
      <meshStandardMaterial color="#1d161f" />
    </instancedMesh>
  );
};

const MainBackground = () => {
  return (
    <Canvas
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Boxes />
    </Canvas>
  );
};

export default MainBackground;
