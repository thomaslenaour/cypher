import { Module } from '@nestjs/common';

import { LivekitService } from './livekit.service';

@Module({
  providers: [LivekitService],
  exports: [LivekitService],
})
export class LivekitModule {}
