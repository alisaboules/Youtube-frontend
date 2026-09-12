import { PUBLIC_PAGE } from "@/config/public-page.config";
import { useProfile } from "@/hooks/useProfile";
import { MenuItem } from "./MenuItem";
import type { IMenuItemProps } from "@/types/menu.types";
import { match } from "path-to-regexp";
import { usePathname } from "next/navigation";

export function MyChannelMenuItem({item} : IMenuItemProps) {
  const { profile } = useProfile();
  const pathname = usePathname();
  const myChannelLink = profile?.channel?.slug
    ? PUBLIC_PAGE.CHANNEL(profile.channel.slug)
    : null;
  if (!myChannelLink) return null;
  return <MenuItem item={{...item, link: myChannelLink}} isActive={!!match(myChannelLink)(pathname)}/>;
}
