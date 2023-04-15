"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Image,
  Gltf,
  ScrollControls,
  useScroll,
  Loader,
} from "@react-three/drei";
import { Ground } from "./Ground";
// import Lenis from "@studio-freight/lenis";
import { Suspense } from "react";
// import {Envior}
// import { Color } from "three";

import * as THREE from "three";

// import studio from "@theatre/studio";
// import extension from "@theatre/r3f/dist/extension";

// import { LayerMaterial, Depth } from "lamina";

import {
  SheetProvider,
  PerspectiveCamera,
  useCurrentSheet,
} from "@theatre/r3f";
import { getProject, val } from "@theatre/core";

import flyThroughState from "./state.json";

function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef();
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (mesh.current.rotation.x += delta));
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        // emissive={[4, 0.1, 0.4]}
        color={[0, 0, 0]}
        emissiveIntensity={10}
      />
    </mesh>
  );
}

const BillBoardsData = [
  {
    id: 1,
    distance: 0,
  },
  {
    id: 2,
    distance: 2,
  },
  {
    id: 3,
    distance: 4,
  },
  {
    id: 4,
    distance: 6,
  },
  {
    id: 5,
    distance: 6,
  },
  {
    id: 6,
    distance: 6,
  },
  {
    id: 7,
    distance: 6,
  },
  {
    id: 8,
    distance: 6,
  },
  {
    id: 9,
    distance: 6,
  },
  {
    id: 9,
    distance: 6,
  },
  {
    id: 10,
    distance: 6,
  },
  {
    id: 11,
    distance: 6,
  },
];

const Billboard = ({ id }) => {
  // console.log(bb.nodes);
  return (
    <>
      <group
        position={[id % 2 ? -3.5 : 3.5, 0, -id * 8]}
        rotation={[0, id % 2 ? 1 : -1, 0]}
        // id % 2 ? -1 : 1
      >
        <group
          position={[0.01, 1.7, 0]}
          scale={[2, 2.1, 2]}
          rotation={[0, 0, 0]}
        >
          <Image
            url="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
            transparent
            opacity={1}
            scale={1.8}
            onClick={() => {
              alert("click");
            }}
          />
        </group>

        <Gltf
          src="/models/billboard.gltf"
          rotation={[0, -Math.PI / 2, 0]}
          position={[0, 0, 0]}
          scale={0.5}
        />
      </group>
    </>
  );
};

const BillBOardGroup = () => {
  // const bb = useGLTF("/models/billboard.gltf");
  return (
    <>
      {BillBoardsData.map((item, index) => {
        return (
          <group key={index}>
            <Billboard id={item.id} />
          </group>
        );
      })}
    </>
  );
};
// let GlowBox = ({ position = [1, 5, 2], args = [6, 6, 6] }) => {
//   let emissive = "#A11F9E";
//   let glow = "#A11F9E";

//   let size = 4;
//   let scale = size * 1.2;
//   let near = -25;
//   let far = 100;
//   let color = glow || emissive;
//   return (
//     <>
//       <mesh scale={1} position={position}>
//         <boxGeometry args={args} />

//         <LayerMaterial
//           // transparent
//           color="#A11F9E"
//           depthWrite={false}
//           blending={THREE.CustomBlending}
//           blendEquation={THREE.AddEquation}
//           blendSrc={THREE.SrcAlphaFactor}
//           blendDst={THREE.DstAlphaFactor}
//         >
//           <Depth
//             colorA={color}
//             colorB="#A11F9E"
//             alpha={1}
//             mode="normal"
//             near={near * scale}
//             far={far * scale}
//             origin={[0, 0, 0]}
//           />
//           <Depth
//             colorA={color}
//             colorB="#A11F9E"
//             alpha={0.5}
//             mode="add"
//             near={-40 * scale}
//             far={far * 1.2 * scale}
//             origin={[0, 0, 0]}
//           />
//           {/* <Depth
//             colorA={color}
//             colorB="black"
//             alpha={1}
//             mode="add"
//             near={-15 * scale}
//             far={far * 0.7 * scale}
//             origin={[0, 0, 0]}
//           /> */}
//           {/* <Depth
//             colorA={color}
//             colorB="black"
//             alpha={1}
//             mode="add"
//             near={-10 * scale}
//             far={far * 0.68 * scale}
//             origin={[0, 0, 0]}
//           /> */}
//         </LayerMaterial>
//       </mesh>
//     </>
//   );
// };
const Test = () => {
  const [changing, setIsChanging] = useState(false);
  const ref = useRef(null);
  // const sheet = getProject("Fly Through").sheet("Scene");
  const sheet = getProject("Fly Through", { state: flyThroughState }).sheet(
    "Scene"
  );
  function easeInSine(x) {
    return 1 - Math.cos((x * Math.PI) / 2);
  }

  return (
    <div style={{}} className=" home-page-wrapper">
      {/* <Header /> */}

      <Suspense fallback={<div>Loading.....</div>}>
        <Canvas
          gl={{ preserveDrawingBuffer: true }}
          style={{ height: "100vh", width: "100%", backgroundColor: "black" }}
        >
          <ScrollControls
            pages={5}
            infinite={true}
            damping={0}
            children={ref.current}
          >
            <SheetProvider sheet={sheet} ref={ref}>
              <Scene />
              {/* <GlowBox position={[7, 0, 0]} args={[0.2, 0.2, 400]} />
              <GlowBox position={[-7, 0, 0]} args={[0.2, 0.2, 400]} /> */}
            </SheetProvider>
          </ScrollControls>
        </Canvas>
      </Suspense>

      <Loader />
    </div>
  );
};

function Scene() {
  const camera = useRef(null);
  const cubeCamera = useRef(null);
  const isChanging = useRef();
  const sheet = useCurrentSheet();
  const scroll = useScroll();

  const scrolling = useRef(false);

  useFrame(() => {
    // console.log(scroll, sheet, scroll.el.scrollTop);

    // the length of our sequence
    const sequenceLength = val(sheet.sequence.pointer.length);
    // update the "position" of the playhead in the sequence, as a fraction of its whole length

    sheet.sequence.position = scroll.offset * sequenceLength;
  });

  const bgColor = "#84a4f4";

  return (
    <>
      <Suspense>
        <BillBOardGroup />
      </Suspense>

      <Ground />

      {/* <group ref={cubeCamera}>
        <CubeCamera
          resolution={256}
          frames={Infinity}
          position={[100, 100, 100]}
        >
          {(texture) => (
            <>
              <Environment map={texture} />
            </>
          )}
        </CubeCamera>
      </group> */}

      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => {
        const ref = useRef(null);

        return (
          <>
            <Suspense>
              {/* <Box position={[0, 2, -8 * item]} /> */}
              <pointLight
                position={[0, 10, -8 * item]}
                intensity={1}
                // decay={100}
                distance={15}
                color={"white"}
              />

              {/* <GlowBox position={[1, 5, -8 * item]} args={[2, 0.1, 4]} /> */}

              <Gltf
                src="/models/corridoor.gltf"
                rotation={[0, 0, 0]}
                position={[0, -1, -8 * item]}
                scale={2}
              />
            </Suspense>
          </>
        );
      })}
      {/* <group>
        <glowBox />
      </group> */}

      <PerspectiveCamera
        ref={camera}
        theatreKey="Camera"
        makeDefault
        position={[0, 0, 0]}
        fov={90}
        near={0.1}
        far={70}
      />
    </>
  );
}

export default Test;
