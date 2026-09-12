import { instance } from "@/api/axios";
import type { IWatchHistory } from "@/types/wathHistory.types";

class WatchHistroryService {
  private _WATCH_HISTORY = '/watch-history';

  getUserHistory() {
    return instance.get<IWatchHistory[]>(
      this._WATCH_HISTORY
    )
  }

  addToHistory(videoId: string) {
    return instance.post(this._WATCH_HISTORY, { videoId })
  }

  clearHistory() {
    return instance.delete(this._WATCH_HISTORY);
  }
}
export const watchHistoryService = new WatchHistroryService();