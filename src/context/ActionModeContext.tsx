import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { ActionMode } from "@app/enum/actionMode";

// 定義 ActionMode 可用的動作類型
type Action =
  | { type: "SET_MODE"; mode: ActionMode }
  | { type: "RESET_MODE" };

// Reducer 函數：根據不同 action 變更 state
const actionModeReducer = (state: ActionMode, action: Action): ActionMode => {
  switch (action.type) {
    case "SET_MODE":
      return action.mode;
    case "RESET_MODE":
      return ActionMode.DEFAULT;
    default:
      return state;
  }
};

// Context 初始值
const ActionModeContext = createContext<{
  actionMode: ActionMode;
  actionDispatch: React.Dispatch<Action>;
} | null>(null);

// 提供 Provider
export const ActionModeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [actionMode, actionDispatch] = useReducer(actionModeReducer, ActionMode.DEFAULT);

  return (
    <ActionModeContext.Provider value={{ actionMode, actionDispatch }}>
      {children}
    </ActionModeContext.Provider>
  );
};

// 自訂 Hook 方便使用
export const useActionModeContext = () => {
  const context = useContext(ActionModeContext);
  if (!context) {
    throw new Error("useActionModeContext 必須在 ActionModeProvider 內使用");
  }
  return context;
};
