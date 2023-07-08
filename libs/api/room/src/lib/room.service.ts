import { Injectable } from '@nestjs/common';
import { LivekitService } from '@cypher/api/shared/livekit';

import { RoomRepository } from './room.repository';

@Injectable()
export class RoomService {
  constructor(
    private readonly livekitService: LivekitService,
    private readonly roomRepository: RoomRepository
  ) {}

  async getRoomAccessToken({ roomId }: { roomId: string }) {
    const room = await this.roomRepository.getRoom(roomId);

    if (!room) {
      throw new Error('No room found with given id');
    }

    const at = this.livekitService.createAccessToken({
      roomName: `${roomId}`,
      participantName: 'test',
    });

    return at;
  }

  async getRooms() {
    return this.roomRepository.getRooms();
  }

  async getParticipantsNumber(roomName: string) {
    const participants = await this.livekitService.getParticipants(roomName);

    return participants?.length || 0;
  }
}
