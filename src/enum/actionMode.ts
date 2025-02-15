export enum ActionMode {
  DEFAULT = "DEFAULT", // 初始狀態
  SHUFFLE_CARDS = "SHUFFLE_CARDS", // 進入洗牌階段
  START_SHUFFLE_CARDS = "START_SHUFFLE_CARDS", // 開始洗牌
  FINISH_SHUFFLE_CARDS = "FINISH_SHUFFLE_CARDS", // 洗牌完成
  DRAW_CARDS = "DRAW_CARDS", // 進入抽牌階段
  START_DRAW_CARDS = "START_DRAW_CARDS", // 開始抽牌動畫（如果滑到要hover動畫）
  FINISH_DRAW_CARDS = "FINISH_DRAW_CARDS", // 三張卡抽完
  READ_CARDS = "READ_CARDS", // 進入閱讀卡牌狀態
}