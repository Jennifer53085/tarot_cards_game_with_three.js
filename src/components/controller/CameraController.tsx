import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useEffect, useLayoutEffect, useRef,useState } from "react";
import { cameraDuration } from "@app/utils/config";
import { useActionModeContext } from "../../context/ActionModeContext";
import { ActionMode } from "@app/enum/actionMode";
// import gsap from "gsap";

// interface CameraControllerProps {
//   position?: THREE.Vector3;
//   target?: THREE.Vector3;
// }

const CameraController: React.FC = () => {
  const { camera } = useThree();
  const previousPosition = useRef(camera.position.clone()); // 取當前相機位置作為起點
  // const animationFrameId = useRef<number | null>(null);
  const startTime = useRef<number | null>(null);
  const {actionMode}=useActionModeContext();
  const [position,setPosition]=useState(new THREE.Vector3(0, 3, 5));
  const [target,setTarget]=useState(new THREE.Vector3(0, 0, 0));

useEffect(()=>{
  switch (actionMode) {
        case ActionMode.DEFAULT:
          break;
        case ActionMode.SHUFFLE_CARDS:
          setPosition(new THREE.Vector3(0,2,0));
          break;
          case ActionMode.DRAW_CARDS:   
            setPosition(new THREE.Vector3(0,2.5,4));
          break;
        default:
          break;
      }
},[actionMode,setTarget])

  useLayoutEffect(() => {
    // // 停止當前動畫
    // if (animationFrameId.current) {
    //   cancelAnimationFrame(animationFrameId.current);
    // }

    let animationFrameId=0;

    // 記錄動畫開始時間
    startTime.current = performance.now();
    const fromPosition = previousPosition.current.clone(); // 起始位置
    const toPosition = position.clone(); // 目標位置

    const animate = (time: number) => {
      if (!startTime.current) return;

      const elapsed = time - startTime.current; // 經過的時間
      const progress = Math.min(elapsed / cameraDuration, 1); // 限制最大值為 1

      // 位置插值
      camera.position.lerpVectors(fromPosition, toPosition, progress);
      camera.lookAt(target);

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
