// context/PipContext.tsx
'use client';

import React, { createContext, useContext, useRef, useState, ReactNode } from 'react';

interface PipContextProps {
    videoElement: HTMLVideoElement | null;
    setVideoElement: (element: HTMLVideoElement) => void;
    isPipActive: boolean;
    setIsPipActive: (active: boolean) => void;
}

const PipContext = createContext<PipContextProps | undefined>(undefined);

export const PipProvider = ({ children }: { children: ReactNode }) => {
    const [videoElement, setVideoElementState] = useState<HTMLVideoElement | null>(null);
    const [isPipActive, setIsPipActive] = useState(false);

    const setVideoElement = (element: HTMLVideoElement) => {
        setVideoElementState(element);
    };

    return (
        <PipContext.Provider value={{ videoElement, setVideoElement, isPipActive, setIsPipActive }}>
            {children}
        </PipContext.Provider>
    );
};

export const usePipContext = () => {
    const context = useContext(PipContext);
    if (!context) {
        throw new Error('usePipContext must be used within a PipProvider');
    }
    return context;
};