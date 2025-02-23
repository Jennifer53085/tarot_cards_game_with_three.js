import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh, faVolumeXmark } from "@fortawesome/free-solid-svg-icons";

interface MusicPlayerProps {
  style?: React.CSSProperties;
  className?: string;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ style, className }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);//ios沒有支援直接更動Audio的volume，改用GainNode
  const audioElementRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // 初始化 AudioContext
    audioContextRef.current = new AudioContext();
    const audioElement = new Audio(`${import.meta.env.BASE_URL}assets/music/mysterious-night.mp3`);
    const track = audioContextRef.current.createMediaElementSource(audioElement);
    const gainNode = audioContextRef.current.createGain();

    track.connect(gainNode).connect(audioContextRef.current.destination);

    gainNode.gain.value = 0; // 預設音量為 0

    // 存到 Ref
    audioElementRef.current = audioElement;
    gainNodeRef.current = gainNode;

    return () => {
      // 清理資源
      audioElementRef.current?.pause();
      audioElementRef.current = null;
      gainNodeRef.current = null;
      audioContextRef.current?.close();
      audioContextRef.current = null;
    };
  }, []);

  const togglePlay = () => {
    if (!audioContextRef.current || !gainNodeRef.current || !audioElementRef.current) return;

    if (isPlaying) {
      // 淡出
      gainNodeRef.current.gain.linearRampToValueAtTime(0, audioContextRef.current.currentTime + 1);
      setTimeout(() => {
        audioElementRef.current?.pause();
      }, 1000);
    } else {
      // 開啟 AudioContext
      if (audioContextRef.current.state === "suspended") {
        audioContextRef.current.resume();
      }

      // 播放音樂並淡入
      audioElementRef.current.play();
      gainNodeRef.current.gain.linearRampToValueAtTime(1, audioContextRef.current.currentTime + 1);
    }

    setIsPlaying((prev) => !prev);
  };

  return (
    <div style={style} className={className}>
      <button onClick={togglePlay} className="btn-media">
        <FontAwesomeIcon icon={isPlaying ? faVolumeHigh : faVolumeXmark} />
        &nbsp;&nbsp;
        <span>{isPlaying ? "On" : "Off"}</span>
      </button>
    </div>
  );
};

export default MusicPlayer;
