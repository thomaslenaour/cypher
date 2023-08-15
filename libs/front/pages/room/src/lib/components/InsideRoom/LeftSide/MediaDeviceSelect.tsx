import {
  useMaybeRoomContext,
  useMediaDeviceSelect,
} from '@livekit/components-react';

import { Select, Option } from '@cypher/front/shared/ui';

export function MediaDeviceSelect() {
  const room = useMaybeRoomContext();
  const { devices, activeDeviceId, setActiveMediaDevice } =
    useMediaDeviceSelect({
      kind: 'audioinput',
      room,
      requestPermissions: false,
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
      color="primary"
      variant="plain"
      defaultValue={activeDeviceId}
      onChange={(_, value) => {
        value && handleActiveDeviceChange(value);
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
