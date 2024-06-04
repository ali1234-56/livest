"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePipContext } from "@/components/stream-ui-components/pipContext";

const VideoPortal = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const { setVideoElement, videoElement } = usePipContext();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        if (videoRef.current && !videoElement) {
            setVideoElement(videoRef.current);
        }
    }, [videoElement, setVideoElement]);

    if (!isMounted) return null;

    return createPortal(
        <video ref={videoRef}  width="0%"/>,
        document.body
    );
};

export default VideoPortal;