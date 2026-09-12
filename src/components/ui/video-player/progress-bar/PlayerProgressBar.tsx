import Tooltip from 'rc-tooltip';
import { getTime } from '@/utils/getTime';
import type { ReactElement} from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

interface IHandleProps {
  value: number;
  dragging: boolean;
  index: number;
}

const handleRender = (node: ReactElement, props: IHandleProps) => {
  const {value, dragging, index} = props;
  return (
    <Tooltip prefixCls='rc-slider-tooltip' overlay={getTime(value)} visible={dragging} placement='top' key={index} classNames={{
    root: 'tooltip-simple-text'}}>
      {node}
    </Tooltip>
  );
}

interface Props {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
}

export function PlayerProgressBar({ currentTime, duration, onSeek}: Props ) {
  return (
    <div className="w-full">
        <Slider className='video-progress-slider' min={0} max={duration} value={currentTime} onChange={(value) => {
          if (typeof value == 'number') {
            onSeek(value);
          }
        }}
        handleRender={handleRender}
        styles={{
          track: { backgroundColor: 'var(--primary)', height: 5 },
          rail: { backgroundColor: 'rgb(196 196 196/60%)', height: 5 },
          handle: {
            borderColor: 'transparent',
            height: 16,
            width: 16,
            backgroundColor: 'transparent',
            outline: 'none',
            boxShadow: 'none',
            marginTop: -5.5,
          }
        }}
        />
    </div>
  );
}