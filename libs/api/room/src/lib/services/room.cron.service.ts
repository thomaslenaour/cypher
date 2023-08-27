import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { RoomService } from './room.service';
import { RoomRepository } from '../room.repository';

@Injectable()
export class RoomCronService {
  constructor(
    private readonly roomService: RoomService,
    private readonly roomRepository: RoomRepository
  ) {}

  @Cron('*/10 * * * * *')
  async handleCron() {
    const rooms = await this.roomRepository.getRooms();

    await Promise.all(
      rooms.map(async (room) => {
        await this.roomService.defineCurrentPublisher({ roomId: room.id });
      })
    );
  }
}
