'use client';

import { forwardRef } from 'react';

export const BeatStreaming = forwardRef<HTMLAudioElement>((props, ref) => {
  return (
    <audio ref={ref}>
      <source src="/audios/beat.ogg" type="audio/ogg" />
    </audio>
  );
});
