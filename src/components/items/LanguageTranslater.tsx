import {Language} from '@app/enum/language';
import { useLanguageContext } from '@app/context/LanguageContext';

interface LangTranslaterProps {
    style?: React.CSSProperties;
    className?: string;
  }
const LanguageTranslater:React.FC<LangTranslaterProps>=({ style,className })=>{
    const {language,setLanguage}=useLanguageContext();

    const languages: Record<Language, string> = {
        [Language.ENGLISH]: 'English',
        [Language.TRADITIONAL_CHINESE]: '繁體中文',
    }



return(
    <select value={language} 
    onChange={(e) => setLanguage(e.target.value as Language)}
    className={className} style={style}
    >
      {Object.keys(languages).map((lang) => {
        const langKey = lang as Language;
        return (
          <option key={lang} value={langKey}>
            {languages[langKey]}
          </option>
        );
      })}
    </select>
)
}

export default LanguageTranslater;