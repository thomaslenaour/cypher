'use client';

import { forwardRef } from 'react';

export const BeatStreaming = forwardRef<HTMLAudioElement>((_, ref) => {
  return (
    <audio ref={ref} loop>
      <source src="/audios/beat.ogg" type="audio/ogg" />
    </audio>
  );
});
