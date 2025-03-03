import { useEffect, useRef, useMemo } from "react";
import { totalCards } from '@app/utils/config';
import { useLoadingContext } from "@app/context/LoadingContext";
import { useLanguageContext } from "@app/context/LanguageContext";
import { loadingText } from "@app/data/userInterfaceText";
import gsap from "gsap";
import { TextureLoader, AudioLoader, LoadingManager } from "three";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const Loading = () => {
    const { isLoading, setIsLoading, loadingProgress, setLoadingProgress } = useLoadingContext();
    const { language } = useLanguageContext();
    const loadingRef = useRef<HTMLDivElement>(null);
    const loadingTxtRef = useRef<HTMLSpanElement>(null);

    // 確保 `assets` 陣列不會在重新渲染時變更
    const assets = useMemo(() => ([
        { url: `${import.meta.env.BASE_URL}assets/models/forturntable.glb`, type: "model" },
        { url: `${import.meta.env.BASE_URL}assets/music/mysterious-night.mp3`, type: "music" },
        { url: `${import.meta.env.BASE_URL}assets/texture/card_back.png`, type: "texture" },
        ...Array.from({ length: totalCards }, (_, i) => ({
            url: `${import.meta.env.BASE_URL}assets/texture/card${i}.png`,
            type: "texture"
        })),
    ]), []);

 
    useEffect(() => {
        const manager = new LoadingManager();
        const textureLoader = new TextureLoader(manager);
        const audioLoader = new AudioLoader(manager);
        const gltfLoader = new GLTFLoader(manager);

        let loadedCount = 0;

        manager.onProgress = (_, itemsLoaded, itemsTotal) => {
            setLoadingProgress(Math.round((itemsLoaded / itemsTotal) * 100));
        };

        manager.onLoad = () => {
            setLoadingProgress(100);
            setIsLoading(true);
        };

        manager.onError = (url) => {
            console.error(`❌ Error loading: ${url}`);
        };

        // 開始載入所有資源
        assets.forEach((asset) => {
            switch (asset.type) {
                case "texture":
                    textureLoader.load(asset.url, () => updateProgress());
                    break;
                case "music":
                    audioLoader.load(asset.url, () => updateProgress());
                    break;
                case "model":
                    gltfLoader.load(asset.url, () => updateProgress());
                    break;
                default:
                    console.warn(`⚠️ Unknown asset type: ${asset.type}`);
            }
        });

        function updateProgress() {
            loadedCount++;
            setLoadingProgress(Math.round((loadedCount / assets.length) * 100));
        }
    }, [assets]);

    useEffect(() => {
        if (loadingProgress === 100) {
            gsap.to(loadingRef.current, {
                opacity: 0,
                duration: 1.5,
                onComplete: () => setIsLoading(false),
            });
        }
    },[loadingProgress])

    return isLoading ? (
        <div ref={loadingRef} className="loading w-full h-full fixed top-0 left-0 flex flex-col gap-5 justify-center items-center bg-black bg-opacity-80 backdrop-blur-2xl z-50">
            <div className="loadingAnime"></div>
            <span ref={loadingTxtRef}>{loadingText[language]}{loadingProgress}%</span>
        </div>
    ) : null;
};

export default Loading;
