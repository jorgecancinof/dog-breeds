import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import * as THREE from 'three';

function DogHead() {
  const gltf = useLoader(GLTFLoader, '/cartoon-dog-head.glb');
  const modelRef = useRef<THREE.Group>(null!);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2,
      });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.x = THREE.MathUtils.lerp(modelRef.current.rotation.x, -mousePosition.y * 0.5, 0.1);
      modelRef.current.rotation.y = THREE.MathUtils.lerp(modelRef.current.rotation.y, mousePosition.x * 0.5, 0.1);
    }
  });

  return <primitive object={gltf.scene} ref={modelRef} scale={[4, 4, 4]} />;
}

export function DogHead3D() {
  return (
    <div className="w-[15rem] h-[15rem] sm:w-[22rem] sm:h-[22rem] lg:w-[32rem] lg:h-[32rem]">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={2.0} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <DogHead />
        <OrbitControls enableZoom={false} enableRotate={false} />
      </Canvas>
    </div>
  );
}
