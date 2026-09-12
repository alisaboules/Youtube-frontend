import Link from 'next/link';
import Image from 'next/image';
import type { ISidebarSubItem } from '../../../../../types/sidebar.types';
import { Dot, Radio } from 'lucide-react';

interface Props {
  item: ISidebarSubItem;
}

export function SubItem({ item }: Props) {
  return (
    <li>
      <Link href={item.link} className='flex gap-5 items-center p-2 rounded-lg hover:bg-[#f1f1f1]/10'>
        {item.avatar && <Image alt={item.label} src={item.avatar} width={24} height={24} className='rounded-full shrink-0'/>}
        <span>
          {item.label}
          {item.isLiveNow && <Radio className="text-primary" />}
          {item.isRecentUpload && <Dot className="text-[#005bff]" />}
        </span>
      </Link>
    </li>
  );
}
