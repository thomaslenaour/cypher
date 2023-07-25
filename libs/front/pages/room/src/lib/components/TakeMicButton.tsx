'use client';

import { useMutation } from '@cypher/front/libs/apollo';
import { ToggleMyselfFromQueueDocument } from '@cypher/front/shared/graphql';
import { Button } from '@cypher/front/shared/ui';
import { useLocalParticipant } from '@livekit/components-react';
import { useMemo } from 'react';

interface TakeMicButtonProps {
  roomId: string;
}

export function TakeMicButton({ roomId }: TakeMicButtonProps) {
  const currentParticipant = useLocalParticipant();
  const participantIsInQueue = useMemo(() => {
    if (currentParticipant.localParticipant?.metadata) {
      const parsedMetadata = JSON.parse(
        currentParticipant.localParticipant.metadata
      );
      return !!parsedMetadata?.inQueueAt;
    }
    return false;
  }, [currentParticipant]);
  const [toggleMyselfFromQueue] = useMutation(ToggleMyselfFromQueueDocument);

  const handleClick = async () => {
    if (currentParticipant.localParticipant?.lastMicrophoneError) {
      console.log('you have to enable your mic before entering the queue');
      return;
    }

    await toggleMyselfFromQueue({
      variables: {
        data: {
          identity: currentParticipant.localParticipant?.identity,
          roomId,
        },
      },
    });
  };

  return (
    <Button size="lg" onClick={handleClick}>
      {participantIsInQueue ? 'Se retirer de la queue' : 'Prendre le mic'}
    </Button>
  );
}
