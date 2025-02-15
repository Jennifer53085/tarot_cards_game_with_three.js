
/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: Viktor.Zhuravlev (https://sketchfab.com/Viktor.Zhuravlev)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/antique-table-dd87fbbae3c4481fb10c26a2546a99e1
Title: antique table
*/

//算命桌素材

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GroupProps } from '@react-three/fiber'
import * as THREE from 'three'
import { useActionModeContext } from '../../context/ActionModeContext';
import { ActionMode } from '@app/enum/actionMode';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Table: React.FC<GroupProps> = () => {
  const tableRef = useRef<THREE.Mesh>(null!);

  const { nodes, materials } = useGLTF(`${import.meta.env.BASE_URL}assets/models/forturntable.glb`);
  const mesh = nodes.kolco_low001__0 as THREE.Mesh;

  const { actionMode } = useActionModeContext();
  const animationRef=useRef<gsap.core.Tween|null>(null);

  useGSAP(() => {
    if (!tableRef.current) return;

    if (animationRef.current) {
      animationRef.current.kill();
    }

    switch (actionMode) {
      case ActionMode.DEFAULT:
        // 卡片緩慢旋轉
        animationRef.current= gsap.to(tableRef.current.rotation, {
          z: "-= 2 * Math.PI",
          repeat: -1,
          duration: 60,
          ease: "none",
          yoyo: true
        });
        break;

      case ActionMode.SHUFFLE_CARDS:
        // 停止旋轉，平滑回歸 0
        animationRef.current = gsap.to(tableRef.current.rotation, {
          z: 0,
          duration: 1,
          ease: "none",
        });
        break;

      default:
        break;
    }

  }, [actionMode]);




  return (
    <group dispose={null}>
      <group scale={0.01}>
        {/* 桌子 */}
        <mesh
          castShadow
          receiveShadow
          geometry={mesh.geometry}
          material={materials['Scene_-_Root']}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
          ref={tableRef}
        />
        {/* 光源（製作桌子反光效果） */}
        <pointLight
          position={[-30, 80, -80]}
          intensity={4}
          distance={8}
          decay={1}
          color="orange"
        />
      </group>
    </group>
  )
}

useGLTF.preload(`${import.meta.env.BASE_URL}assets/models/forturntable.glb`)


export default Table;