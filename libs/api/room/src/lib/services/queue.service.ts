import { Injectable } from '@nestjs/common';

import { LivekitService } from '@cypher/api/shared/livekit';

import { RoomRepository } from '../room.repository';

@Injectable()
export class RoomQueueService {
  constructor(
    private readonly livekitService: LivekitService,
    private readonly roomRepository: RoomRepository
  ) {}

  async toggleMyselfFromQueue({
    roomId,
    identity,
    userId,
  }: {
    roomId: string;
    identity: string;
    userId: string;
  }) {
    const room = await this.roomRepository.getRoom(roomId);

    if (!room) {
      throw new Error('No room found with given id');
    }

    const participant = await this.livekitService.getParticipant(
      roomId,
      identity
    );
    const currentParticipantMetadata = participant?.metadata
      ? JSON.parse(participant.metadata)
      : {};

    if (!participant) {
      throw new Error('No participant found with given identity');
    }

    const isAllowed = currentParticipantMetadata?.userId === userId;

    if (!isAllowed) {
      throw new Error('You are not allowed to toggle this participant');
    }

    const newMetadata = {
      ...currentParticipantMetadata,
      inQueueAt: currentParticipantMetadata?.inQueueAt
        ? null
        : new Date().getTime(),
    };

    return await this.livekitService.updateParticipant(
      roomId,
      identity,
      newMetadata,
      { canPublish: false, canPublishData: true, canSubscribe: true }
    );
  }

  /**
   * This methods returns an array of participants in queue, sorted by joined at ASC
   * @param roomName The name of the Livekit room
   * @returns An array of participants in queue
   */
  async getParticipantsInQueue(roomName: string) {
    const participants = await this.livekitService.getParticipants(roomName);
    const participantsInQueue = participants?.filter((participant) => {
      const participantMetadata = JSON.parse(participant.metadata);

      return participantMetadata?.inQueueAt;
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
