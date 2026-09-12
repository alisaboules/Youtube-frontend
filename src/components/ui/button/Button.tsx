// import { cn } from "@/utils/cn";
// import type { ButtonHTMLAttributes, ReactNode } from "react";

// interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
//   isLoading?: boolean;
//   children: ReactNode;
//   variant: 'primary' | 'secondary' | 'tertiary'

// }

// export function Button({children, isLoading, variant='primary', ...props}: Props) {
//   return (
//     <button {...props} disabled={isLoading || props.disabled} 
//       className={cn("py-2 px-5 font-semibold rounded-lg transition-colors disabled:bg-border", {'bg-primary text-foreground hover:bg-primary/70': variant=='primary'}, {'bg-gray-600 text-white hover:bg-gray-500': variant=='secondary'}, {'bg-quaternary text-white': variant=='tertiary'})}>
//       {isLoading ? 'Loading...' : children}
//     </button>
//   );
// }
import { cn } from '@/utils/cn';

import type {
  ButtonHTMLAttributes,
  ReactNode
} from 'react';

interface Props
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  children: ReactNode;
  variant: 'primary' | 'secondary' | 'tertiary';
}

export function Button({
  children,
  isLoading,
  variant = 'primary',
  ...props
}: Props) {
  return (
    <button
      {...props}
      disabled={isLoading || props.disabled}
      className={cn(
        'py-2 px-5 font-semibold rounded-lg transition-colors',

        variant === 'primary' && [
          'bg-primary text-foreground',
          'hover:bg-primary/70',
          'disabled:bg-primary/70',
        ],

        variant === 'secondary' && [
          'bg-gray-600 text-white',
          'hover:bg-gray-500',
          'disabled:bg-gray-600',
        ],

        variant === 'tertiary' && [
          'bg-quaternary text-white',
          'disabled:bg-quaternary',
        ],
      )}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
}