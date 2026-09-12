import type { LinkProps } from "next/link";
import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type TLink = LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>;

interface Props extends TLink{
  isLoading?: boolean,
  children: ReactNode
}

export function LinkButton({children, isLoading, ...props}: Props) {
  return (
    <Link {...props} className="py-2 px-5 bg-primary text-foreground font-semibold rounded-lg hover:bg-primary/70 transition-colors disabled:bg-border">
      {isLoading ? 'Loading...' : children}
    </Link>
  );
}