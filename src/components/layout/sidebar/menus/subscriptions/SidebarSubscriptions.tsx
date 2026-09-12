import { useProfile } from '@/hooks/useProfile';
import type { ISidebarSubItem } from '../../../../../types/sidebar.types';
import { SubItem } from './SubItem';

interface Props {
  title?: string;
}

export function SidebarSubscriptions({ title }: Props) {
  const { profile } = useProfile();
  return (
    <nav className="flex flex-col gap-3">
      {title && <div className="text-sm text-secondary font-medium">{title}</div>}
      <ul className="flex flex-col">
        {profile?.subscriptions.map(channel => (
          <SubItem item={{
            label: channel.name,
            link: `/c/${channel.slug}`,
            avatar: channel.avatarUrl
          }} key={channel.id} />
        ))}
      </ul>
    </nav>
  );
}
