import type { TUser } from "./user.types";
import type { IFullVideo } from "./video.types";

export interface IChannel {
  id: string;
  name: string;
  slug: string;
  description: string;
  isVerified: boolean;
  avatarUrl: string;
  bannerUrl: string;
  createdAt: string;
  videos: IFullVideo[];
  subscribers: TUser[];
  user: TUser
}