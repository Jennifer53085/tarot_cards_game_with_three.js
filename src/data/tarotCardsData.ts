import { TarotCardsDataType } from "@app/type/tarotCardsDataType";
import { TarotCardNumber } from "@app/enum/tarotCardNumber";
import { Language } from "@app/enum/language";
/*
    cardId: number,
    imgUrl: string,
    lang: Record<Language, {
        cardName: string; // 塔羅牌名稱
        meaningUpright: string; // 正位意義
        meaningReversed: string; // 逆位意義
    }>;
 */


export const tarotCardsData: Record<TarotCardNumber | number, TarotCardsDataType> = {
    [TarotCardNumber.THE_FOOL]: {
        cardId: TarotCardNumber.THE_FOOL,
        imgUrl: `/assets/texture/card${TarotCardNumber.THE_FOOL}.png`,
        lang: {
            [Language.TRADITIONAL_CHINESE]: {
                cardName: "愚者",
                meaningUpright: "新的開始，自由，冒險",
                meaningReversed: "愚蠢，衝動，缺乏方向"
            },
            [Language.ENGLISH]: {
                cardName: "The Fool",
                meaningUpright: "New beginnings, freedom, adventure",
                meaningReversed: "Foolishness, impulsivity, lack of direction"
            }
        }
    },
    [TarotCardNumber.THE_MAGICIAN]: {
        cardId: TarotCardNumber.THE_MAGICIAN,
        imgUrl: `/assets/texture/card${TarotCardNumber.THE_MAGICIAN}.png`,
        lang: {
            [Language.TRADITIONAL_CHINESE]: {
                cardName: "魔術師",
                meaningUpright: "創造力，行動，潛力",
                meaningReversed: "操縱，欺騙，缺乏自信"
            },
            [Language.ENGLISH]: {
                cardName: "The Magician",
                meaningUpright: "Creativity, action, potential",
                meaningReversed: "Manipulation, deception, lack of confidence"
            }
        }
    },
    [TarotCardNumber.THE_HIGH_PRIESTESS]: {
        cardId: TarotCardNumber.THE_HIGH_PRIESTESS,
        imgUrl: `/assets/texture/card${TarotCardNumber.THE_HIGH_PRIESTESS}.png`,
        lang: {
            [Language.TRADITIONAL_CHINESE]: {
                cardName: "女祭司",
                meaningUpright: "直覺，神秘，潛意識",
                meaningReversed: "困惑，壓抑，無法理解"
            },
            [Language.ENGLISH]: {
                cardName: "The High Priestess",
                meaningUpright: "Intuition, mystery, subconscious",
                meaningReversed: "Confusion, repression, lack of understanding"
            }
        }
    },
    [TarotCardNumber.THE_EMPRESS]: {
        cardId: TarotCardNumber.THE_EMPRESS,
        imgUrl: `/assets/texture/card${TarotCardNumber.THE_EMPRESS}.png`,
        lang: {
            [Language.TRADITIONAL_CHINESE]: {
                cardName: "皇后",
                meaningUpright: "母性、創造力、豐盈與繁榮。",
                meaningReversed: "創造力受限、缺乏關愛、對他人冷漠。"
            },
            [Language.ENGLISH]: {
                cardName: "The Empress",
                meaningUpright: "Motherhood, creativity, abundance, and prosperity.",
                meaningReversed: "Blocked creativity, lack of care, indifference to others."
            }
        }
    },
    [TarotCardNumber.THE_EMPEROR]: {
        cardId: TarotCardNumber.THE_EMPEROR,
        imgUrl: `/assets/texture/card${TarotCardNumber.THE_EMPEROR}.png`,
        lang: {
            [Language.TRADITIONAL_CHINESE]: {
                cardName: "皇帝",
                meaningUpright: "權威，結構，控制",
                meaningReversed: "暴君，專制，缺乏紀律"
            },
            [Language.ENGLISH]: {
                cardName: "The Emperor",
                meaningUpright: "Authority, structure, control",
                meaningReversed: "Tyranny, rigidity, lack of discipline"
            }
        }
    },
    [TarotCardNumber.THE_HIEROPHANT]: {
        cardId: TarotCardNumber.THE_HIEROPHANT,
        imgUrl: `/assets/texture/card${TarotCardNumber.THE_HIEROPHANT}.png`,
        lang: {
            [Language.TRADITIONAL_CHINESE]: {
                cardName: "教皇",
                meaningUpright: "傳統、社會規範、精神指導、信仰、教育、道德與倫理。",
                meaningReversed: "反叛、個人信念、打破傳統、拒絕權威、質疑體制。"
            },
            [Language.ENGLISH]: {
                cardName: "The Hierophant",
                meaningUpright: "Tradition, social norms, spiritual guidance, belief, education, morals, and ethics.",
                meaningReversed: "Rebellion, personal beliefs, breaking tradition, rejecting authority, questioning institutions."
            }
        }
    },
    [TarotCardNumber.THE_LOVERS]: {
        cardId: TarotCardNumber.THE_LOVERS,
        imgUrl: `/assets/texture/card${TarotCardNumber.THE_LOVERS}.png`,
        lang: {
            [Language.TRADITIONAL_CHINESE]: {
                cardName: "戀人",
                meaningUpright: "愛情，和諧，選擇",
                meaningReversed: "不和諧，錯誤的選擇，關係緊張"
            },
            [Language.ENGLISH]: {
                cardName: "The Lovers",
                meaningUpright: "Love, harmony, choices",
                meaningReversed: "Disharmony, wrong choices, relationship tension"
            }
        }
    },
    [TarotCardNumber.THE_CHARIOT]: {
        cardId: TarotCardNumber.THE_CHARIOT,
        imgUrl: `/assets/texture/card${TarotCardNumber.THE_CHARIOT}.png`,
        lang: {
            [Language.TRADITIONAL_CHINESE]: {
                cardName: "戰車",
                meaningUpright: "勝利，決心，控制",
                meaningReversed: "缺乏方向，衝動，內心矛盾"
            },
            [Language.ENGLISH]: {
                cardName: "The Chariot",
                meaningUpright: "Victory, determination, control",
                meaningReversed: "Lack of direction, impulsiveness, inner conflict"
            }
        }
    },
    [TarotCardNumber.STRENGTH]: {
        cardId: TarotCardNumber.STRENGTH,
        imgUrl: `/assets/texture/card${TarotCardNumber.STRENGTH}.png`,
        lang: {
            [Language.TRADITIONAL_CHINESE]: {
                cardName: "力量",
                meaningUpright: "勇氣，耐心，內在力量",
                meaningReversed: "自我懷疑，恐懼，缺乏自信"
            },
            [Language.ENGLISH]: {
                cardName: "Strength",
                meaningUpright: "Courage, patience, inner strength",
                meaningReversed: "Self-doubt, fear, lack of confidence"
            }
        }
    },
    [TarotCardNumber.THE_HERMIT]: {
        cardId: TarotCardNumber.THE_HERMIT,
        imgUrl: `/assets/texture/card${TarotCardNumber.THE_HERMIT}.png`,
        lang: {
            [Language.TRADITIONAL_CHINESE]: {
                cardName: "隱士",
                meaningUpright: "內省，智慧，指引",
                meaningReversed: "孤立，逃避，過度自省"
            },
            [Language.ENGLISH]: {
                cardName: "The Hermit",
                meaningUpright: "Introspection, wisdom, guidance",
                meaningReversed: "Isolation, avoidance, overthinking"
            }
        }
    },
    [TarotCardNumber.WHEEL_OF_FORTUNE]: {
        cardId: TarotCardNumber.WHEEL_OF_FORTUNE,
        imgUrl: `/assets/texture/card${TarotCardNumber.WHEEL_OF_FORTUNE}.png`,
        lang: {
            [Language.TRADITIONAL_CHINESE]: {
                cardName: "命運之輪",
                meaningUpright: "好運，變化，機會",
                meaningReversed: "挫折，惡運，循環"
            },
            [Language.ENGLISH]: {
                cardName: "Wheel of Fortune",
                meaningUpright: "Good luck, change, opportunities",
                meaningReversed: "Setbacks, misfortune, cycles"
            }
        }
    },
    [TarotCardNumber.JUSTICE]: {
        cardId: TarotCardNumber.JUSTICE,
        imgUrl: `/assets/texture/card${TarotCardNumber.JUSTICE}.png`,
        lang: {
            [Language.TRADITIONAL_CHINESE]: {
                cardName: "正義",
                meaningUpright: "公平，真相，責任",
                meaningReversed: "不公，欺騙，逃避責任"
            },
            [Language.ENGLISH]: {
                cardName: "Justice",
                meaningUpright: "Fairness, truth, responsibility",
                meaningReversed: "Injustice, dishonesty, avoiding responsibility"
            }
        }
    },
    [TarotCardNumber.THE_HANGED_MAN]: {
        cardId: TarotCardNumber.THE_HANGED_MAN,
        imgUrl: `/assets/texture/card${TarotCardNumber.THE_HANGED_MAN}.png`,
        lang: {
            [Language.TRADITIONAL_CHINESE]: {
                cardName: "倒吊人",
                meaningUpright: "放下，犧牲，新視角",
                meaningReversed: "停滯，恐懼改變，自我犧牲"
            },
            [Language.ENGLISH]: {
                cardName: "The Hanged Man",
                meaningUpright: "Letting go, sacrifice, new perspective",
                meaningReversed: "Stagnation, fear of change, self-sacrifice"
            }
        }
    },
    [TarotCardNumber.DEATH]: {
        cardId: TarotCardNumber.DEATH,
        imgUrl: `/assets/texture/card${TarotCardNumber.DEATH}.png`,
        lang: {
            [Language.TRADITIONAL_CHINESE]: {
                cardName: "死神",
                meaningUpright: "結束，轉變，新開始",
                meaningReversed: "抗拒改變，停滯，無法前進"
            },
            [Language.ENGLISH]: {
                cardName: "Death",
                meaningUpright: "Endings, transformation, new beginnings",
                meaningReversed: "Resistance to change, stagnation, unable to move on"
            }
        }
    },
    [TarotCardNumber.TEMPERANCE]: {
        cardId: TarotCardNumber.TEMPERANCE,
        imgUrl: `/assets/texture/card${TarotCardNumber.TEMPERANCE}.png`,
        lang: {
            [Language.TRADITIONAL_CHINESE]: {
                cardName: "節制",
                meaningUpright: "平衡，耐心，調和",
                meaningReversed: "極端，失衡，焦慮"
            },
            [Language.ENGLISH]: {
                cardName: "Temperance",
                meaningUpright: "Balance, patience, harmony",
                meaningReversed: "Extremes, imbalance, anxiety"
            }
        }
    },

    [TarotCardNumber.THE_DEVIL]: {
        cardId: TarotCardNumber.THE_DEVIL,
        imgUrl: `/assets/texture/card${TarotCardNumber.THE_DEVIL}.png`,
        lang: {
            [Language.TRADITIONAL_CHINESE]: {
                cardName: "惡魔",
                meaningUpright: "誘惑，執著，物質束縛",
                meaningReversed: "解放，擺脫控制，重獲自由"
            },
            [Language.ENGLISH]: {
                cardName: "The Devil",
                meaningUpright: "Temptation, obsession, material bondage",
                meaningReversed: "Liberation, breaking free, reclaiming power"
            }
        }
    },
    [TarotCardNumber.THE_TOWER]: {
        cardId: TarotCardNumber.THE_TOWER,
        imgUrl: `/assets/texture/card${TarotCardNumber.THE_TOWER}.png`,
        lang: {
            [Language.TRADITIONAL_CHINESE]: {
                cardName: "高塔",
                meaningUpright: "突發變故，災難，衝擊",
                meaningReversed: "避免災難，內在變革，警示"
            },
            [Language.ENGLISH]: {
                cardName: "The Tower",
                meaningUpright: "Sudden upheaval, disaster, shock",
                meaningReversed: "Avoiding disaster, inner change, warning"
            }
        }
    },
    [TarotCardNumber.THE_STAR]: {
        cardId: TarotCardNumber.THE_STAR,
        imgUrl: `/assets/texture/card${TarotCardNumber.THE_STAR}.png`,
        lang: {
            [Language.TRADITIONAL_CHINESE]: {
                cardName: "星星",
                meaningUpright: "希望，靈感，療癒",
                meaningReversed: "失望，缺乏信心，悲觀"
            },
            [Language.ENGLISH]: {
                cardName: "The Star",
                meaningUpright: "Hope, inspiration, healing",
                meaningReversed: "Disappointment, lack of faith, pessimism"
            }
        }
    },
    [TarotCardNumber.THE_MOON]: {
        cardId: TarotCardNumber.THE_MOON,
        imgUrl: `/assets/texture/card${TarotCardNumber.THE_MOON}.png`,
        lang: {
            [Language.TRADITIONAL_CHINESE]: {
                cardName: "月亮",
                meaningUpright: "幻覺，潛意識，不確定性",
                meaningReversed: "真相揭露，克服恐懼，清晰"
            },
            [Language.ENGLISH]: {
                cardName: "The Moon",
                meaningUpright: "Illusions, subconscious, uncertainty",
                meaningReversed: "Truth revealed, overcoming fear, clarity"
            }
        }
    },
    [TarotCardNumber.THE_SUN]: {
        cardId: TarotCardNumber.THE_SUN,
        imgUrl: `/assets/texture/card${TarotCardNumber.THE_SUN}.png`,
        lang: {
            [Language.TRADITIONAL_CHINESE]: {
                cardName: "太陽",
                meaningUpright: "快樂，成功，積極",
                meaningReversed: "悲觀，短暫的快樂，自負"
            },
            [Language.ENGLISH]: {
                cardName: "The Sun",
                meaningUpright: "Happiness, success, positivity",
                meaningReversed: "Pessimism, fleeting joy, arrogance"
            }
        }
    },
    [TarotCardNumber.JUDGEMENT]: {
        cardId: TarotCardNumber.JUDGEMENT,
        imgUrl: `/assets/texture/card${TarotCardNumber.JUDGEMENT}.png`,
        lang: {
            [Language.TRADITIONAL_CHINESE]: {
                cardName: "審判",
                meaningUpright: "覺醒，反思，決定",
                meaningReversed: "懷疑，自我批判，猶豫不決"
            },
            [Language.ENGLISH]: {
                cardName: "Judgement",
                meaningUpright: "Awakening, reflection, decision",
                meaningReversed: "Doubt, self-criticism, indecision"
            }
        }
    },
    [TarotCardNumber.THE_WORLD]: {
        cardId: TarotCardNumber.THE_WORLD,
        imgUrl: `/assets/texture/card${TarotCardNumber.THE_WORLD}.png`,
        lang: {
            [Language.TRADITIONAL_CHINESE]: {
                cardName: "世界",
                meaningUpright: "完成，圓滿，成就",
                meaningReversed: "未竟之事，缺乏完成感，停滯"
            },
            [Language.ENGLISH]: {
                cardName: "The World",
                meaningUpright: "Completion, fulfillment, achievement",
                meaningReversed: "Unfinished business, lack of closure, stagnation"
            }
        }
    }

};
