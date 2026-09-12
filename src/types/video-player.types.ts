export enum EnumVideoPlayerQuality {
  R2160p = '4K',
  R1440p = '2K',
  R1080p = '1080p',
  R720p = '720p',
  R480p = '480p',
  R360p = '360p',
}

export interface HTMLCustomVideoElement extends HTMLVideoElement{
  mozRequestFullScreen?: () => Promise<void>;
  webkitRequestFullScreen?: () => Promise<void>;
  msRequestFullScreen?: () => Promise<void>;
}