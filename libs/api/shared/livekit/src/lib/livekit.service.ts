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

  async createRoom(roomName: string) {
    const room = await this.roomServiceClient.createRoom({
      name: roomName,
      metadata: JSON.stringify({
        createdAt: new Date().getTime(),
      }),
    });

    return room;
  }

  async roomExists(roomName: string) {
    const rooms = await this.roomServiceClient.listRooms([roomName]);

    return rooms?.length > 0;
  }

  async createAccessToken(payload: {
    roomName: string;
    participantName?: string;
    userId?: string;
  }) {
    const roomExists = await this.roomExists(payload.roomName);

    if (!roomExists) {
      await this.createRoom(payload.roomName);
    }

    const at = new AccessToken(
      this.livekitConfig.apiKey,
      this.livekitConfig.apiSecret,
      {
        name: payload?.participantName || 'Anonymous',
        identity: uuidv4(),
        metadata: JSON.stringify({
          userId: payload?.userId || '',
        }),
      }
    );
    at.addGrant({
      roomJoin: true,
      room: payload.roomName,
      canSubscribe: true,
      canPublish: false,
      canPublishData: true,
    });

    return at.toJwt();
  }

  async getParticipants(roomName: string) {
    try {
      const participants = await this.roomServiceClient.listParticipants(
        roomName
      );

      return participants;
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  async getParticipant(roomName: string, identity: string) {
    const participant = await this.roomServiceClient.getParticipant(
      roomName,
      identity
    );

    return participant;
  }

  async updateParticipant(
    roomName: string,
    identity: string,
    metadata: Record<string, string>,
    permission: {
      canPublish: boolean;
      canSubscribe: boolean;
      canPublishData: boolean;
    }
  ) {
    const newParticipant = await this.roomServiceClient.updateParticipant(
      roomName,
      identity,
      JSON.stringify(metadata),
      permission
    );

    return newParticipant;
  }
}
