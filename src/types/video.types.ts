import type { IChannel } from "./channel.types";
import type { IPagination } from "./pagination.types";
import type { IFullUser, TUser } from "./user.types";
import type { EnumVideoPlayerQuality } from "./video-player.types";

export interface IVideo {
  id: string;
  title: string;
  publicId: string;
  description: string;
  thumbnailUrl: string;
  videoFileName: string;
  maxResolution: EnumVideoPlayerQuality
  viewsCount: number;
  isPublic: boolean;
  createdAt: string;
  channel: IChannel;
  tags: IVideoTag[]
}

export interface IFullVideo extends IVideo {
  likes: VideoLike[];
  dislikes: VideoDislike[];
  comments: VideoComment[],
}

export interface ISingleVideoResponse extends IFullVideo {
  similarVideos: IVideo[]
}

export interface IVideosPagination extends IPagination {
  videos: IFullVideo[];
}

export interface VideoLike {
  id: string;
  userId: string;
  videoId: string;
  user: TUser;
  video: IVideo,
}

export interface VideoDislike {
  id: string;
  userId: string;
  videoId: string;
  user: TUser;
  video: IVideo,
}

export interface VideoComment {
  id: string;
  text: string;
  createdAt: string;
  user: IFullUser;
  likes: CommentLike[];
  dislikes: CommentDislike[];
  authorLike?: IFullUser;
  videoId: string;
  isPinned: boolean;
}

export interface CommentLike {
  id: string;
  userId: string;
  commentId: string;
  user: TUser;
  comment: VideoComment,
}

export interface CommentDislike {
  id: string;
  userId: string;
  commentId: string;
  user: TUser;
  comment: VideoComment,
}

export interface ICommentData {
  text: string;
  videoId: string
}

export interface IVideoTag {
  id: string;
  name: string,
  videos: IVideo[]
}