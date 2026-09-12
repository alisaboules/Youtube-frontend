import type { HTMLCustomVideoElement } from "@/types/video-player.types";

export const getVideoInfo = (video: HTMLCustomVideoElement) => {
  const currentTime = video.currentTime;
  const originalTime = video.duration;

  return {
    currentTime,
    originalTime,
    progress: (currentTime / originalTime) * 100
  }
}