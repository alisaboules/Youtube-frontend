import type { ComponentType, SVGProps } from "react";

export type Icon = ComponentType<SVGProps<SVGSVGElement>>;

export interface ISidebarItem {
  icon: Icon,
  label: string,
  link: string,
  isBottomBorder: boolean,
  iconType?: 'lucide' | 'svg'
}

export interface ISidebarSubItem {
  avatar: string,
  label: string,
  link: string,
  isLiveNow?: boolean,
  isRecentUpload?: boolean
}