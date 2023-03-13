import React from "react";
import {
  GroupProps,
  MeshProps,
  ThreeEvent,
  useFrame,
  useThree,
} from "@react-three/fiber";
import {
  MeshDistortMaterial,
  MeshReflectorMaterial,
  MeshWobbleMaterial,
  useBVH,
  useGLTF,
} from "@react-three/drei";
import { Mesh } from "three";
import * as GeometryUtils from "three/examples/jsm/utils/GeometryUtils";
import {
  MeshBasicNodeMaterial,
  MeshStandardNodeMaterial,
} from "three/examples/jsm/nodes/materials/Materials";

function convertRange(
  value: number,
  r1: [number, number],
  r2: [number, number],
) {
  return ((value - r1[0]) * (r2[1] - r2[0])) / (r1[1] - r1[0]) + r2[0];
}

const onMove = () => {};

requestAnimationFrame(onMove);

const Spiral = (props: MeshProps) => {
  const { width, height } = useThree((state) => state.size);
  const mesh = React.useRef<Mesh>();
  const [speed, setSpeed] = React.useState(1);

  //@ts-ignore
  const { nodes, materials } = useGLTF("/spiral.glb");

  useFrame((state, delta) => {
    //@ts-ignore
    mesh.current.rotation.y += delta * speed;
  });

  React.useEffect(() => {
    //@ts-ignore
    // const a = new THREE.Geometry().fromBufferGeometry(mesh.geometry);
    // console.log(a);
    //@ts-ignore
  }, []);

  useBVH(mesh, {
    maxDepth: 222,
    verbose: true,
  });

  const onPointerEnter = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();

    setSpeed(0.5);
  };

  const onPointerLeave = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();

    setSpeed(1);
  };

  nodes.Spiral.geometry.computeVertexNormals(true);

  return (
    <mesh
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      ref={mesh}
      position={[1.5, -4, 0]}
      rotation={[0.2, 0, 0]}
      geometry={nodes.Spiral.geometry}
      material={materials.SpiralMaterial2}
    ></mesh>
  );
};

export default Spiral;
