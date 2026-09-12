import { Volume1, Volume2, VolumeX } from "lucide-react";

interface Props {
  value: number;
  isMuted: boolean;
  changeVolume: (value: number) => void;
  toggleMute: () => void;
}

export function VolumeControl({ changeVolume, isMuted, toggleMute, value}: Props) {
  return (
    <div className="flex items-center gap-2">
      <button onClick={toggleMute} className="transition-colors hover:text-primary">
        { isMuted ? <VolumeX /> : value <= 0.4 ? <Volume1 /> : <Volume2 />}
      </button>
      <input 
        type='range'
        min='0'
        max='1'
        step='0.05'
        className="volume-slider w-16 appearance-none rounded-lg cursor-pointer transition-all"
        value={value}
        onChange={e => changeVolume(parseFloat(e.target.value))}
        style={{ background: `linear-gradient(to right, var(--primary) ${value * 100}%, rgba(255, 255, 255, 0.2) ${value*100}%)`}}
      />
    </div>
  );
} 