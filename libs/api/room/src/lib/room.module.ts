import { Module } from '@nestjs/common';
import { LivekitModule } from '@cypher/api/shared/livekit';

import { RoomResolver } from './room.resolver';
import { RoomService } from './room.service';
import { RoomRepository } from './room.repository';

@Module({
  imports: [LivekitModule],
  providers: [RoomResolver, RoomService, RoomRepository],
})
export class RoomModule {}
