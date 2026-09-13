'use client';

import { STORAGE_URL } from '@/constants/storage';
import { EnumVideoPlayerQuality, type HTMLCustomVideoElement } from '@/types/video-player.types';
import { getVideoInfo } from '@/utils/video-player';
import { useEffect, useRef, useState } from 'react';

const SKIP_TIME_SECONDS = 10;
export type TSkipTime = 'forward' | 'backward';

interface Props {
  fileName: string;
  toggleTheaterMode: () => void;
  maxResolution: EnumVideoPlayerQuality;
}

export function useVideoPlayer({ fileName, maxResolution }: Props) {
  const playerRef = useRef<HTMLCustomVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [quality, setQuality] = useState<EnumVideoPlayerQuality>(maxResolution);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoTime, setVideoItem] = useState(0);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isLightingMode, setIsLightingMode] = useState(false);
  const bgRef = useRef<HTMLCustomVideoElement>(null);

  const togglePlayPause = () => {
    if (isPlaying) {
      playerRef.current?.pause();
      bgRef.current?.pause();
    } else {
      playerRef.current?.play();
       bgRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const skipTime = (type?: TSkipTime) => {
    if (!playerRef.current?.currentTime) return;
    if (type == 'forward') {
      playerRef.current.currentTime += SKIP_TIME_SECONDS;
      if (bgRef?.current) {
        bgRef.current.currentTime += SKIP_TIME_SECONDS;
      }
    } else {
      playerRef.current.currentTime -= SKIP_TIME_SECONDS;
      if (bgRef?.current) {
        bgRef.current.currentTime -= SKIP_TIME_SECONDS;
      }
    }
  };

  const toggleFullScreen = () => {
    if (!playerRef.current) return;
    if (playerRef.current.requestFullscreen) {
      playerRef.current.requestFullscreen();
    } else if (playerRef.current?.mozRequestFullScreen) {
      playerRef.current.mozRequestFullScreen();
    } else if (playerRef.current.webkitRequestFullScreen) {
      playerRef.current.webkitRequestFullScreen();
    } else if (playerRef.current.msRequestFullScreen) {
      playerRef.current.msRequestFullScreen();
    }
  };

  const changeQuality = (quality: EnumVideoPlayerQuality) => {
    const player = playerRef.current;

    if (!player) return;

    const time = player.currentTime;

    setQuality(quality);

    player.src = `${STORAGE_URL}/videos/${maxResolution}/${fileName}`;
    player.currentTime = time;
    player.play();
    setIsPlaying(true);
  };

  const changeVolume = (value: number) => {
    const player = playerRef.current;
    if (!player) return;
    player.volume = value;
    setVolume(value);

    if (value > 0) {
      player.muted = false;
      setIsMuted(false);
    } else {
      player.muted = true;
      setIsMuted(true);
    }
  };

  const toggleMute = () => {
    const player = playerRef.current;
    if (!player) return;
    player.muted = !player.muted;
    setIsMuted(player.muted);
  };

  const onSeek = (time: number) => {
    if (!playerRef.current) return;
    playerRef.current.currentTime = time;
    if (bgRef?.current) {
      bgRef.current.currentTime = time;
    }
    setCurrentTime(time);
  };

  useEffect(() => {
  const player = playerRef.current;

  if (!player) return;

  const handleLoadedMetadata = () => {
    if (!Number.isFinite(player.duration)) return;
    setVideoItem(player.duration);
    setCurrentTime(player.currentTime);
    setProgress(player.duration > 0 ? (player.currentTime / player.duration) * 100 : 0);
  };
  player.addEventListener('loadedmetadata', handleLoadedMetadata);
  if (player.readyState >= 1) {
    handleLoadedMetadata();
  }

  return () => {
    player.removeEventListener('loadedmetadata', handleLoadedMetadata);
  };
}, []);

  useEffect(() => {
    const player = playerRef?.current;
    const updateProgress = () => {
      if (!player) return;
      const { currentTime, progress } = getVideoInfo(player);
      setCurrentTime(currentTime);
      setProgress(progress);
    };
    player?.addEventListener('timeupdate', updateProgress);
    return () => {
      player?.removeEventListener('timeupdate', updateProgress);
    };
  }, []);

  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;
    const handleEnded = () => {
      setIsPlaying(false);
    };
    player.addEventListener('ended', handleEnded);
     console.log({
    duration: player.duration,
    readyState: player.readyState,
    currentTime: player.currentTime,
    src: player.src,
  });
    return () => {
      player.removeEventListener('ended', handleEnded);
    };
  }, []);

  useEffect(() => {
  const player = playerRef.current;
  const bgPlayer = bgRef.current;

  if (!player || !bgPlayer || !isLightingMode) return;

  bgPlayer.currentTime = player.currentTime;
  bgPlayer.volume = 0;
  bgPlayer.muted = true;

  if (isPlaying) {
    bgPlayer.play().catch(() => {});
  } else {
    bgPlayer.pause();
  }
}, [isLightingMode, isPlaying]);

  const fn = {
    togglePlayPause,
    toggleFullScreen,
    skipTime,
    changeQuality,
    toggleMute,
    changeVolume,
    onSeek,
    toggleLightingMode: () => setIsLightingMode(!isLightingMode)
  };
 

  return {
    state: {
      isPlaying,
      quality,
      progress,
      currentTime,
      videoTime,
      isMuted,
      volume,
      isLightingMode,
    },
    fn,
    playerRef,
    bgRef
  };
}
