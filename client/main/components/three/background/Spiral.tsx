import React from "react";
import { GroupProps, MeshProps, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

function convertRange(
  value: number,
  r1: [number, number],
  r2: [number, number],
) {
  return ((value - r1[0]) * (r2[1] - r2[0])) / (r1[1] - r1[0]) + r2[0];
}

const Spiral = (props: GroupProps) => {
  const mesh = React.useRef();
  const [summer, setSummer] = React.useState(1);

  //@ts-ignore
  const { nodes, materials } = useGLTF("/spiral.glb");

  useFrame((state, delta) => {
    //@ts-ignore
    mesh.current.rotation.y += delta * summer;
  });

  React.useEffect(() => {
    //@ts-ignore

    document.addEventListener("mousemove", (e) => {
      setSummer(convertRange(e.offsetX, [600, 1000], [1, 1.5]));
    });
  }, []);

  return (
    <group {...props}>
      <mesh
        ref={mesh}
        material={materials.Spiral}
        geometry={nodes.Spiral.geometry}
      />
    </group>
  );
};

export default Spiral;
