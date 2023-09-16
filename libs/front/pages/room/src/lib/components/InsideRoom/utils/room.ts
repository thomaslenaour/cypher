import { LivekitMetadata } from '@cypher/shared/types';
import { LocalParticipant, RemoteParticipant } from 'livekit-client';

export function getParticipantsInQueue(
  participants: (LocalParticipant | RemoteParticipant)[]
) {
  const filteredParticipants = participants?.filter((participant) => {
    if (participant?.metadata) {
      const parsedMetadata = JSON.parse(
        participant.metadata
      ) as LivekitMetadata;
      const isInQueue = !!parsedMetadata?.inQueueAt;
      const isPublishing = !!parsedMetadata?.startPublishAt;
      return isInQueue && !isPublishing;
    }

    return false;
  });

  const sortedParticipants = filteredParticipants?.sort((a, b) => {
    if (a.metadata && b.metadata) {
      const aMetadata = JSON.parse(a.metadata);
      const bMetadata = JSON.parse(b.metadata);

      return aMetadata.inQueueAt - bMetadata.inQueueAt;
    }
    return 0;
  });

  return sortedParticipants || [];
}

export function getCurrentPublisher(
  participants: (LocalParticipant | RemoteParticipant)[]
) {
  const publisher = participants.find((participant) => {
    if (participant?.metadata) {
      const parsedMetadata = JSON.parse(participant.metadata);
      return parsedMetadata?.canPublishAt;
    }
    return false;
  });

  return publisher;
}
