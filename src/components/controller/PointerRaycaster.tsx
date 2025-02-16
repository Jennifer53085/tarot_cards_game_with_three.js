import { useEffect, useRef, useMemo, useCallback } from "react";

import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { ActionMode } from "@app/enum/actionMode";

import { useCardsContext } from "@app/context/CardsContext";
import { useActionModeContext } from "@app/context/ActionModeContext";
import { useEventContext } from "@app/context/EventContext";
import { totalDrawCards } from "@app/utils/config";

const PointerRaycaster = () => {
    const { actionMode, actionDispatch } = useActionModeContext();
    const { eventDispatch, eventState } = useEventContext();
    const { camera } = useThree();
    const { cardsRef } = useCardsContext();
    const raycasterRef = useRef(new THREE.Raycaster());
    const mouseVectorRef = useRef(new THREE.Vector2());
    // const prevIntersectRef = useRef<THREE.Object3D | null>(null);



    // 使用 useMemo 確保 cardsObj 取得最新的卡片陣列
    const cardsObj = useMemo(() => cardsRef.current, [cardsRef]);

    const handlePointerPosition = (event: PointerEvent) => {
        const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        mouseVectorRef.current.set(mouseX, mouseY);
    };

    // const getIntersects = useCallback((item: THREE.Object3D[]) => {

    // }, [raycasterRef, camera])

    const setStartShuffleMode = useCallback(() => {
        actionDispatch({ type: "SET_MODE", mode: ActionMode.START_SHUFFLE_CARDS });
    }, [actionDispatch])
    const setFinishSuffleMode = useCallback(() => {
        actionDispatch({ type: "SET_MODE", mode: ActionMode.FINISH_SHUFFLE_CARDS });
    }, [actionDispatch])
    // const setStartDrawMode = useCallback(() => {
    //     actionDispatch({ type: "SET_MODE", mode: ActionMode.START_DRAW_CARDS });
    // }, [actionDispatch]);




    useEffect(() => {

        switch (actionMode) {
            case ActionMode.SHUFFLE_CARDS:
            case ActionMode.START_SHUFFLE_CARDS:
            case ActionMode.FINISH_SHUFFLE_CARDS:
                {
                    const _handlePointerDown = (event: PointerEvent) => {
                        event.stopPropagation();
                        handlePointerPosition(event);
                        raycasterRef.current.setFromCamera(mouseVectorRef.current, camera);
                        const intersects = raycasterRef.current.intersectObjects(cardsObj);
                        event.preventDefault();
                        if (intersects.length > 0) {
                            setStartShuffleMode();
                        }
                    };
                    const _handlePointerUp = (event: PointerEvent) => {
                        event.preventDefault();
                        event.stopPropagation();
                        if (actionMode === ActionMode.START_SHUFFLE_CARDS) {
                            setFinishSuffleMode();
                        }
                    };

                    window.addEventListener("pointerdown", _handlePointerDown);
                    window.addEventListener("pointerup", _handlePointerUp);

                    return () => {
                        window.removeEventListener("pointerdown", _handlePointerDown);
                        window.removeEventListener("pointerup", _handlePointerUp);
                    };
                }
            case ActionMode.DRAW_CARDS:
            case ActionMode.START_DRAW_CARDS:
            case ActionMode.FINISH_DRAW_CARDS: {
                //TODO做hover動畫
                // const _handlePointerMove = (event: PointerEvent) => {
                //     handlePointerPosition(event);
                //     raycasterRef.current.setFromCamera(mouseVectorRef.current, camera);
                //     raycasterRef.current.near = 0.1;  // 設定射線最小距離
                //     raycasterRef.current.far = 5;    // 設定射線最大距離

                //     const intersects = raycasterRef.current.intersectObjects(cardsObj);


                //     if (prevIntersectRef.current) {
                //         const prevCard = prevIntersectRef.current;
                //         if (prevCard.userData) {
                //             eventDispatch({ type: "SET_IS_HOVER", payload: false }); // 清除先前 hover 狀態
                //             eventDispatch({ type: "SET_HOVER_TARGET", payload: null }); // 清除 hover 目標
                //             prevIntersectRef.current = null; // 清除上一個交互物體
                //         }
                //     }

                //     // 如果有與卡片相交，則設置當前卡片為 hover
                //     if (intersects.length > 0) {
                //         // setStartDrawMode();
                //         const hoveredCard = intersects[0].object as THREE.Mesh;

                //         if (hoveredCard.userData?.shuffleOrder > -1) {
                //             const hoverIndex = hoveredCard.userData.shuffleOrder;
                //             // console.log(hoverIndex)

                //             eventDispatch({ type: "SET_IS_HOVER", payload: true });
                //             eventDispatch({ type: "SET_HOVER_TARGET", payload: hoverIndex });
                //             prevIntersectRef.current = hoveredCard;
                //         } else {
                //             // 沒有與卡片相交時，清除 hover 狀態
                //             if (prevIntersectRef.current) {
                //                 const prevCard = prevIntersectRef.current;
                //                 if (prevCard.userData) {
                //                     eventDispatch({ type: "SET_IS_HOVER", payload: false });
                //                     eventDispatch({ type: "SET_HOVER_TARGET", payload: null });
                //                     prevIntersectRef.current = null; // 清除 prevIntersectRef
                //                 }
                //             }
                //         }

                //     }
                // }


                const _handleClick = (event: PointerEvent) => {
                    event.stopImmediatePropagation();
                   
                    handlePointerPosition(event);
                    raycasterRef.current.setFromCamera(mouseVectorRef.current, camera);
                    raycasterRef.current.near = 0.1;  // 設定射線最小距離
                    raycasterRef.current.far = 5;    // 設定射線最大距離

                    const intersects = raycasterRef.current.intersectObjects(cardsObj);

                    if (intersects.length > 0 && eventState.pickArr.length < totalDrawCards) {
                        const clickTarget = intersects[0].object.userData;

                        const addData = { cardId: clickTarget.cardId, isReverse: clickTarget.isReverse };
                        if (!eventState.pickArr.some(pickObj => pickObj.cardId === addData.cardId)
                            || eventState.pickArr.length === 0) {
                            eventDispatch({ type: "SET_PICK_TARGET", payload: [...new Set([...eventState.pickArr, addData])] })
                        }
                    }
                }
                // window.addEventListener("pointermove", _handlePointerMove);
                window.addEventListener("pointerup", _handleClick);
                return () => {
                    // window.removeEventListener("pointermove", _handlePointerMove);
                    window.removeEventListener("pointerup", _handleClick);
                };

            }
                break;
            default:
                break;
        }
    }, [actionMode, camera, cardsObj, eventState,eventDispatch,setFinishSuffleMode,setStartShuffleMode]);
    return null;
}

export default PointerRaycaster;