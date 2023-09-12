'use client';

import { forwardRef } from 'react';

interface BeatStreamingProps {
  beatMuted: boolean;
}

export const BeatStreaming = forwardRef<HTMLAudioElement, BeatStreamingProps>(
  ({ beatMuted }, ref) => {
    return (
      <audio ref={ref} muted={beatMuted} preload="auto" controls loop>
        <source src="/audios/beat.mp3" type="audio/mp3" />
      </audio>
    );
  }
);
