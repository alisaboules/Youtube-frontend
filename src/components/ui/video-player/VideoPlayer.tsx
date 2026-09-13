'use client';

import { useVideoPlayer } from '@/hooks/useVideoPlayer';
import { EnumVideoPlayerQuality } from '@/types/video-player.types';
import { Lightbulb, Maximize, Pause, Play, RectangleHorizontal } from 'lucide-react';
import { PlayerProgressBar } from './progress-bar/PlayerProgressBar';
import { SelectQuality } from './quality/SelectQuality';
import { VolumeControl } from './volume/VolumeControl';
import { useVideoHotKeys } from '@/hooks/useVideoHotKeys';
import { getTime } from '@/utils/getTime';
import { cn } from '@/utils/cn';
import { STORAGE_URL } from '@/constants/storage';

interface Props {
  fileName: string;
  toggleTheaterMode: () => void;
  maxResolution: EnumVideoPlayerQuality;
  thumbnailUrl: string;
}

export function VideoPlayer({ fileName, toggleTheaterMode, maxResolution, thumbnailUrl }: Props) {
  const { fn, playerRef, state, bgRef } = useVideoPlayer({ fileName, toggleTheaterMode, maxResolution });
  useVideoHotKeys({
    volume: state.volume,
    togglePlayPause: fn.togglePlayPause,
    changeQuality: fn.changeQuality,
    toggleFullScreen: fn.toggleFullScreen,
    skipTime: fn.skipTime,
    changeVolume: fn.changeVolume,
    toggleMute: fn.toggleMute,
    toggleTheaterMode,
    toggleLightingMode: fn.toggleLightingMode
  });

  
  return (
    <div className="group w-full relative rounded-lg ">
      {state.isLightingMode && (
        <video
        ref={bgRef}
        className="absolute rounded-lg top-0 left-0 -z-10 object-cover w-full h-full filter blur-3xl  brightness-90 contrast-125 saturate-150 mix-blend-lighten"
        src={`${STORAGE_URL}/videos/${maxResolution}/${fileName}`}
        muted
      />
      )}
      
      <video
        ref={playerRef}
        className={cn("rounded-lg object-contain w-full h-full z-[2] aspect-video relative")}
        controls={false}
        src={`${STORAGE_URL}/videos/${maxResolution}/${fileName}`}
        preload="metadata"
        onClick={fn.togglePlayPause}
        poster={thumbnailUrl}
      />
      <div className="group-hover:opacity-100 opacity-0 transition-opacity duration-300 grid grid-cols-[7fr_1fr] gap-7 right-5 absolute bottom-5 left-5 z-[20]">
        <div className="flex items-center gap-5">
          <button onClick={fn.togglePlayPause} className="transition-colors hover:text-primary">
            {state.isPlaying ? <Pause /> : <Play />}
          </button>
          <PlayerProgressBar duration={state.videoTime} currentTime={state.currentTime} onSeek={fn.onSeek}/>
          <div className="flex items-center gap-1 border-l pl-3 border-foreground/50">
            <span>{getTime(state.currentTime)}</span>
            <span>/</span>
            <span>{getTime(state.videoTime)}</span>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <VolumeControl
            changeVolume={fn.changeVolume}
            toggleMute={fn.toggleMute}
            value={state.volume}
            isMuted={state.isMuted}
          />
          <SelectQuality currentValue={state.quality} onChange={fn.changeQuality} maxResolution={maxResolution}/>
          <button onClick={fn.toggleLightingMode} className="transition-colors hover:text-primary">
            {<Lightbulb className={cn("", state.isLightingMode ? 'text-primary' : 'text-foreground')}/>}
          </button>
          <button className="transition-colors hover:text-primary" onClick={toggleTheaterMode}>
            <RectangleHorizontal />
          </button>
          <button onClick={fn.toggleFullScreen} className="hover:text-primary">
            <Maximize />
          </button>
        </div>
      </div>
    </div>
  );
}
