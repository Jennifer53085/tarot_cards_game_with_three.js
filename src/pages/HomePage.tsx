import { useEffect, useState, useRef, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import CameraController from '@app/components/controller/CameraController';//相機控制器
import * as THREE from 'three'

import TitleUpdater from '@app/components/controller/TitleUpdater';
//3D模型
import TarotCard from '@app/components/threeModels/TarotCard';
import Table from '@app/components/threeModels/Table';

import { ActionMode } from '@app/enum/actionMode';
import { useActionModeContext } from '@app/context/ActionModeContext';
import { webName } from '@app/utils/config';//網站名稱
import { tarotCardsData } from '@app/data/tarotCardsData';//塔羅牌相關資料

import { useCardsContext } from '@app/context/CardsContext';
import { getNextMode } from '@app/utils/function';
import PointerRaycaster from '@app/components/controller/PointerRaycaster';
import { totalCards } from '@app/utils/config';

import gsap from "gsap";
import ResultContainer from '@app/components/items/ResultContainer';



/*
tips：three.js canvas記得加上useRef以避免重新渲染

*/
//首頁
const HomePage = () => {
  const TitleArr = webName.split(' ');
  const defaultObjPosition = new THREE.Vector3(0, 0, 0);
  const { actionMode, actionDispatch } = useActionModeContext();

  const [btnText, setBtnText] = useState("");
  const [isFlashing, setIsFlashing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { cardsRef,clearCards } = useCardsContext();
  const shuffleCountRef = useRef(0);

  //結果處理
  const [isResult, setIsResult] = useState(false);


  //處理洗牌邏輯
  const getShuffleCardsOrder = useCallback(() => {
    if (Array.isArray(cardsRef.current) && cardsRef.current.length > 0) {
      const _shuffleArr = Array.from({ length: totalCards }, (_, index) => index);

      for (let i = totalCards - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [_shuffleArr[i], _shuffleArr[randomIndex]] = [_shuffleArr[randomIndex], _shuffleArr[i]];
      }

      cardsRef.current.forEach((card, i) => {

        card.userData = {
          ...card.userData,
          shuffleOrder: _shuffleArr[i],  // 例如洗牌順序
          isReverse: Math.random() > 0.5,  // 隨機逆位
        };

      })
    }

  }, [cardsRef])


  useEffect(() => {
    if (actionMode !== ActionMode.START_SHUFFLE_CARDS) return;
    //計算洗牌次數
    shuffleCountRef.current = shuffleCountRef.current + 1;
    getShuffleCardsOrder();//這裡做洗牌邏輯
  }, [actionMode, getShuffleCardsOrder]);

  //控制洗牌過程
  useEffect(() => {
    switch (actionMode) {
      case ActionMode.DEFAULT:
        setBtnText("Reading Fortune");
        setIsResult(false);
        break;
      case ActionMode.SHUFFLE_CARDS:
        setIsFlashing(true);
        setBtnText("Tap the Cards to Shuffle");
        break;
      case ActionMode.START_SHUFFLE_CARDS:
        setBtnText("Hold to Keep Shuffling");

        break;
      case ActionMode.FINISH_SHUFFLE_CARDS:
        //至少洗一次牌才可以進行下一步動作
        if (shuffleCountRef.current > 0) {
          setBtnText("Is it Complete?");
          setIsFlashing(false);
        }
        break;
      case ActionMode.DRAW_CARDS:
      case ActionMode.START_DRAW_CARDS:
        setBtnText("Pick 3 Cards to Continue");
        break;
      case ActionMode.FINISH_DRAW_CARDS:
        setBtnText("Reading result?");
        break;
      default:
        setIsFlashing(false);
        setBtnText("");
        break;
    }
  }, [actionMode, shuffleCountRef]);

  const handleNextStep = (event: React.PointerEvent<HTMLButtonElement>) => {
    event.nativeEvent.stopImmediatePropagation();//stopImmediatePropagation可以避免同一個元件上的不同事件衝突
    switch (actionMode) {
      case ActionMode.DEFAULT:
        actionDispatch({ type: "SET_MODE", mode: getNextMode(ActionMode.DEFAULT) });
        break;
      case ActionMode.FINISH_SHUFFLE_CARDS:
        actionDispatch({ type: "SET_MODE", mode: getNextMode(ActionMode.FINISH_SHUFFLE_CARDS) });
        break;
      case ActionMode.FINISH_DRAW_CARDS:
        {
          gsap.to(canvasRef.current, {
            opacity: 0,
            duration: 1,
            onComplete: () => {
              setIsResult(true);
              if (canvasRef.current) {
                canvasRef.current.style.display = "none";
              }
              actionDispatch({ type: "SET_MODE", mode: getNextMode(ActionMode.FINISH_DRAW_CARDS) });
            },
          });

          break;
        }
      default:
        break;
    }
  };


  //顯示結果頁面
  useEffect(() => {
    if (isResult) {
      gsap.fromTo("main", { opacity: 0 }, { opacity: 1, duration: 1 });
      clearCards();
    }
  }, [isResult]);



  return (
    <div className="w-screen h-screen background-primary-color">
      <TitleUpdater title={webName} />
      <header
        className={`p-[2rem] w-full ${isResult ? "relative" : "absolute"} font-black tracking-wider uppercase
          flex flex-col justify-start sm:justify-center space-x-6
           transition-all duration-1000 ease-in-out transform
          ${actionMode === ActionMode.DEFAULT ?
            'text-[3rem] sm:text-[4rem] lg:text-[5rem] text-primary-color top-5 sm:top-20 left-0 sm:flex-row'
            : 'text-[1rem] z-1 text-white top-0 left-0 '}
          `}>

        {TitleArr.map((title, i) => <span key={i} className="block md:inline">{title}</span>)}
      </header>

      {!isResult && <Canvas ref={canvasRef} className='w-100 h-100' style={{ background: 'transparent' }}>
        {/* <OrbitControls
          enableRotate
          enableZoom
          enablePan={false}
          enableDamping
          maxPolarAngle={Math.PI / 3}  // 最大俯仰角（不讓他們看到桌子底部）
        /> */}
        <CameraController />
        <ambientLight />
        <PointerRaycaster />


        <Sparkles count={30} scale={actionMode === ActionMode.DEFAULT ? 5 : 10} size={3} speed={0.5} noise={0.2} color="orange" />
        <Table position={defaultObjPosition} />
        {
          Array.from({ length: totalCards }, (_, i) => {
            return <TarotCard key={i} tablePosition={defaultObjPosition} num={tarotCardsData[i].cardId} />;
          })
        }

      </Canvas>}

      {!isResult && <button
        id="nextActionBtn"
        className={`
          absolute bottom-15 left-1/2 
          transform -translate-x-1/2 
          transition-opacity duration-500 
          ${(isFlashing) && "animation-flashing opacity-0"}
          ${(actionMode === ActionMode.DEFAULT || actionMode === ActionMode.FINISH_SHUFFLE_CARDS || actionMode === ActionMode.FINISH_DRAW_CARDS) &&
          "btn-outline text-2xl"
          }
          `}
        onPointerUp={handleNextStep}
      >{btnText}</button>}

      {isResult && <ResultContainer />}
      <footer className='fixed bottom-[0.5rem] left-0 right-0 z-10 text-center text-white text-xs'>
        Copyright&nbsp;&copy;
        <span id="year"></span>&nbsp;
        <a href="http://jennifer53085.infinityfreeapp.com/">Huang Tzu-Ning.</a>
        All rights reserved.</footer>
    </div>
  );
}

export default HomePage;