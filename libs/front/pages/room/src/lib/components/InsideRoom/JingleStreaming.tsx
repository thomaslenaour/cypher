import { forwardRef } from 'react';

export const JingleStreaming = forwardRef<HTMLAudioElement>((_, ref) => {
  return (
    <audio ref={ref} controls>
      <source src="/audios/jingle.wav" type="audio/wav" />
    </audio>
  );
});
