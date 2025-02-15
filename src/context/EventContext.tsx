// import React, { createContext, useState,useContext, ReactNode } from 'react';

// interface PointerEventContextType {
//   isHover: boolean;
//   setIsHover: (hover: boolean) => void;
//   hoverTarget:number|null;
//   setHoverTarget:(hoverTarget: number|null) => void;
// }

// const PointerEventContext = createContext<PointerEventContextType | undefined>(undefined);

// export const useEventContext = () => {
//   const context = useContext(PointerEventContext);
//   if (!context) {
//     throw new Error('usePointerEvent must be used within a EventProvider');
//   }
//   return context;
// };


// export const EventProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [isHover, setIsHover] = useState(false);
//   const [hoverTarget, setHoverTarget] = useState<number|null>(null);

//   return (
//     <PointerEventContext.Provider value={{ 
//       isHover, setIsHover,
//       hoverTarget,setHoverTarget
//       }}>
//       {children}
//     </PointerEventContext.Provider>
//   );
// };


import React, { createContext, useReducer, useContext, ReactNode } from 'react';

// 定義狀態結構
interface EventState {
  isHover: boolean;
  hoverTarget: number | null;
  pickArr: { cardId: number; isReverse: boolean }[]|[];
}

// 定義可能的 action 類型
type EventAction =
  | { type: 'SET_IS_HOVER'; payload: boolean }
  | { type: 'SET_HOVER_TARGET'; payload: number | null }
  | { type: 'SET_PICK_TARGET'; payload: { cardId: number; isReverse: boolean }[] };


// 定義初始狀態
const initialState: EventState = {
  isHover: false,
  hoverTarget: null,
  pickArr:[]
};

// 定義 reducer 函數來處理狀態更新
const eventReducer = (state: EventState, action: EventAction): EventState => {
  switch (action.type) {
    case 'SET_IS_HOVER':
      return { ...state, isHover: action.payload };
    case 'SET_HOVER_TARGET':
      return { ...state, hoverTarget: action.payload };
      case 'SET_PICK_TARGET':
        return { ...state, pickArr: [...new Set([...state.pickArr, ...action.payload])] };    
    default:
      return state;
  }
};

interface EventContextType {
  eventState: EventState;
  eventDispatch: React.Dispatch<EventAction>;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const useEventContext = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvent must be used within a EventProvider');
  }
  return context;
};

export const EventProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [eventState, eventDispatch] = useReducer(eventReducer, initialState);

  return (
    <EventContext.Provider value={{ eventState, eventDispatch }}>
      {children}
    </EventContext.Provider>
  );
};
