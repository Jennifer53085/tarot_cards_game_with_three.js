import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh, faVolumeXmark } from '@fortawesome/free-solid-svg-icons';

interface MusicPlayerProps {
    style?: React.CSSProperties;
    className?: string;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ style, className }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audio = useRef(new Audio(`${import.meta.env.BASE_URL}assets/music/mysterious-night.wav`));
    const fadeInterval = useRef<number | undefined>(undefined);
    const duration = 30;

    useEffect(() => {
        const currentAudio = audio.current;

        currentAudio.loop = true;

        if (isPlaying) {
            // 音樂播放並且音量設為 1
            fadeIn();
        } else {
            // 音樂暫停並開始淡出
            fadeOut();
        }

        // 清理定時器和音頻
        return () => {
            // 如果有正在進行的淡出定時器，清理它
            if (fadeInterval.current) {
                clearInterval(fadeInterval.current);
            }
        };
    }, [isPlaying]); // 只有當 isPlaying 改變時才會觸發

    const togglePlay = (event: React.PointerEvent<HTMLButtonElement>) => {
        event.nativeEvent.stopImmediatePropagation()//限制事件影響範圍
        setIsPlaying((prev) => !prev);
    };

    const fadeIn = () => {
        if (audio.current.volume === 1) return; // 如果音量已經是 0，則不需要再次淡出

        fadeInterval.current = window.setInterval(() => {
            if (audio.current.volume < 1) {
                // 確保音量不大於 0，避免出現非常小的負數
                audio.current.volume = Math.min(audio.current.volume + (1 / duration), 1);
            } else {
                clearInterval(fadeInterval.current);
                audio.current.play();
            }
        }, duration);

    }

    const fadeOut = () => {
        if (audio.current.volume === 0) return; // 如果音量已經是 0，則不需要再次淡出

        fadeInterval.current = window.setInterval(() => {
            if (audio.current.volume > 0) {
                // 確保音量不小於 0，避免出現非常小的負數
                audio.current.volume = Math.max(audio.current.volume - (1 / duration), 0);
            } else {
                // 音量為 0 時停止音樂
                clearInterval(fadeInterval.current);
                audio.current.pause();
            }
        }, duration);
    };

    return (
        <div style={style} className={className}>
            <button onPointerUp={(event) => togglePlay(event)} className='btn-media'>
                <FontAwesomeIcon icon={isPlaying ? faVolumeHigh : faVolumeXmark} />
                &nbsp;&nbsp;
                <span>{isPlaying ? "On" : "Off"}</span>
            </button>
        </div>
    );
};

export default MusicPlayer;
