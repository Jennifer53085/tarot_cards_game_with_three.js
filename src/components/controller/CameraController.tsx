import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { animationDuration } from "@app/utils/config";
import { useActionModeContext } from "../../context/ActionModeContext";
import { ActionMode } from "@app/enum/actionMode";
// import gsap from "gsap";

// interface CameraControllerProps {
//   position?: THREE.Vector3;
//   target?: THREE.Vector3;
// }

const CameraController: React.FC = () => {
  const { camera } = useThree();

  // const animationFrameId = useRef<number | null>(null);
  const startTime = useRef<number | null>(null);
  const { actionMode } = useActionModeContext();
  const [position, setPosition] = useState(new THREE.Vector3(0, 3, 5));
  const [target, setTarget] = useState(new THREE.Vector3(0, 0, 0));
  const previousPosition = useRef(new THREE.Vector3()); // 儲存相機位置
  const previousTarget = useRef(new THREE.Vector3()); // 儲存相機的目標（lookAt）

  // 初始化相機位置和目標
  useEffect(() => {
    // 假設相機已經初始化並設置
    previousPosition.current = position;
    previousTarget.current = target;
  }, [position, target]);

  //切換視角
  useEffect(() => {
    switch (actionMode) {
      case ActionMode.DEFAULT:
     
        break;
      case ActionMode.SHUFFLE_CARDS:
        setPosition(new THREE.Vector3(0, 2, 0));
        break;
      case ActionMode.DRAW_CARDS:
        setPosition(new THREE.Vector3(0, 2.5, 4));
        break;
      case ActionMode.FINISH_DRAW_CARDS:
        setPosition(new THREE.Vector3(0, 2, 2));
        setTarget(new THREE.Vector3(0, 1.5, 0));
        break;
        case ActionMode.READ_CARDS:
        setPosition(new THREE.Vector3(0, 0, 0.6));
        setTarget(new THREE.Vector3(0, 0, 0));
        break;
      default:
        break;
    }
  }, [actionMode])

  useLayoutEffect(() => {

    let animationFrameId = 0;

    // 記錄動畫開始時間
    startTime.current = performance.now();
    const fromPosition = previousPosition.current.clone(); // 起始位置
    const toPosition = position.clone(); // 目標位置
    const fromLookAt = previousTarget.current.clone(); // 起始位置
    const toLookAt = target.clone(); // 目標位置

    const animate = (time: number) => {
      if (!startTime.current) return;

      const elapsed = time - startTime.current; // 經過的時間
      const progress = Math.min(elapsed / (animationDuration*1000), 1); // 限制最大值為 1

      // 位置插值
      camera.position.lerpVectors(fromPosition, toPosition, progress);
      const newLookAt = new THREE.Vector3().lerpVectors(fromLookAt, toLookAt, progress);

      // 設定相機觀看的目標
      camera.lookAt(newLookAt);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        previousPosition.current.copy(toPosition); // 記錄最新位置
      }
    };

    // 開始動畫
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [position, target, camera]);

  return null;
};


export default CameraController;
