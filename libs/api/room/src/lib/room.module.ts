import { Module } from '@nestjs/common';
import { LivekitModule } from '@cypher/api/shared/livekit';

import { RoomResolver } from './room.resolver';
import { RoomService } from './services/room.service';
import { RoomQueueService } from './services/queue.service';
import { RoomRepository } from './room.repository';
import { RoomCronService } from './services/room.cron.service';

@Module({
  imports: [LivekitModule],
  providers: [
    RoomResolver,
    RoomService,
    RoomRepository,
    RoomQueueService,
    RoomCronService,
  ],
})
export class RoomModule {}
