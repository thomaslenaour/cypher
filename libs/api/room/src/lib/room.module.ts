import { Module } from '@nestjs/common';
import { LivekitModule } from '@cypher/api/shared/livekit';

import { RoomResolver } from './room.resolver';
import { RoomService } from './room.service';

@Module({
  imports: [LivekitModule],
  providers: [RoomResolver, RoomService],
})
export class RoomModule {}
