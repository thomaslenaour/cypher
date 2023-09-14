import { MediaDeviceSelect } from './MediaDeviceSelect/MediaDeviceSelect';
import { MicToggle } from './MicToggle/MicToggle';

interface ControlsProps {
  mic: {
    disabled: boolean;
    value: boolean;
    onToggle: () => void;
  };
  mediaDeviceSelect: {
    disabled: boolean;
  };
}

export function Controls({ mic, mediaDeviceSelect }: ControlsProps) {
  return (
    <>
      <MicToggle {...mic} />
      <MediaDeviceSelect disabled={mediaDeviceSelect.disabled} />
    </>
  );
}
