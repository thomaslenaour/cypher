import { Module } from '@nestjs/common';
import { LivekitModule } from '@cypher/api/shared/livekit';
import { UserProfileModule } from '@cypher/api/user-profile';

import { RoomResolver } from './room.resolver';
import { RoomService } from './services/room.service';
import { RoomQueueService } from './services/queue.service';
import { RoomRepository } from './room.repository';

@Module({
  imports: [LivekitModule, UserProfileModule],
  providers: [RoomResolver, RoomService, RoomRepository, RoomQueueService],
})
export class RoomModule {}
