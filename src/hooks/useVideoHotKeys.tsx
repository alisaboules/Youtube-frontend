import type { EnumVideoPlayerQuality } from '@/types/video-player.types';
import { useHotkeys } from 'react-hotkeys-hook';
import type { TSkipTime } from './useVideoPlayer';
import { useEffect } from 'react';

interface Props {
  volume: number;
  togglePlayPause: () => void;
  changeQuality: (quality: EnumVideoPlayerQuality) => void;
  toggleFullScreen: () => void;
  skipTime: (tyoe?: TSkipTime) => void;
  changeVolume: (value: number) => void;
  toggleMute: () => void;
  toggleTheaterMode: () => void;
  toggleLightingMode: () => void;
}

export function useVideoHotKeys({volume, ...fn}: Props) {
  // 	useEffect(() => {
	// 	const handleKeyDown = (event: KeyboardEvent) => {
	// 		const target = event.target as HTMLElement
	// 		const isInputField =
	// 			target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable

	// 		if (!isInputField && (event.code === 'Space' || event.key === ' ')) {
	// 			event.preventDefault()
	// 			fn.togglePlayPause()
	// 		}
	// 	}

	// 	window.addEventListener('keydown', handleKeyDown)

	// 	return () => {
	// 		window.removeEventListener('keydown', handleKeyDown)
	// 	}
	// }, [fn])
  
  useHotkeys('space', e => {
    e.preventDefault();
    fn.togglePlayPause();
  })
  
  useHotkeys('left', () => {
    fn.skipTime('backward');
  })

  useHotkeys('right', () => {
    fn.skipTime('forward');
  })

  useHotkeys('up', (e) => {
    e.preventDefault();
    fn.changeVolume(Math.min(volume + 0.1, 1));
  })

  useHotkeys('down', (e) => {
    e.preventDefault();
    fn.changeVolume(Math.max(volume - 0.1, 0));
  })

  useHotkeys('f', (e) => {
    e.preventDefault();
    fn.toggleFullScreen();
  })

  useHotkeys('m', (e) => {
    e.preventDefault();
    fn.toggleMute();
  })

  useHotkeys('t', (e) => {
    e.preventDefault();
    fn.toggleTheaterMode();
  })

  useHotkeys('l', (e) => {
    e.preventDefault();
    fn.toggleLightingMode();
  })
}