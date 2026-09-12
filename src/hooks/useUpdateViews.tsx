import { videoService } from '@/services/video.service';
import { watchHistoryService } from '@/services/watch-history.service';
import type { ISingleVideoResponse } from '@/types/video.types';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

export function useUpdateViews(video: ISingleVideoResponse) {
  const hasUpdated = useRef(false);
  const { mutate: updateViews } = useMutation({
    mutationKey: ['update-video-views', video.publicId],
    mutationFn: () => videoService.updateViews(video.publicId),
  });
  const { mutate: updateWatchHistory } = useMutation({
    mutationKey: ['update-watch-history', video.id],
    mutationFn: () => watchHistoryService.addToHistory(video.id),
  });
  useEffect(() => {
    if (hasUpdated.current) return;
    hasUpdated.current = true;
    updateViews();
    updateWatchHistory();
  }, [updateViews, updateWatchHistory]);
}
