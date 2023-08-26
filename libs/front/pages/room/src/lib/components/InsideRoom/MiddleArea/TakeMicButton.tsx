'use client';

import { useMutation } from '@cypher/front/libs/apollo';
import { ToggleMyselfFromQueueDocument } from '@cypher/front/shared/graphql';
import { Button } from '@cypher/front/shared/ui';
import { useLocalParticipant } from '@livekit/components-react';
import { ListPlus, ListX, LogIn } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

interface TakeMicButtonProps {
  roomId: string;
  authenticated: boolean;
}

export function TakeMicButton({ roomId, authenticated }: TakeMicButtonProps) {
  const router = useRouter();
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

  const button = useMemo(() => {
    if (!authenticated)
      return { label: 'Connectez-vous pour prendre le micro', icon: <LogIn /> };
    if (!iAmInTheQueue)
      return { label: "Rejoindre la file d'attente", icon: <ListPlus /> };
    if (iAmInTheQueue)
      return { label: "Se retirer de la file d'attente", icon: <ListX /> };

    return { label: '', icon: null };
  }, [iAmInTheQueue, authenticated]);

  const handleClick = async () => {
    if (!authenticated) {
      router.push('/login');
      return;
    }

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
      startDecorator={button?.icon}
      onClick={handleClick}
      loading={loading}
      size="lg"
      sx={{ borderRadius: 0 }}
    >
      {button.label}
    </Button>
  );
}
