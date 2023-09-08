'use client';

import { useMutation } from '@cypher/front/libs/apollo';
import { ToggleMyselfFromQueueDocument } from '@cypher/front/shared/graphql';
import { Button } from '@cypher/front/shared/ui';
import {
  useLocalParticipant,
  useParticipants,
} from '@livekit/components-react';
import { ListPlus, ListX, LogIn, Mic2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

interface TakeMicButtonProps {
  roomId: string;
  authenticated: boolean;
  onPublishingClick: () => Promise<void>;
  micPermissionEnabled?: boolean;
}

export function TakeMicButton({
  roomId,
  authenticated,
  onPublishingClick,
  micPermissionEnabled,
}: TakeMicButtonProps) {
  const router = useRouter();
  const currentParticipant = useLocalParticipant();
  const participants = useParticipants();
  const iAmInTheQueue = useMemo(() => {
    if (currentParticipant.localParticipant?.metadata) {
      const parsedMetadata = JSON.parse(
        currentParticipant.localParticipant.metadata
      );
      return !!parsedMetadata?.inQueueAt;
    }
    return false;
  }, [currentParticipant]);
  const currentPublisher = useMemo(() => {
    const publisher = participants.find((participant) => {
      if (participant?.metadata) {
        const parsedMetadata = JSON.parse(participant.metadata);
        return parsedMetadata?.canPublishAt;
      }
      return false;
    });

    return publisher;
  }, [participants]);
  const iAmThePublisher =
    currentParticipant?.localParticipant?.identity ===
    currentPublisher?.identity;

  const [toggleMyselfFromQueue, { loading }] = useMutation(
    ToggleMyselfFromQueueDocument
  );

  const button = useMemo(() => {
    if (!authenticated)
      return { label: 'Connectez-vous pour prendre le micro', icon: <LogIn /> };
    if (iAmThePublisher)
      // should be first because user can be in the queue and the publisher at the same time
      return {
        label: 'Appuie ici et balance tes meilleures punchlines !',
        icon: <Mic2 />,
      };
    if (!iAmInTheQueue)
      return { label: "Rejoindre la file d'attente", icon: <ListPlus /> };
    if (iAmInTheQueue)
      return { label: "Se retirer de la file d'attente", icon: <ListX /> };

    return { label: '', icon: null };
  }, [iAmInTheQueue, iAmThePublisher, authenticated]);

  const handleClick = async () => {
    if (!authenticated) {
      router.push('/login');
      return;
    }

    if (currentParticipant.localParticipant?.lastMicrophoneError) {
      console.log('you have to enable your mic before entering the queue');
      return;
    }

    if (iAmThePublisher) {
      await onPublishingClick();
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
      disabled={!micPermissionEnabled}
    >
      {button.label}
    </Button>
  );
}
