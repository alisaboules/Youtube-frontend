import { instance } from "@/api/axios";
import type { ISettingsData } from "@/types/settings.types";
import type { IProfileResponse } from "@/types/user.types";


class UserService {
  private _USERS = '/users';

  getProfile() {
    return instance.get<IProfileResponse>(`${this._USERS}/profile`)
  }

  updateProfile(data: ISettingsData) {
    return instance.put<IProfileResponse>(`${this._USERS}/profile`, data)
  }

  toggleLike(videoId: string) {
    return instance.put(`${this._USERS}/profile/likes`, {videoId});
  }

  toggleDislike(videoId: string) {
    return instance.put(`${this._USERS}/profile/dislikes`, {videoId});
  }

  getNotification(channelId: string) {
    return instance.get(`/users/notification/${channelId}`);
  }

  updateNotification(channelId: string, type: 'ALL' | 'PERSONALISED' | 'NONE') {
    return instance.put(`/users/notification/${channelId}`, { type });
  }

  unsubscribe(channelId: string) {
    return instance.delete(`/users/notification/${channelId}`)
  }
}

export const userService = new UserService();