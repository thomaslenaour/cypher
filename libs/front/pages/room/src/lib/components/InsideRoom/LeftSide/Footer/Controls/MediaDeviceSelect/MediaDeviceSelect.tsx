import {
  useMaybeRoomContext,
  useMediaDeviceSelect,
} from '@livekit/components-react';

import { Select, Option } from '@cypher/front/shared/ui';

interface MediaDeviceSelectProps {
  disabled: boolean;
}

export function MediaDeviceSelect({ disabled }: MediaDeviceSelectProps) {
  const room = useMaybeRoomContext();
  const { devices, activeDeviceId, setActiveMediaDevice } =
    useMediaDeviceSelect({
      kind: 'audioinput',
      room,
      requestPermissions: true,
    });

  const handleActiveDeviceChange = async (deviceId: string) => {
    try {
      await setActiveMediaDevice(deviceId, { exact: false });
    } catch (e) {
      if (e instanceof Error) {
        console.error(e);
      } else {
        throw e;
      }
    }
  };

  return (
    <Select
      defaultValue={activeDeviceId ?? disabled ? undefined : 'default'}
      onChange={(_, value) => {
        value && handleActiveDeviceChange(value);
      }}
      size="sm"
      placeholder="Choisir un périphérique"
      disabled={disabled || devices.length === 0}
      sx={{
        width: { xs: '100%', md: 'auto' },
      }}
    >
      {devices.map((device) => (
        <Option key={device.deviceId} value={device.deviceId}>
          {device.label}
        </Option>
      ))}
    </Select>
  );
}
