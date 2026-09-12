import type { IVideo } from "./video.types";

export interface IPlayList {
  title: string;
  userId: string;
  id: string;
  videos: IVideo[];
  createdAt: string;
}

export interface IPlayListData {
  videoPublicId: string;
  title: string;
}