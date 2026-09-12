import Link from 'next/link';
import type { ISidebarItem } from '../../../../types/sidebar.types';
import { cn } from '@/utils/cn';

interface Props {
  item: ISidebarItem;
  isActive: boolean;
}

export function MenuItem({ item, isActive }: Props) {
  return (
    <li className="">
      <Link
        href={item.link}
        className={cn(
          'flex gap-5 items-center hover:bg-[#f1f1f1]/10 p-2 rounded-lg',
          isActive && 'text-primary font-semibold',
        )}
        title={item.label}>
        <item.icon
          className={cn(
            'min-w-6 min-h-6',
            item.iconType == 'svg' && !isActive && 'text-foreground',
          )}
        />
        <span className="">{item.label}</span>
      </Link>
      {item.isBottomBorder && <div className="bg-border h-px mt-2" />}
    </li>
  );
}
