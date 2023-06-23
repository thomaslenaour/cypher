import { Injectable } from '@nestjs/common';
import { LivekitService } from '@cypher/api/shared/livekit';

@Injectable()
export class RoomService {
  constructor(private readonly livekitService: LivekitService) {}

  getRoomAccessToken({ roomId }: { roomId: string }) {
    // @TODO: get room name

    const at = this.livekitService.createAccessToken({
      roomName: `${roomId}`,
      participantName: 'test',
    });

    return at;
  }
}
