import { Language } from "@app/enum/language";
import { ActionMode } from "@app/enum/actionMode";

export const cardActionText = {
    [ActionMode.DEFAULT]: {
        [Language.ENGLISH]: "Reading Fortune",
        [Language.TRADITIONAL_CHINESE]: "窺視命運",
    },
    [ActionMode.SHUFFLE_CARDS]: {
        [Language.ENGLISH]: "Tap the Cards to Shuffle",
        [Language.TRADITIONAL_CHINESE]: "點擊卡片開始洗牌",
    },
    [ActionMode.START_SHUFFLE_CARDS]: {
        [Language.ENGLISH]: "Hold to Keep Shuffling",
        [Language.TRADITIONAL_CHINESE]: "持續點擊卡片繼續洗牌",
    },
    [ActionMode.FINISH_SHUFFLE_CARDS]: {
        [Language.ENGLISH]: "Is it Complete?",
        [Language.TRADITIONAL_CHINESE]: "結束洗牌？",
    },
    [ActionMode.DRAW_CARDS]: {
        [Language.ENGLISH]: "Pick 3 Cards to Continue",
        [Language.TRADITIONAL_CHINESE]: "選擇三張牌",
    },
    [ActionMode.START_DRAW_CARDS]: {
        [Language.ENGLISH]: "Pick 3 Cards to Continue",
        [Language.TRADITIONAL_CHINESE]: "選擇三張牌",
    },
    [ActionMode.FINISH_DRAW_CARDS]: {
        [Language.ENGLISH]: "Reading result?",
        [Language.TRADITIONAL_CHINESE]: "查看結果？",
    },
};


export const musicPlayerText = {
    on: {
        [Language.ENGLISH]: "on",
        [Language.TRADITIONAL_CHINESE]: "開啟"
    },
    off: {
        [Language.ENGLISH]: "off",
        [Language.TRADITIONAL_CHINESE]: "關閉"
    }
}

export const loadingText = {
    [Language.ENGLISH]: "loading...",
    [Language.TRADITIONAL_CHINESE]: "載入中..."
}


export const resultActionText = {
    prev: {
        [Language.ENGLISH]: "prev card",
        [Language.TRADITIONAL_CHINESE]: "上一張"
    },
    next: {
        [Language.ENGLISH]: "next card",
        [Language.TRADITIONAL_CHINESE]: "下一張"
    },
    restart: {
        [Language.ENGLISH]: "Restart?",
        [Language.TRADITIONAL_CHINESE]: "重新開始？"
    }
}

export const cardDirectionText={
    upright: {
        [Language.ENGLISH]: "upright",
        [Language.TRADITIONAL_CHINESE]: "正位"
    },
    reversed: {
        [Language.ENGLISH]: "reversed",
        [Language.TRADITIONAL_CHINESE]: "逆位"
    }  
}

export const spreadsText={
    [Language.ENGLISH]: ["Past", "Now", "Future"],
    [Language.TRADITIONAL_CHINESE]: ["過去", "現在", "未來"],
}
