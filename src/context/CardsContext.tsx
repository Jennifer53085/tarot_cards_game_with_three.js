import React, { createContext, useContext, useRef } from "react";
import * as THREE from "three";

// 定義 CardContext 的型別
interface CardContextType {
  cardsRef: React.MutableRefObject<THREE.Mesh[]>;
  addCard: (card: THREE.Mesh) => void;
  clearCards: () => void;
}

// 創建 Context
const CardContext = createContext<CardContextType | undefined>(undefined);

export const CardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const cardsRef = useRef<THREE.Mesh[]>([]);

  // 添加卡片
  const addCard = (card: THREE.Mesh) => {
    if(card){
      cardsRef.current.push(card);
    }
  };

  // 清空卡片
  const clearCards = () => {
    cardsRef.current = [];
  };

  return (
    <CardContext.Provider value={{ cardsRef, addCard, clearCards }}>
      {children}
    </CardContext.Provider>
  );
};

// 使用 Hook 來存取 Context
export const useCardsContext = () => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error("useCardContext 必須在 CardProvider 內使用");
  }
  return context;
};
