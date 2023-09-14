import { LivekitMetadata } from '@cypher/shared/types';
import { LocalParticipant, RemoteParticipant } from 'livekit-client';

export function getParticipantsInQueue(
  participants: (LocalParticipant | RemoteParticipant)[]
) {
  return participants.filter((participant) => {
    if (participant?.metadata) {
      const parsedMetadata = JSON.parse(
        participant.metadata
      ) as LivekitMetadata;
      return !!parsedMetadata?.inQueueAt;
    }

    return false;
  });
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
