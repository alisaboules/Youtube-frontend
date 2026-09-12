import type { IVideo } from "./video.types";

export interface IVideoFormData extends Omit<IVideo, 'id' | 'publicId' | 'viewsCount' | 'channel' | 'createdAt' | 'isPublic' | 'tags'> {tags: string[]}