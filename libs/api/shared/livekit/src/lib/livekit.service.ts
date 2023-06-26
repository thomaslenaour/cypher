import { Injectable, OnModuleInit } from '@nestjs/common';
import { AccessToken, RoomServiceClient } from 'livekit-server-sdk';
import { ConfigService } from '@nestjs/config';

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

  createAccessToken(payload: { roomName: string; participantName?: string }) {
    const at = new AccessToken(
      this.livekitConfig.apiKey,
      this.livekitConfig.apiSecret,
      {
        name: payload.participantName || 'Anonymous',
        identity: payload.participantName,
      }
    );
    at.addGrant({ roomJoin: true, room: payload.roomName, canPublish: false });

    return at.toJwt();
  }
}
