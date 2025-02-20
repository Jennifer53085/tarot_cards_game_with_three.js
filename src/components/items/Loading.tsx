import { useEffect, useRef, useState, useMemo } from "react";
import axios from "axios";
import { totalCards } from '@app/utils/config';
import { useLoadingContext } from "@app/context/LoadingContext";
import gsap from "gsap";

const Loading = () => {
    const { isLoading, setIsLoading, loadingProgress, setLoadingProgress } = useLoadingContext();
    const loadingRef = useRef<HTMLDivElement>(null);
    const loadingTxtRef = useRef<HTMLSpanElement>(null);
    const [progressMap, setProgressMap] = useState<Record<string, number>>({});
    const [fakeProgress, setFakeProgress] = useState(0);

    // 確保 `assets` 陣列不會在重新渲染時變更
    const assets = useMemo(() => ([
        { url: `${import.meta.env.BASE_URL}assets/models/forturntable.glb`, name: "table" },
        { url: `${import.meta.env.BASE_URL}assets/music/mysterious-night.mp3`, name: "music" },
        { url: `${import.meta.env.BASE_URL}assets/texture/card_back.png`, name: "backCard" },
        ...Array.from({ length: totalCards }, (_, i) => ({
            url: `${import.meta.env.BASE_URL}assets/texture/card${i}.png`,
            name: `frontCard${i}`
        })),
    ]), []);

    // 計算總進度
    const totalProgress = useMemo(() => {
        if (Object.keys(progressMap).length === 0) return 0;
        return Object.values(progressMap).reduce((sum, cur) => sum + cur, 0) / assets.length;
    }, [progressMap, assets.length]);

    // 使用 axios 加載資源並監測進度
    const loadAssetWithProgress = async (url: string, name: string) => {
        try {
            const cacheBuster = `?nocache=${Date.now()}`;
            const response = await axios.get(url + cacheBuster, {
                responseType: "blob",
                onDownloadProgress: (progressEvent) => {
                    if (progressEvent.total) {
                        const percent = (progressEvent.loaded / progressEvent.total) * 100;
                        updateTotalProgress(name, percent);
                    }
                },
            });
            return URL.createObjectURL(response.data);
        } catch (error) {
            console.error(`Failed to load asset: ${name}`, error);
            updateTotalProgress(name, 100); // 確保失敗的資源也被標記為完成，避免卡住
            return "";
        }
    };

    // 更新下載進度
    const updateTotalProgress = (asset: string, progress: number) => {
        setProgressMap(prev => ({
            ...prev,
            [asset]: progress === 100 ? 100 : progress
        }));
    };

    useEffect(() => {
        if (isLoading) {
            setProgressMap({}); // 清空進度
            const promises = assets.map(asset => loadAssetWithProgress(asset.url, asset.name));

            Promise.all(promises).then(() => {
                setTimeout(() => {
                    gsap.to(loadingRef.current, {
                        opacity: 0,
                        duration: 1.5,
                        onComplete: () => setIsLoading(false),
                    });
                }, 500);
            });
            
            //設置假進度
            const fakeProgressInterval = setInterval(() => {
                setFakeProgress(prev => Math.min(prev + 0.5, 95));
            }
            , 500);
            return () => clearInterval(fakeProgressInterval);
        }
    }, [isLoading]);

    useEffect(() => {
        console.log(totalProgress)
        setLoadingProgress(Math.min(totalProgress, 100).toFixed(2));
        if (loadingTxtRef.current && totalProgress < 100) {
            gsap.fromTo(loadingTxtRef.current, { opacity: 1 }, { opacity: 0, duration: 0.5, repeat: -1, yoyo: true, ease: "power1.inOut" });
        }
    }, [totalProgress]);

    return isLoading ? (
        <div ref={loadingRef} className="loading w-full h-full fixed top-0 left-0 flex justify-center items-center bg-black bg-opacity-80 backdrop-blur-2xl z-50">
            <span ref={loadingTxtRef}>Loading...{loadingProgress==="0"?fakeProgress:loadingProgress}%</span>
        </div>
    ) : null;
};

export default Loading;
