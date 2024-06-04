// components/LiveVideo.tsx
import { useRef, useState, useEffect } from 'react';
import { Participant, Track } from 'livekit-client';
import { useTracks } from '@livekit/components-react';
import { VolumeControl } from './volume-control';
import { FullscreenControl } from './fullscreen-control';
import { usePipContext } from "@/components/stream-ui-components/pipContext";
import { Shrink , Expand } from 'lucide-react';
import { Hint } from "@/components/hint";

interface LiveVideoProps {
  participant: Participant;
}

export const LiveVideo = ({ participant }: LiveVideoProps) => {
  const { videoElement, setVideoElement, isPipActive, setIsPipActive } = usePipContext();
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [volume, setVolume] = useState(0);

  useEffect(() => {
    if (localVideoRef.current && !videoElement) {
      setVideoElement(localVideoRef.current);
    }
  }, [localVideoRef, videoElement, setVideoElement]);

  const onVolumeChange = (value: number) => {
    setVolume(value);
    if (videoElement) {
      videoElement.muted = value === 0;
      videoElement.volume = value * 0.01;
    }
  };

  const toggleMute = () => {
    const isMuted = volume === 0;
    setVolume(isMuted ? 50 : 0);
    if (videoElement) {
      videoElement.muted = !isMuted;
      videoElement.volume = isMuted ? 0.5 : 0;
    }
  };

  useEffect(() => {
    onVolumeChange(0);
  }, []);

  const toggleFullscreen = () => {
    if (isFullscreen) {
      document.exitFullscreen();
    } else if (wrapperRef.current) {
      wrapperRef.current.requestFullscreen();
    }
  };

  const togglePip = () => {
    if (!('pictureInPictureEnabled' in document)) {
      alert('Your browser does not support Picture-in-Picture.');
      return;
    }

    if (document.pictureInPictureElement) {
      document.exitPictureInPicture();
    } else if (videoElement) {
      videoElement.requestPictureInPicture().catch((error) => {
        console.error('Failed to enter Picture-in-Picture mode:', error);
      });
    }
  };

  const handleFullscreenChange = () => {
    setIsFullscreen(document.fullscreenElement !== null);
  };

  const handlePipChange = () => {
    setIsPipActive(document.pictureInPictureElement !== null);
  };

  useEffect(() => {
    if (wrapperRef.current) {
      wrapperRef.current.addEventListener('fullscreenchange', handleFullscreenChange);
    }
    return () => {
      if (wrapperRef.current) {
        wrapperRef.current.removeEventListener('fullscreenchange', handleFullscreenChange);
      }
    };
  }, []);

  useEffect(() => {
    if (videoElement) {
      videoElement.addEventListener('enterpictureinpicture', handlePipChange);
      videoElement.addEventListener('leavepictureinpicture', handlePipChange);
    }
    return () => {
      if (videoElement) {
        videoElement.removeEventListener('enterpictureinpicture', handlePipChange);
        videoElement.removeEventListener('leavepictureinpicture', handlePipChange);
      }
    };
  }, [videoElement]);

  useTracks([Track.Source.Camera, Track.Source.Microphone])
    .filter((track) => track.participant.identity === participant.identity)
    .forEach((track) => {
      if (videoElement) {
        track.publication.track?.attach(videoElement);
      }
    });

  const label = isPipActive ? "Exit pip" : "Enter pip"

  return (
    <div ref={wrapperRef} className="relative h-full flex">
      <video ref={localVideoRef} width="100%" />
      <div className="absolute top-0 h-full w-full opacity-0 hover:opacity-100 hover:transition-all">
        <div className="absolute bottom-0 flex h-14 w-full items-center  justify-between bg-gradient-to-r from-neutral-900 px-4">
          <div className="">
            <VolumeControl onChange={onVolumeChange} value={volume} onToggle={toggleMute} />
          </div>
          <div className='flex justify-items-end'>
            <FullscreenControl  isFullscreen={isFullscreen} onToggle={toggleFullscreen} />  
            <Hint label={label} asChild>
              <button  className='text-sm text-white p-1.5 hover:bg-white/10 rounded-lg' onClick={togglePip}>
                {isPipActive ? <Expand /> : <Shrink />}
              </button>
            </Hint>
          </div>  
        </div>
      </div>
    </div>
  );
};
