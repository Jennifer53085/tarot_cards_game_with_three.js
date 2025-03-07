import React, { createContext, useState, useContext, ReactNode } from 'react';

interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  loadingProgress: number;
  setLoadingProgress: (loadingProgress: number | ((prev: number) => number)) => void;  // 允許回調函數
}


const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoadingContext = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};


export const LoadingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading, loadingProgress, setLoadingProgress }}>
      {children}
    </LoadingContext.Provider>
  );
};
