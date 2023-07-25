import { Injectable, OnModuleInit } from '@nestjs/common';
import { AccessToken, RoomServiceClient } from 'livekit-server-sdk';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';

import { LivekitConfiguration } from '@cypher/api/core';

@Injectable()
export class LivekitService implements OnModuleInit {
  private livekitConfig!: LivekitConfiguration;
  private roomServiceClient!: RoomServiceClient;

  constructor(private readonly configService: ConfigService) {
    const livekitConfiguration =
      this.configService.get<LivekitConfiguration>('providers.livekit');

    if (!livekitConfiguration) {
      throw new Error('Livekit configuration not found');
    }

    this.livekitConfig = livekitConfiguration;
  }

  onModuleInit() {
    this.roomServiceClient = new RoomServiceClient(
      this.livekitConfig.host,
      this.livekitConfig.apiKey,
      this.livekitConfig.apiSecret
    );
  }

  createAccessToken(payload: {
    roomName: string;
    participantName?: string;
    userId?: string;
  }) {
    const at = new AccessToken(
      this.livekitConfig.apiKey,
      this.livekitConfig.apiSecret,
      {
        name: payload.participantName || 'Anonymous',
        identity: uuidv4(),
        metadata: JSON.stringify({
          userId: payload?.userId || '',
        }),
      }
    );
    at.addGrant({ roomJoin: true, room: payload.roomName, canPublish: false });

    return at.toJwt();
  }

  async getParticipants(roomName: string) {
    const participants = await this.roomServiceClient.listParticipants(
      roomName
    );

    return participants;
  }

  async getParticipant(roomName: string, identity: string) {
    const participant = await this.roomServiceClient.getParticipant(
      roomName,
      identity
    );

    return participant;
  }

  async addParticipantToQueue(
    roomName: string,
    identity: string,
    previousMetadata?: Record<string, string>
  ) {
    const participant = await this.roomServiceClient.updateParticipant(
      roomName,
      identity,
      JSON.stringify({
        ...previousMetadata,
        inQueueAt: new Date().toISOString(),
      })
    );

    return participant;
  }

  async removeParticipantFromQueue(
    roomName: string,
    identity: string,
    previousMetadata?: Record<string, string>
  ) {
    const participant = await this.roomServiceClient.updateParticipant(
      roomName,
      identity,
      JSON.stringify({
        ...previousMetadata,
        inQueueAt: null,
      })
    );

    return participant;
  }
}
