import { useEffect, useRef } from "react";
import { totalCards } from '@app/utils/config';
import { useLoadingContext } from "@app/context/LoadingContext";
import gsap from "gsap";

// TODO
const Loading = () => {
    const { isLoading, setIsLoading, loadingProgress, setLoadingProgress } = useLoadingContext();
    const loadingRef = useRef<HTMLDivElement>(null);
    const loadingTxtRef = useRef<HTMLSpanElement>(null);
    const progressMap: Record<string, number> = {};
    const assets = [
        { url: `${import.meta.env.BASE_URL}assets/models/forturntable.glb`, name: "table" },
        { url: `${import.meta.env.BASE_URL}assets/music/mysterious-night.mp3`, name: "music" },
        { url: `${import.meta.env.BASE_URL}assets/texture/card_back.png`, name: "backCard" },
        ...Array.from({ length: totalCards }, (_, i) => ({ url: `${import.meta.env.BASE_URL}assets/texture/card${i}.png`, name: `frontCard${i}` })),
    ];

    // 下載資源並監測載入進度
    const loadAssetWithProgress = async (url: string, onProgress: (progress: number) => void): Promise<string> => {
        const cacheBuster = `?nocache=${Date.now()}`;
        const response = await fetch(url + cacheBuster, { cache: "no-store" });
        const total = Number(response.headers.get("Content-Length")) || 1;
        let loaded = 0;

        if (!response.body) return URL.createObjectURL(await response.blob());

        const reader = response.body.getReader();
        const chunks: Uint8Array[] = [];

        async function processChunk() {
            const { done, value } = await reader.read();
            if (done) return new Blob(chunks);

            chunks.push(value);
            loaded += value.length;
            onProgress((loaded / total) * 100);

            return processChunk();
        }

        const blob = await processChunk();
        return URL.createObjectURL(blob);
    };

    const updateTotalProgress = (asset: string, totalAsset: number, progress: number) => {
        progressMap[asset] = progress === 100 ? 100 : progress;
        const totalProgress = Object.values(progressMap).reduce((sum, cur) => sum + cur, 0) / totalAsset;
        setLoadingProgress(Math.min(totalProgress, 100).toFixed(2));

        if (loadingTxtRef.current && totalProgress < 100) {
            gsap.fromTo(loadingTxtRef.current, { opacity: 1 }, { opacity: 0, duration: 0.5, repeat: -1, yoyo: true, ease: "power1.inOut" });
        }

        if (Object.keys(progressMap).length === totalAsset && totalProgress >= 100 && loadingRef.current) {
            setTimeout(() => {
                gsap.to(loadingRef.current, { opacity: 0, duration: 1.5, onComplete: () => setIsLoading(false) });
            }, 500);
        }
    };

    const loadAllAssets = async () => {
        const promises = assets.map(asset => loadAssetWithProgress(asset.url, progress => updateTotalProgress(asset.name, assets.length, progress)));
        await Promise.all(promises);
    };

    useEffect(() => {
        console.log({loadingProgress})
        if (isLoading && parseFloat(loadingProgress) < 100) {
            loadAllAssets();
        }
    }, [isLoading]);

    useEffect(() => {
        if(isLoading){
         //製作假進度（ui體驗較佳）
         const fakeInterval = setInterval(() => {
            if (parseFloat(loadingProgress) < 100) {
                setLoadingProgress((prev: string) => {
                    const newProgress = Math.min(Number(prev) + Math.random() * 10, 100);
                    return newProgress.toFixed(2);
                });
            }
        }, 300);
        return () => clearInterval(fakeInterval);
        }
    }, [isLoading]);

    return (
        isLoading ? (
            <div ref={loadingRef} className="loading w-full h-full fixed top-0 left-0 flex justify-center items-center bg-black bg-opacity-80 backdrop-blur-2xl z-50">
                <span ref={loadingTxtRef}>Loading...{loadingProgress}%</span>
            </div>
        ) : null
    );
};

export default Loading