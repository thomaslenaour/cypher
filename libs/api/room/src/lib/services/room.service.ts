import { Injectable } from '@nestjs/common';
import { LivekitService } from '@cypher/api/shared/livekit';

import { RoomRepository } from '../room.repository';
import { RoomQueueService } from './queue.service';
import { UserProfileService } from '@cypher/api/user-profile';

interface StartStopPublishingPayload {
  userId: string;
  identity: string;
  roomId: string;
}

@Injectable()
export class RoomService {
  constructor(
    private readonly livekitService: LivekitService,
    private readonly roomRepository: RoomRepository,
    private readonly roomQueueService: RoomQueueService,
    private readonly userProfileService: UserProfileService
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

    const userProfile = userId
      ? await this.userProfileService.getUserProfile('userId', userId)
      : null;

    const at = this.livekitService.createAccessToken({
      roomName: `${roomId}`,
      participantName: userProfile ? userProfile?.pseudo : 'Anonymous',
      userId,
    });

    return at;
  }

  async getRooms() {
    return this.roomRepository.getRooms();
  }

  async getParticipantsNumber(roomName: string) {
    const roomExists = await this.livekitService.roomExists(roomName);
    if (!roomExists) return 0;

    const participants = await this.livekitService.getParticipants(roomName);
    return participants?.length || 0;
  }

  async startPublishing({
    userId,
    identity,
    roomId,
  }: StartStopPublishingPayload) {
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

    const participantsInQueue =
      await this.roomQueueService.getParticipantsInQueue(roomId);
    const canPublish =
      participant?.identity === participantsInQueue[0]?.identity;
    if (canPublish) {
      const newMetadata = {
        ...currentParticipantMetadata,
        startPublishAt: new Date().getTime(),
      };
      await this.livekitService.updateParticipant(
        roomId,
        identity,
        newMetadata,
        {
          canPublish: true,
          canSubscribe: true,
          canPublishData: true,
          canUpdateMetadata: true,
        }
      );
    }

    return canPublish;
  }

  async stopPublishing({
    userId,
    identity,
    roomId,
  }: StartStopPublishingPayload) {
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
      startPublishAt: null,
      inQueueAt: null,
      canPublishAt: null,
    };

    const p = await this.livekitService.updateParticipant(
      roomId,
      identity,
      newMetadata,
      {
        canPublish: false,
        canSubscribe: true,
        canPublishData: true,
        canUpdateMetadata: true,
      }
    );

    return p;
  }
}
