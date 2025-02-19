import { useEffect } from "react";
import { totalCards } from '@app/utils/config';
import { useLoadingContext } from "@app/context/LoadingContext";

const Loading = () => {
    const { isLoading, setIsLoading, loadingProgress, setLoadingProgress } = useLoadingContext();
    // 下載資源並監測載入進度
    const loadAssetWithProgress = async (url: string, onProgress: (progress: number) => void): Promise<string> => {
        const response = await fetch(url);
        const total = Number(response.headers.get("Content-Length")) || 1; // 確保 total 為數字，避免 NaN
        let loaded = 0;

        if (!response.body) return URL.createObjectURL(await response.blob()); // 若無法獲取長度，則直接載入

        const reader = response.body.getReader();
        const chunks: Uint8Array[] = [];

        // 讀取數據並更新進度
        async function processChunk(): Promise<Blob> {
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

    // 加載所有資源
    const loadAllAssets = async () => {
        const progressMap: Record<string, number> = {};
        let totalProgress = 0;

        function updateTotalProgress(asset: string, progress: number) {
            progressMap[asset] = progress;
            totalProgress = Object.values(progressMap).reduce((sum, p) => sum + p, 0) / Object.keys(progressMap).length;

            setLoadingProgress(totalProgress.toFixed(2));//tofixed 2位小數，型別是string
            if (totalProgress >= 100) {
                setIsLoading(false);
            }
        }

        const assets = [
            { url: `${import.meta.env.BASE_URL}/models/forturntable.glb`, name: "table" },
            { url: `${import.meta.env.BASE_URL}/music/mysterious-night.mp3`, name: "music" },
            { url: `${import.meta.env.BASE_URL}/texture/card_back.png`, name: "backCard" },
            ...Array.from({ length: totalCards }, (_, i) => ({ url: `${import.meta.env.BASE_URL}/texture/card${i}.png`, name: `frontCard` })),
        ];

        const promises = assets.map(asset =>
            loadAssetWithProgress(asset.url, progress => updateTotalProgress(asset.name, progress))
        );

        await Promise.all(promises);
    };

    // 在組件掛載時執行資源加載
    useEffect(() => {
        loadAllAssets();
    }, []);
    

    return (isLoading ?
         <div className="loading w-full h-full fixed top-0 left-0 flex justify-center items-center bg-black bg-opacity-80 backdrop-blur-2xl z-50">
            Loading...{loadingProgress}%</div> 
            : null);
};

export default Loading;
