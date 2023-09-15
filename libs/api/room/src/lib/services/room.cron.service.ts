import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { RoomService } from './room.service';
import { RoomRepository } from '../room.repository';
import { LivekitService } from '@cypher/api/shared/livekit';

@Injectable()
export class RoomCronService {
  constructor(
    private readonly roomService: RoomService,
    private readonly roomRepository: RoomRepository,
    private readonly livekitService: LivekitService
  ) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleCron() {
    const rooms = await this.roomRepository.getRooms();

    await Promise.all(
      rooms.map(async (room) => {
        const roomExists = await this.livekitService.roomExists(room.id);
        if (!roomExists) return;

        try {
          await this.roomService.defineCurrentPublisher({ roomId: room.id });
        } catch (err) {
          console.error(err);
        }
      })
    );
  }
}
