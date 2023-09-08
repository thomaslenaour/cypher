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
      color="neutral"
      defaultValue={activeDeviceId ?? disabled ? undefined : 'default'}
      onChange={(_, value) => {
        value && handleActiveDeviceChange(value);
      }}
      size="sm"
      sx={{
        borderRadius: 0,
        borderTop: '1px #EAEEF6 solid',
        borderBottom: 0,
        borderLeft: 0,
        borderRight: 0,
      }}
      placeholder="Choisir un périphérique"
      disabled={disabled}
    >
      {devices.map((device) => (
        <Option key={device.deviceId} value={device.deviceId}>
          {device.label}
        </Option>
      ))}
    </Select>
  );
}
