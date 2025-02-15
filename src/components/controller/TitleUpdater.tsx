import { useEffect } from "react";
import { webName } from '@app/utils/config';//網站標題

interface TitleUpdaterProps {
    title?: string;  // 傳入的 title
}

const TitleUpdater: React.FC<TitleUpdaterProps> = ({ title }) => {
    useEffect(() => {
        if(!title) return;  // 如果沒有 title，則不更新標題
        // 在組件渲染時更新頁面標題
        document.title = title;

        // 可以在組件卸載時恢復原始標題
        return () => {
            document.title = webName;  // 或者恢復為預設標題
        };
    }, [title]); // 每次 title 改變時更新標題

    return null; 
};

export default TitleUpdater;
