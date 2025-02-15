import { ActionMode } from '@app/enum/actionMode';
// 建立狀態映射
const nextModeMap: Record<ActionMode, ActionMode | null> = {
    [ActionMode.DEFAULT]: ActionMode.SHUFFLE_CARDS,
    [ActionMode.SHUFFLE_CARDS]: ActionMode.START_SHUFFLE_CARDS,
    [ActionMode.START_SHUFFLE_CARDS]: ActionMode.FINISH_SHUFFLE_CARDS,
    [ActionMode.FINISH_SHUFFLE_CARDS]: ActionMode.DRAW_CARDS,
    [ActionMode.DRAW_CARDS]: ActionMode.START_DRAW_CARDS,
    [ActionMode.START_DRAW_CARDS]: ActionMode.FINISH_DRAW_CARDS,
    [ActionMode.FINISH_DRAW_CARDS]: ActionMode.READ_CARDS,
    [ActionMode.READ_CARDS]: ActionMode.DEFAULT, // 最後一個狀態，  如果沒有就返回
}

// 取得下一個模式
export const getNextMode = (currentMode: ActionMode): ActionMode => {
    return nextModeMap[currentMode] as ActionMode;
  };
  