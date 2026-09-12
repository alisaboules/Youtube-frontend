import type { ISidebarItem } from '../../../types/sidebar.types';
import { PUBLIC_PAGE } from '@/config/public-page.config';
import {
  CircleAlert,
  CirclePlay,
  Compass,
  Flame,
  History,
  LayoutGrid,
  ListVideo,
  MonitorPlayIcon,
  Settings,
  Upload,
} from 'lucide-react';
import Liked from '@/assets/liked.svg';
import MyChannel from '@/assets/mychannel.svg';
import { STUDIO_PAGE } from '@/config/studio-page';

export const SIDEBAR_DATA: ISidebarItem[] = [
  {
    icon: Compass,
    label: 'Explore',
    link: PUBLIC_PAGE.HOME,
    isBottomBorder: false,
    iconType: 'lucide',
  },
  {
    icon: Flame,
    label: 'Trending',
    link: PUBLIC_PAGE.TRENDING,
    isBottomBorder: false,
    iconType: 'lucide',
  },
  {
    icon: MonitorPlayIcon,
    label: 'Cartoons',
    link: PUBLIC_PAGE.CARTOONS,
    isBottomBorder: true,
    iconType: 'lucide',
  },
  {
    icon: MyChannel,
    label: 'My channel',
    link: PUBLIC_PAGE.MY_CHANNEL,
    isBottomBorder: false,
    iconType: 'svg',
  },
  {
    icon: CirclePlay,
    label: 'Subscriptions',
    link: PUBLIC_PAGE.SUBSCRIPTIONS,
    isBottomBorder: false,
    iconType: 'lucide',
  },
  {
    icon: History,
    label: 'History',
    link: PUBLIC_PAGE.HISTORY,
    isBottomBorder: false,
    iconType: 'lucide',
  },
  {
    icon: Liked,
    label: 'Liked Video',
    link: PUBLIC_PAGE.LIKED_VIDEOS,
    isBottomBorder: false,
    iconType: 'svg',
  },
  {
    icon: ListVideo,
    label: 'Playlists',
    link: PUBLIC_PAGE.PLAY_LISTS,
    isBottomBorder: false,
    iconType: 'lucide',
  }
];

export const MORE_SIDEBAR_DATA: ISidebarItem[] = [
  {
    icon: CircleAlert,
    label: 'Send feedback',
    link: PUBLIC_PAGE.FEEDBACK,
    isBottomBorder: false,
  },
];

export const STUDIO_SIDEBAR_DATA: ISidebarItem[] = [
  {
    icon: LayoutGrid,
    label: 'Studio',
    link: STUDIO_PAGE.HOME,
    isBottomBorder: false,
  },
  {
    icon: Settings,
    label: 'Settings',
    link: STUDIO_PAGE.SETTINGS,
    isBottomBorder: false,
  },
  {
    icon: Upload,
    label: 'Upload a video',
    link: STUDIO_PAGE.UPLOAD_VIDEO,
    isBottomBorder: false,
  },
];
