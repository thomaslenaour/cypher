import { Injectable } from '@nestjs/common';
import { LivekitService } from '@cypher/api/shared/livekit';

import { RoomRepository } from '../room.repository';
import { RoomQueueService } from './queue.service';

interface StartPublishingPayload {
  userId: string;
  identity: string;
  roomId: string;
}

@Injectable()
export class RoomService {
  constructor(
    private readonly livekitService: LivekitService,
    private readonly roomRepository: RoomRepository,
    private readonly roomQueueService: RoomQueueService
  ) {}

  async getRoomAccessToken({
    roomId,
    userId,
  }: {
    roomId: string;
    userId?: string;
  }) {
    const room = await this.roomRepository.getRoom(roomId);

    if (!room) {
      throw new Error('No room found with given id');
    }

    const at = this.livekitService.createAccessToken({
      roomName: `${roomId}`,
      participantName: userId ? 'Fecthed Participant name' : '',
      userId,
    });

    console.log('at', at);

    return at;
  }

  async getRooms() {
    return this.roomRepository.getRooms();
  }

  async getParticipantsNumber(roomName: string) {
    const participants = await this.livekitService.getParticipants(roomName);

    return participants?.length || 0;
  }

  async defineCurrentPublisher({ roomId }: { roomId: string }) {
    const room = await this.roomRepository.getRoom(roomId);

    if (!room) {
      throw new Error('No room found with given id');
    }

    const participantsInQueue =
      await this.roomQueueService.getParticipantsInQueue(room.id);
    if (!participantsInQueue?.length) return false;

    const currentPublisher = participantsInQueue.find((participant) => {
      const metadata = JSON.parse(participant.metadata);
      return metadata?.canPublishAt;
    });

    if (currentPublisher) {
      const currentPublisherMetadata = JSON.parse(currentPublisher.metadata);
      if (currentPublisherMetadata?.startPublishAt) return;

      const canPublishTill = currentPublisherMetadata.canPublishAt + 60 * 1000;
      const now = new Date().getTime();
      if (now >= canPublishTill) {
        // remove current publisher from queue
        await this.livekitService.updateParticipant(
          room.id,
          currentPublisher.identity,
          { ...currentPublisherMetadata, canPublishAt: null, inQueueAt: null },
          { canPublish: false, canPublishData: true, canSubscribe: true }
        );

        return;
      }
    } else {
      const nextPublisher = participantsInQueue[0];
      const newMetadata = {
        ...JSON.parse(nextPublisher.metadata),
        canPublishAt: new Date().getTime(),
      };

      const p = await this.livekitService.updateParticipant(
        room.id,
        nextPublisher.identity,
        newMetadata,
        { canPublish: true, canSubscribe: true, canPublishData: true }
      );

      console.log('pppppp', p);
    }

    return;
  }

  async startPublishing({ userId, identity, roomId }: StartPublishingPayload) {
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

    const isAllowed =
      currentParticipantMetadata?.userId === userId &&
      participant.permission?.canPublish;
    if (!isAllowed) {
      throw new Error('You are not allowed to toggle this participant');
    }

    const newMetadata = {
      ...currentParticipantMetadata,
      startPublishAt: new Date().getTime(),
    };

    const p = await this.livekitService.updateParticipant(
      roomId,
      identity,
      newMetadata,
      { canPublish: true, canSubscribe: true, canPublishData: true }
    );

    console.log('startpublishing p', p);

    return p;
  }
}
