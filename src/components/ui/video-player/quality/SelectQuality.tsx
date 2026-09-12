'use client'

import { useOutside } from "@/hooks/useOutside";
import { EnumVideoPlayerQuality } from "@/types/video-player.types";
import { VIDEO_QUALITIES } from "@/components/ui/video-player/quality/qualities.data"
import { AnimatePresence, m } from "framer-motion";

interface Props {
  currentValue: EnumVideoPlayerQuality;
  onChange: (quality: EnumVideoPlayerQuality) => void;
  maxResolution: EnumVideoPlayerQuality;
}

export function SelectQuality({ currentValue, onChange, maxResolution }: Props ) {
  const { isShow, ref, setIsShow } = useOutside(false);
  const availableQuailities = VIDEO_QUALITIES.slice(
    VIDEO_QUALITIES.indexOf(maxResolution)
  );
  return (
    <div ref={ref} className="relative">
      <button className="relative" onClick={() => setIsShow(prev => !prev)}>
        {currentValue}
      </button>
      <AnimatePresence>
        {
        isShow && (
          <m.ul initial={{ opacity: 0, y: 10}} animate={{ opacity: 1, y: 0}} exit={{ opacity: 0, y: 10}} transition={{ duration: 0.3}} className="bg-foreground/10 py-2 px-4 rounded absolute bottom-full right-0 z-10 shadow">
            {availableQuailities.map(quality => (
              <li key={quality} className="">
                <button onClick={() => {
                  onChange(quality);
                  setIsShow(false);
                }} className="transition-colors hover:text-primary">
                  {quality}
                </button>
              </li>
            ))}
          </m.ul>
        )
      }</AnimatePresence>
    </div>
  );
}