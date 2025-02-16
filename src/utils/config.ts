import {Language} from '@app/enum/language'
import {tarotCardsData} from '@app/data/tarotCardsData'

export const language=Language.ENGLISH
export const webName='Oracle of Dreams';
export const animationDuration=1;//動畫時間(s)
export const totalCards = Object.keys(tarotCardsData).length;
export const totalDrawCards=3;//抽選三張牌


