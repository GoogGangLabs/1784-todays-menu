import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import ServiceModule from '@module/service.module';
import ScrapController from '@controller/scrap.controller';
import NotificationController from '@controller/notification.contoller';

@Module({
  imports: [ScheduleModule.forRoot(), ServiceModule],
  providers: [ScrapController, NotificationController],
})
class ControllerModule {}

export default ControllerModule;
