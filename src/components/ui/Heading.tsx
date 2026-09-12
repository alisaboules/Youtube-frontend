import type { Icon } from '@/types/sidebar.types';
import { cn } from '@/utils/cn';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  IconMe?: Icon;
  isH1?: boolean;
  isPageHeading?: boolean;
  className?: string;
}

export function Heading({
  children,
  IconMe,
  isH1 = false,
  isPageHeading = false,
  className,
}: Props) {
  return (
    <div className={cn('flex items-center gap-2 mb-6', className)}>
      {IconMe && <IconMe className="text-primary" />}
      {isH1 ? (
        <h1 className="font-semibold text-lg">{children}</h1>
      ) : isPageHeading ? (
        <h1 className="font-bold text-4xl">{children}</h1>
      ) : (
        <h2 className="font-semibold text-lg">{children}</h2>
      )}
      {}
    </div>
  );
}
