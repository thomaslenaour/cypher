'use client';

import { Button } from '@cypher/front/shared/ui';
import { useLocalParticipant } from '@livekit/components-react';
import { useMemo } from 'react';

export function TakeMicButton() {
  const currentParticipant = useLocalParticipant();
  const participantIsInQueue = useMemo(() => {
    if (currentParticipant.localParticipant?.metadata) {
      const parsedMetadata = JSON.parse(
        currentParticipant.localParticipant.metadata
      );
      return !!parsedMetadata?.isInQueue;
    }
    return false;
  }, [currentParticipant]);

  const handleClick = async () => {
    // @TODO: send request to server to toggle participant from queue
    console.log('click', currentParticipant);
  };

  return (
    <Button size="lg" onClick={handleClick}>
      {participantIsInQueue ? 'Se retirer de la queue' : 'Prendre le mic'}
    </Button>
  );
}
