'use client';

import { forwardRef } from 'react';

interface BeatStreamingProps {
  beatMuted: boolean;
}

export const BeatStreaming = forwardRef<HTMLAudioElement, BeatStreamingProps>(
  ({ beatMuted }, ref) => {
    return (
      <audio ref={ref} muted={beatMuted} controls loop>
        <source src="/audios/beat.ogg" type="audio/ogg" />
      </audio>
    );
  }
);
