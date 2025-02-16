import { useEffect, useRef, useState } from 'react';
import { useEventContext } from '@app/context/EventContext';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import CameraController from '@app/components/controller/CameraController'; // 相機控制器
import TarotCard from '@app/components/threeModels/TarotCard';
import { animationDuration, language, totalDrawCards } from '@app/utils/config'; // 顯示文字語系
import { tarotCardsData } from '@app/data/tarotCardsData'; // 塔羅牌相關資料
import { useCardsContext } from "@app/context/CardsContext";


import { useGSAP } from '@gsap/react';
import gsap from "gsap";
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { Draggable } from 'gsap/Draggable';

import { useActionModeContext } from '@app/context/ActionModeContext';

const ResultContainer: React.FC = () => {
    const { clearCards } = useCardsContext();//需要把原本的清空
    const { eventState, eventDispatch } = useEventContext();
    const { actionDispatch } = useActionModeContext();
    const resultArr = ["Past", "Now", "Future"];
    const [showIndex, setShowIndex] = useState(0);
    const [resultText, setResultText] = useState(resultArr[0]);
    const [cardInformation, setCardInformation] = useState<{ cardId: number, cardName: string, isReverse: boolean, position: string, cardContent: string } | null>(null);
    const [isChange, setIsChange] = useState(false);
    const resultContainerRef = useRef<HTMLDivElement>(null);
    const cardContainerRef = useRef<HTMLDivElement>(null);
    const resultCanvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (eventState.pickArr.length !== totalDrawCards) return;
        const defaultContent = eventState.pickArr[showIndex];
        const cardId = defaultContent.cardId;
        const cardName = tarotCardsData[cardId].lang[language].cardName;
        const cardPositionText = defaultContent.isReverse ? "reversed" : "upright";
        const cardReverseDataKey = defaultContent.isReverse ? "meaningReversed" : "meaningUpright";
        const cardContent = tarotCardsData[cardId].lang[language][cardReverseDataKey];

        const _data = {
            cardId,
            cardName,
            isReverse: defaultContent.isReverse,
            position: cardPositionText,
            cardContent
        }

        setCardInformation(_data);
    }, [eventState, showIndex])

    //控制顯示卡片
    const pressAction = (action: string) => {
        if (action == "prev") {
            const newIndex = (showIndex === 0) ? totalDrawCards - 1 : showIndex - 1;
            setShowIndex(newIndex);
            setResultText(resultArr[newIndex]);
        } else {
            const newIndex = (showIndex === totalDrawCards - 1) ? 0 : showIndex + 1;
            setShowIndex(newIndex);
            setResultText(resultArr[newIndex]);
        }
        //控制動換淡出
        setIsChange(true);
    }


    //控制淡入淡出
    useGSAP(() => {
        if (isChange) {
            gsap.fromTo(cardContainerRef.current, {
                opacity: 0
            }, {
                opacity: 1,
                duration: animationDuration
            })
            setIsChange(false)
        }
    }, { dependencies: [isChange] })

    //重新抽牌
    const restart = () => {
        eventDispatch({ type: "SET_PICK_TARGET", payload: [] });
        clearCards();
        actionDispatch({ type: "RESET_MODE" })
    }

    // useGSAP(() => {
    //     //TODO有空再來做動畫
    //     // 註冊動畫插件
    //     gsap.registerPlugin(ScrollTrigger, Draggable);


    //     let iteration = 0;

    //     // 設置初始狀態
    //     const cards = gsap.utils.toArray(cardContainerRef.current);
    //     gsap.set(cards, { xPercent: 0, opacity: 0, scale: 0 });


    //     const spacing = 0.3;
    //     const snapTime = gsap.utils.snap(spacing);

    //     const animateFunc = (element: HTMLDivElement) => {
    //         const tl = gsap.timeline();
    //         tl.fromTo(element, { scale: 0, opacity: 0 }, {
    //             scale: 1,
    //             opacity: 1,
    //             zIndex: 100,
    //             duration: 0.5,
    //             yoyo: true,
    //             repeat: 1,
    //             ease: "power1.in",
    //             immediateRender: false,
    //         })
    //             .fromTo(element, { xPercent: 0 }, {
    //                 xPercent: -100,
    //                 duration: 1,
    //                 ease: "none",
    //                 immediateRender: false,
    //             }, 0);
    //         return tl;
    //     };

    //     const seamlessLoop = buildSeamlessLoop(cards, spacing, animateFunc);

    //     const playhead = { offset: 0 };
    //     const wrapTime = gsap.utils.wrap(0, seamlessLoop.duration());

    //     const scrub = gsap.to(playhead, {
    //         offset: 0,
    //         onUpdate() {
    //             seamlessLoop.time(wrapTime(playhead.offset));
    //         },
    //         duration: 0.5,
    //         ease: "power3",
    //         paused: true
    //     });

    //     const trigger = ScrollTrigger.create({
    //         start: 0,
    //         onUpdate(self) {
    //             const scroll = self.scroll();
    //             if (scroll > self.end - 1) {
    //                 wrap(1, 2);
    //             } else if (scroll < 1 && self.direction < 0) {
    //                 wrap(-1, self.end - 2);
    //             } else {
    //                 scrub.vars.offset = (iteration + self.progress) * seamlessLoop.duration();
    //                 scrub.invalidate().restart();
    //             }
    //         },
    //         end: "+=300",
    //         pin: resultContainerRef.current
    //     });

    //     const progressToScroll = (progress: number) => {
    //         return gsap.utils.clamp(1, trigger.end - 1, gsap.utils.wrap(0, 1, progress) * trigger.end);
    //     };

    //     const wrap = (iterationDelta: number, scrollTo: number) => {
    //         iteration += iterationDelta;
    //         trigger.scroll(scrollTo);
    //         trigger.update();
    //     };

    //     function scrollToOffset(offset: number) {

    //         const snappedTime = snapTime(offset);
    //         const progress = (snappedTime - seamlessLoop.duration() * iteration) / seamlessLoop.duration();
    //         const scroll = progressToScroll(progress);

    //         if (progress >= 1 || progress < 0) {
    //             return wrap(Math.floor(progress), scroll);
    //         }
    //         trigger.scroll(scroll);
    //     }

    //     function buildSeamlessLoop(items: any[], spacing: number, animateFunc: (element: HTMLDivElement) => gsap.core.Timeline) {
    //         const rawSequence = gsap.timeline({ paused: true });
    //         const seamlessLoop = gsap.timeline({
    //             paused: true,
    //             repeat: -1,
    //             onRepeat() {
    //                 this._time === this._dur && (this._tTime += this._dur - 0.01);
    //             },
    //             onReverseComplete() {
    //                 this.totalTime(this.rawTime() + this.duration() * 100);
    //             }
    //         });

    //         const cycleDuration = spacing * items.length;
    //         let dur;

    //         items.concat(items).concat(items).forEach((item, i) => {
    //             const anim = animateFunc(items[i % items.length]);
    //             rawSequence.add(anim, i * spacing);
    //             if (!dur) dur = anim.duration();
    //         });

    //         seamlessLoop.fromTo(rawSequence, {
    //             time: cycleDuration + dur / 2
    //         }, {
    //             time: "+=" + cycleDuration,
    //             duration: cycleDuration,
    //             ease: "none"
    //         });

    //         return seamlessLoop;
    //     }

    //     Draggable.create(".drag-proxy", {
    //         type: "x",
    //         trigger: "main",
    //         onPress: (event) => {
    //             console.log("123")

    //             // console.log(event)
    //             event.target.startOffset = scrub.vars.offset;
    //         },
    //         onDrag: (event) => {
    //             scrub.vars.offset = event.target.startOffset + (event.startX - event.x) * 0.001;
    //             scrub.invalidate().restart();
    //         },
    //         onDragEnd: () => {
    //             scrollToOffset(scrub.vars.offset);
    //         }
    //     });

    // }, { dependencies: [eventState,ScrollTrigger,Draggable], revertOnUpdate: false });

    return (
        <>
            <main ref={resultContainerRef} className='w-[100vw] h-[70vh] overflow-hidden'>
                {/* 卡片操作左右 */}
                <div className='w-clamp-50vw h-[5vh] flex justify-between items-center mx-auto my-3'>
                    <button className="btn-card-control" onPointerUp={() => pressAction("prev")}>Prev card</button>
                    <div className="px-2 text-2xl">{resultText}</div>
                    <button className="btn-card-control" onPointerUp={() => pressAction("next")}>Next card</button>
                </div>
                <div ref={cardContainerRef} className={`resultCard relative left-1/2 transform -translate-x-1/2 border-2 border-white w-clamp-50vw h-[55vh] flex flex-col justify-around items-center text-center`}>
                    <div className='h-[10vh]'>
                        <h1 className='text-2xl h-[6vh] leading-[6vh]'>{cardInformation?.cardName}</h1>
                        <h2 className='text-xl h-[4vh] leading-[4vh]'>{cardInformation?.position}</h2>
                    </div>
                    <Canvas ref={resultCanvasRef} style={{ background: 'transparent' }}>
                        <CameraController />
                        <ambientLight />
                        <OrbitControls
                            enableRotate
                            enableZoom={false}
                            enablePan={false}
                            enableDamping
                            maxPolarAngle={Math.PI / 2}
                            minPolarAngle={Math.PI / 2}  // 只能左右轉
                        />
                        <TarotCard num={cardInformation?.cardId} isReverse={cardInformation?.isReverse} />
                    </Canvas>
                    <p className='h-[10vh] flex justify-center items-center p-5'>{cardInformation?.cardContent}</p>
                </div>
                <button className='btn-outline w-clamp-50vw h-[5vh] fixed bottom-[5vh] left-1/2 transform -translate-x-1/2'
                    onPointerUp={restart}> Restart?</button>
            </main>
            {/* 重抽按鈕 */}
        </>
    );
}

export default ResultContainer;
