import type { TUser } from "./user.types";
import type { IVideo } from "./video.types";

export interface IWatchHistory{
  id?: string;
  user: TUser;
  watchedAt: string;
  video: IVideo
}