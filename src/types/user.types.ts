import type { IChannel } from "./channel.types"
import type { IVideo, VideoLike } from "./video.types"
import type { IWatchHistory } from "./wathHistory.types"

export interface TUser {
  id?: string;
  name?: string;
  email: string
}

export interface IFullUser extends TUser {
  channel?: IChannel;
  subscriptions: IChannel[];
  watchHistory: IWatchHistory[];
  verificationToken?: string | null;
  likes?: VideoLike[];
}

export interface IProfileResponse extends IFullUser {
  subscribedVideos?: IVideo[]
}

export interface ISingleVideoResponse extends IVideo {
  similarVideos: IVideo[]
}