'use client';

import { useMutation } from '@cypher/front/libs/apollo';
import { ToggleMyselfFromQueueDocument } from '@cypher/front/shared/graphql';
import { Button } from '@cypher/front/shared/ui';
import { useLocalParticipant } from '@livekit/components-react';
import { Mic2, Undo2 } from 'lucide-react';
import { useMemo } from 'react';

interface TakeMicButtonProps {
  roomId: string;
}

export function TakeMicButton({ roomId }: TakeMicButtonProps) {
  const currentParticipant = useLocalParticipant();
  const iAmInTheQueue = useMemo(() => {
    if (currentParticipant.localParticipant?.metadata) {
      const parsedMetadata = JSON.parse(
        currentParticipant.localParticipant.metadata
      );
      return !!parsedMetadata?.inQueueAt;
    }
    return false;
  }, [currentParticipant]);
  const [toggleMyselfFromQueue, { loading }] = useMutation(
    ToggleMyselfFromQueueDocument
  );

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
    <Button
      startDecorator={iAmInTheQueue ? <Undo2 /> : <Mic2 />}
      onClick={handleClick}
      loading={loading}
    >
      {iAmInTheQueue ? 'Se retirer de la queue' : 'Prendre le micro'}
    </Button>
  );
}
