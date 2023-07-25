import { Injectable } from '@nestjs/common';
import { LivekitService } from '@cypher/api/shared/livekit';

import { RoomRepository } from './room.repository';

@Injectable()
export class RoomService {
  constructor(
    private readonly livekitService: LivekitService,
    private readonly roomRepository: RoomRepository
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

    return at;
  }

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

    const participantMetadata = JSON.parse(participant.metadata);
    const isAllowed = participantMetadata?.userId === userId;

    if (!isAllowed) {
      throw new Error('You are not allowed to toggle this participant');
    }

    const isParticipantInQueue = participantMetadata?.inQueueAt;

    return isParticipantInQueue
      ? await this.livekitService.removeParticipantFromQueue(
          roomId,
          identity,
          currentParticipantMetadata
        )
      : await this.livekitService.addParticipantToQueue(
          roomId,
          identity,
          currentParticipantMetadata
        );
  }

  async getRooms() {
    return this.roomRepository.getRooms();
  }

  async getParticipantsNumber(roomName: string) {
    const participants = await this.livekitService.getParticipants(roomName);

    return participants?.length || 0;
  }
}
