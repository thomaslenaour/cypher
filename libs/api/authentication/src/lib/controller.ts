import { Controller, Get, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from './guards';

@Controller()
export class TestController {
  @UseGuards(JwtAuthGuard)
  @Get('test')
  async test() {
    return 'test';
  }
}
