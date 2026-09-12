'use client'

import { cn } from "@/utils/cn";
import { EllipsisVertical } from "lucide-react";
import { useState } from "react";

interface Props {
  onClick: () => void;
}

export default function AnimationEllipsis({ onClick }: Props) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);

    onClick();

    setTimeout(() => {
      setIsClicked(false);
    }, 500);
  };
  return (
    <button
      type="button"
      onClick={handleClick}
      className="relative flex items-center justify-center w-12 h-12 rounded-full overflow-hidden">
      <span
        className={cn(
          'absolute inset-0 rounded-full border border-white/40',
          isClicked ? 'animate-button-ripple' : 'opacity-0',
        )}
      />
      <span
        className={cn(
          'absolute w-6 h-6 rounded-full bg-white/30 blur-md',
          isClicked ? 'animate-button-shine' : 'opacity-0',
        )}
      />
      <span className="relative z-10">
        <EllipsisVertical size={20} />
      </span>
    </button>
  );
}
