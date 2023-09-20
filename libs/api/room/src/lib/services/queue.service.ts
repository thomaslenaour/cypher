import { Injectable } from '@nestjs/common';

import { LivekitService } from '@cypher/api/shared/livekit';

import { RoomRepository } from '../room.repository';

@Injectable()
export class RoomQueueService {
  constructor(
    private readonly livekitService: LivekitService,
    private readonly roomRepository: RoomRepository
  ) {}

  /**
   * This methods returns an array of participants in queue, sorted by joined at ASC
   * @param roomName The name of the Livekit room
   * @returns An array of participants in queue
   */
  async getParticipantsInQueue(roomName: string) {
    const participants = await this.livekitService.getParticipants(roomName);
    const participantsInQueue = participants?.filter((participant) => {
      const participantMetadata = participant?.metadata
        ? JSON.parse(participant.metadata)
        : undefined;

      return !!participantMetadata?.inQueueAt;
    });

    participantsInQueue?.sort((a, b) => {
      if (a.metadata && b.metadata) {
        const aMetadata = JSON.parse(a.metadata);
        const bMetadata = JSON.parse(b.metadata);

        return aMetadata.inQueueAt - bMetadata.inQueueAt;
      }
      return 0;
    });

    return participantsInQueue;
  }
}
