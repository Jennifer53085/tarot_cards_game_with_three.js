import React, { useEffect, useRef, useState } from "react";
import { useTexture } from "@react-three/drei";
import { MeshProps } from "@react-three/fiber";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";

import { useActionModeContext } from "@app/context/ActionModeContext";
import { useEventContext } from "@app/context/EventContext";
import { ActionMode } from "@app/enum/actionMode";
import { useCardsContext } from "@app/context/CardsContext";
import { tarotCardsData } from "@app/data/tarotCardsData";
import { totalCards } from "@app/utils/config";



interface CardProps extends MeshProps {
  tablePosition: THREE.Vector3;
  num?: number;
}


const TarotCard: React.FC<CardProps> = ({ tablePosition, num = 0 }) => {
  const { actionMode, actionDispatch } = useActionModeContext();
  const { cardsRef, addCard } = useCardsContext();
  const { eventState } = useEventContext();
  const cardRef = useRef<THREE.Mesh>(null!);
  const front = useTexture(`${import.meta.env.BASE_URL}${tarotCardsData[num].imgUrl}`);
  const back = useTexture(`${import.meta.env.BASE_URL}assets/texture/card_back.png`);
  const cardSize = { width: 4, height: 7, thickness: 0.1 };

  const { camera } = useThree();
  //TODO找出桌子頂端的數值
  const tableTop = 0.2;
  const cardsSpacing = 0.015;
  const [position, setPosition] = useState(new THREE.Vector3(tablePosition.x, num * cardsSpacing + tableTop + tablePosition.y, tablePosition.z))
  const [rotation, setRotation] = useState(new THREE.Euler(Math.PI / 2, 0, 0));

  const animationRef = useRef<gsap.core.Tween[]>([]);

  // const shaderMaterialRef = useRef<THREE.ShaderMaterial>(null!);




  // TODO之後有時間研究
  //製作發光體
  //   const fragmentShader = `
  //    varying vec2 vUv;
  // uniform vec3 uGlowColor;
  // uniform float uIntensity;

  // void main() {
  //     // 計算發光強度
  //     vec2 glowUv = (vUv - 0.5) * 1.1 + 0.5;
  //     float edgeDistX = min(glowUv.x, 1.0 - glowUv.x);
  //     float edgeDistY = min(glowUv.y, 1.0 - glowUv.y);
  //     float edgeDist = min(edgeDistX, edgeDistY);

  //     // 減少切齊的強度，增加過渡區域
  //     float glowStrength = smoothstep(0.6, 0.5, edgeDist) * uIntensity; // 增加過渡區域

  //     vec3 glowColor = uGlowColor * glowStrength;
  //     gl_FragColor = vec4(glowColor, glowStrength * 0.05);  // 正確的 gl_FragColor 使用
  // }
  //   `;

  //   const vertexShader = `
  //     varying vec2 vUv;

  //     void main() {
  //         vUv = uv;  // 傳遞 UV 到片段著色器
  //         gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);  // 計算頂點位置
  //     }
  //   `;

  //   const uniforms = useMemo(
  //     () => ({
  //       uGlowColor: { value: new THREE.Color("#ffffff") },
  //       uIntensity: { value: isHover ? 3 : 0 }  // 假設你想根據 isHover 改變強度
  //     }),
  //     [isHover] // 依賴於 isHover，當 isHover 改變時，會重新計算 uniforms
  //   );
  //變化部分用useGSAP沒有效果
  // useFrame(() => {
  //   const drawModes = [ActionMode.DRAW_CARDS, ActionMode.START_DRAW_CARDS, ActionMode.FINISH_DRAW_CARDS];
  //   if (shaderMaterialRef.current && drawModes.includes(actionMode)) {
  //     console.log("qwe")
  //     shaderMaterialRef.current.needsUpdate = true; // 每幀更新
  //   }
  // });

  //設定材質發亮（在useGSAP裡面沒有用）
  // useEffect(() => {
  //   if(!cardRef.current)return;
  //   // console.log(cardRef.current)
  //   if (isHover) {
  //       gsap.to(shaderMaterialRef.current.uniforms.uIntensity, {
  //           value: 3, // 設置發光強度
  //           duration: 0.5,
  //           ease: "power2.out",
  //           onUpdate: () => {
  //               shaderMaterialRef.current.needsUpdate = true;
  //           }
  //       });
  //   } else {
  //       gsap.to(shaderMaterialRef.current.uniforms.uIntensity, {
  //           value: 0, // 重置發光強度
  //           duration: 0.5,
  //           ease: "power2.out",
  //           onUpdate: () => {
  //               shaderMaterialRef.current.needsUpdate = true;
  //           }
  //       });
  //   }
  //   shaderMaterialRef.current.needsUpdate = true;
  // }, [isHover]);

  //取得相機資訊（卡片換位置要用）
  useEffect(() => {
    if (camera instanceof THREE.OrthographicCamera) {
      const width = camera.right - camera.left; // 畫面範圍的寬度
      const height = camera.top - camera.bottom; // 畫面範圍的高度

      console.log('Width:', width, 'Height:', height);

      // 計算左邊界，並加上偏移量
      const offset = 0.5;
      const leftBoundary = camera.left + (width * 0.1) + offset;
      console.log('Left Boundary:', leftBoundary);
    }
  }, [camera]);

  //設置位置
  useEffect(() => {
    if (!cardRef.current) return;
    cardRef.current.userData.cardId = num;
    setPosition(cardRef.current.position);
    setRotation(cardRef.current.rotation);
  }, [position, rotation, num]);

  //動畫製作
  useGSAP(() => {
    if (!cardRef.current) return;

    if (animationRef.current.length > 0) {
      animationRef.current.forEach((anim) => anim.kill())
    }

    switch (actionMode) {
      case ActionMode.DEFAULT: {
        // 卡片緩慢旋轉
        const _aniRotation = gsap.to(cardRef.current.rotation, {
          z: "+= 2 * Math.PI",
          repeat: -1,
          duration: 60,
          ease: "none",
          yoyo: true,
        });
        animationRef.current.push(_aniRotation);
        break;

      }

      case ActionMode.SHUFFLE_CARDS: {
        // 停止旋轉，平滑回歸 0
        const _aniRotation = gsap.to(cardRef.current.rotation, {
          z: 0,
          duration: 1,
          ease: "none",
        });
        animationRef.current.push(_aniRotation)

        break;
      }

      case ActionMode.START_SHUFFLE_CARDS: {

        const _aniPosition = gsap.to(cardRef.current.position, {
          x: position.x + Math.random() * 1 - 0.5,
          z: position.z + Math.random() * 1 - 0.5,
          duration: Math.random() * 2 + 0.5,
          ease: "none",
          stagger: 0.05,
          repeat: -1,
          yoyo: true,
        });
        const _aniRotation = gsap.to(cardRef.current.rotation, {
          z: rotation.z + Math.random() * Math.PI * 3,
          duration: Math.random() * 2 + 0.5,
          ease: "back.inOut(1.7)",
          repeat: -1,
          yoyo: true
        });

        animationRef.current.push(_aniPosition, _aniRotation);
        break;
      }

      case ActionMode.FINISH_SHUFFLE_CARDS: {

        let shuffleOrder = num;
        let isReverse = false;
        if (cardsRef.current.length === totalCards) {
          const newCardData = cardsRef.current[num].userData;
          isReverse = newCardData?.isReverse || false;
          shuffleOrder = newCardData?.shuffleOrder ?? num;
        }


        const _aniPosition = gsap.to(cardRef.current.position, {
          x: tablePosition.x,
          y: tablePosition.y + tableTop + shuffleOrder * cardsSpacing,
          z: tablePosition.z,
          duration: 0.5,
          ease: "power4.in",
        });

        const _aniRotation = gsap.to(cardRef.current.rotation, {
          z: isReverse ? 0 : Math.PI,//Math.PI是正位
          duration: 0.5,
          ease: "power4.in",
        });

        animationRef.current.push(_aniPosition, _aniRotation);
        break;
      }
      case ActionMode.DRAW_CARDS: {
        const horizontalPan = 0.2;
        const verticalPan = 1;
        const rowCount = totalCards / 2;
        const middleX = (rowCount - 1) * horizontalPan * 0.5;

        let shuffleOrder = num;
        if (cardsRef.current.length === totalCards) {
          const newCardData = cardsRef.current[num].userData;
          shuffleOrder = newCardData?.shuffleOrder ?? num;
        }

        let _aniPosition = null;

        if (shuffleOrder < rowCount) {
          _aniPosition = gsap.to(cardRef.current.position, {
            x: tablePosition.x + shuffleOrder * horizontalPan - middleX, // 參考桌面座標
            y: tablePosition.y + tableTop + shuffleOrder * cardsSpacing,
            z: tablePosition.z,
            duration: 0.1 + shuffleOrder * 0.05, // 統一動畫時間
            ease: "expo.inOut"
          });
        } else {
          _aniPosition = gsap.to(cardRef.current.position, {
            x: tablePosition.x + (shuffleOrder - rowCount) * horizontalPan - middleX,
            y: tablePosition.y + tableTop + shuffleOrder * cardsSpacing,
            z: tablePosition.z + verticalPan,
            duration: 0.1 + shuffleOrder * 0.05,
            ease: "expo.inOut",
            onComplete: () => {
              setTimeout(() => {
                actionDispatch({ type: "SET_MODE", mode: ActionMode.START_DRAW_CARDS });
              }, 200)
            }
          });
        }

        animationRef.current.push(_aniPosition);

        break;
      }
      case ActionMode.START_DRAW_CARDS: {
        console.log(123456)
        //滑鼠滑過動畫
        const hoverIndex = eventState.hoverTarget;
        if (eventState.isHover && cardRef.current.userData.shuffleOrder === hoverIndex) {
          // 使用 GSAP 動畫控制發光
          const _anilighter = gsap.to(cardRef.current.material, {
            emissiveIntensity: 0.1, // 設置發光強度
            duration: 0.3, // 動畫持續時間
          });

          animationRef.current.push(_anilighter);
        } else {
          // 如果不再 hover，恢復原狀
          const _anilighter = gsap.to(cardRef.current.material, {

            emissiveIntensity: 0, // 恢復發光強度為 0
            duration: 0.3, // 動畫持續時間
          });

          animationRef.current.push(_anilighter);
        }
// console.log(eventState.pickArr)
        // if (camera instanceof THREE.OrthographicCamera) {
        //   console.log(123)
        //   // 1️⃣ 計算可視範圍
        //   const offset = 0.5; // 避免卡片貼到邊界
        //   const frustumSize = camera.right - camera.left;

        //   // 2️⃣ 計算「左、中、右」位置
        //   const leftX = camera.left + frustumSize * 0.2 + offset;  // 左邊 20%
        //   const centerX = (camera.left + camera.right) / 2;        // 正中央
        //   const rightX = camera.right - frustumSize * 0.2 - offset; // 右邊 20%

        //   // 3️⃣ 根據 index 設定卡片的目標 X 位置
        //   const planingCardPositions:number[] = [leftX, centerX, rightX];



        //   switch (eventState.pickArr.length) {
        //     case 1: {
        //       eventState.pickArr.forEach((clickItem, index) => {
        //         if (cardRef.current.userData.cardId === clickItem.cardId) {

        //           const _aniPosition = gsap.to(cardRef.current.position, {
        //             x: planingCardPositions[0],
        //             y:-1,
        //             z:1,
        //             duration: 0.3, // 動畫持續時間
        //           });

        //           const _aniRotation = gsap.to(cardRef.current.rotation, {
        //             z:  Math.PI/4,//Math.PI是正位
        //             duration: 0.5,
        //             ease: "power4.in",
        //           });
          
        //           animationRef.current.push(_aniPosition, _aniRotation);
        //         }


        //       })
        //     }
        //       break;
        //     case 2:
        //       break;
        //     case 3: {
        //       //點擊完之後要切換到下一個actionMode
        //       actionDispatch({ type: "SET_MODE", mode: ActionMode.FINISH_DRAW_CARDS })
        //     }
        //       break;
        //     default:
        //       break;
        //   }

        // }


      }
        break;




      default:
        break;
    }

  }, {
    dependencies: [actionMode, cardsRef],
    revertOnUpdate: false
  });


  if (cardsRef.current.indexOf(cardRef.current) === -1) {
    addCard(cardRef.current);
  }

  // const handlePointerEnter = () => {
  //   gl.domElement.style.cursor = 'pointer';
  //   // console.log({isHover})
  //   // console.log(shaderMaterialRef.current.userData.order)
  //   // console.log(e)

  //   // if(shaderMaterialRef.current.userData.shuffleOrder==hoverTarget){
  //   // if(isHover){
  //   //   gsap.to(shaderMaterialRef.current.uniforms.uIntensity, {
  //   //     value: 3, // 設置發光強度
  //   //     duration: 0.5,
  //   //     ease: "power2.out",
  //   //     onUpdate: () => {
  //   //       shaderMaterialRef.current.needsUpdate = true;
  //   //     }
  //   //   });
  //   // }

  //   // }

  // };

  // const handlePointerLeave = () => {
  //   gl.domElement.style.cursor = 'default';


  // };


  return (
    <mesh ref={cardRef}
      position={position} rotation={rotation} scale={[0.1, 0.1, 0.1]}
    // onPointerEnter={handlePointerEnter} onPointerLeave={handlePointerLeave}
    >
      <boxGeometry args={[cardSize.width, cardSize.height, cardSize.thickness]} />
      <meshStandardMaterial attach="material-0" color={0x081e36}
        emissive={0xffa500} // 初始發光顏色
        emissiveIntensity={0} // 初始發光強度為0
      />
      <meshStandardMaterial attach="material-1" color={0x081e36}
        emissive={0xffa500} // 初始發光顏色
        emissiveIntensity={0} // 初始發光強度為0
      />
      <meshStandardMaterial attach="material-2" color={0x081e36}
        emissive={0xffa500} // 初始發光顏色
        emissiveIntensity={0} // 初始發光強度為0
      />
      <meshStandardMaterial attach="material-3" color={0x081e36}
        emissive={0xffa500} // 初始發光顏色
        emissiveIntensity={0} // 初始發光強度為0 
      />
      <meshStandardMaterial attach="material-4" map={front} />
      <meshStandardMaterial attach="material-5" map={back}
        emissive={0xffa500} // 初始發光顏色
        emissiveIntensity={0} // 初始發光強度為0
      />
      {/* //TODO之後有時間再來研究加上shader的怎麼抓 */}
      {/* <mesh>
        <boxGeometry args={[cardSize.width * 1.1, cardSize.height * 1.1, cardSize.thickness * 1.1]} />
        <shaderMaterial
          ref={shaderMaterialRef}
          fragmentShader={fragmentShader}
          vertexShader={vertexShader}
          uniforms={uniforms}
          transparent={true}  // 設定為透明材質
          userData={{shuffleOrder:cardRef.current?.userData?.shuffleOrder}}
        />
      </mesh> */}
    </mesh>

  );
};

export default TarotCard;



