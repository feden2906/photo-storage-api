import { Controller, Get } from '@nestjs/common';

import { SkipAuth } from '../../common/decorators';

@SkipAuth()
@Controller('health')
export class HealthController {
  @Get()
  checkHealthHeartbeat(): string {
    return 'Healthy';
  }
}
