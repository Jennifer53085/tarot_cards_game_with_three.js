import { Language } from '@app/enum/language';
export type TarotCardsDataType = {
    cardId: number,
    imgUrl: string,
    lang: Record<Language, {
        cardName: string; // 塔羅牌名稱
        meaningUpright: string; // 正位意義
        meaningReversed: string; // 逆位意義
    }>;
}