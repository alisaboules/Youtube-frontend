import { usePathname } from 'next/navigation';
import type { ISidebarItem } from '../../../../types/sidebar.types';
import { MenuItem } from './MenuItem';
import { match } from 'path-to-regexp';
import { useTypedSelector } from '@/store';
import { PUBLIC_PAGE } from '@/config/public-page.config';
import { MyChannelMenuItem } from './MyChannelMenuItem';

interface Props {
  title?: string;
  menu: ISidebarItem[];
}

export function SidebarMenu({ title, menu }: Props) {
  const pathname = usePathname();
  const { isLoggedIn } = useTypedSelector((state) => state.auth);

  return (
    <nav className="flex flex-col gap-3">
      {title && <div className="text-sm text-secondary font-medium">{title}</div>}
      <ul className="flex flex-col gap-2">
        {menu.map((menuItem) => {
          const props = {
            item: menuItem,
            isActive: !!match(menuItem.link)(pathname),
          };
          const isMyChannel = menuItem.link == PUBLIC_PAGE.MY_CHANNEL;
          const isMyChannelItem = isMyChannel && isLoggedIn;
          return isMyChannelItem ? (
            <MyChannelMenuItem key={menuItem.label} {...props} />
          ) : isMyChannel ? null : (
            <MenuItem key={menuItem.label} {...props} />
          );
        })}
      </ul>
    </nav>
  );
}
