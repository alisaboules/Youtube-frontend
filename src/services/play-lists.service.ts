import { instance } from "@/api/axios";
import type { IPlayList, IPlayListData } from "@/types/playlists.types";


class PlaylistService {
  private _PLAYLISTS ='/playlists';

  getUserPlayLists() {
    return instance.get<IPlayList[]>(this._PLAYLISTS)
  }
  
  getPlayListById(playlistId: string) {
    return instance.get<IPlayList>(`${this._PLAYLISTS}/${playlistId}`)
  }

  toggleVideoPlayList(playlistId: string, videoId: string, userId: string) {
    return instance.post(`${this._PLAYLISTS}/${playlistId}/toggle-video`, {videoId, userId})
  }

  createPlayList(playlist: IPlayListData) {
    return instance.post(this._PLAYLISTS, playlist)
  }

  deletePlaylist(playlistId: string) {
    return instance.delete(`${this._PLAYLISTS}/${playlistId}`);
  }
}

export const playlistService = new PlaylistService();