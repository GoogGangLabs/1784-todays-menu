import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import NotificationService from '@service/notification.service';

@Injectable()
class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Cron('0 30-59 11 * * 1-5')
  async monitLaunch() {
    await this.notificationService.monit('launch');
  }

  @Cron('0 0-30 18 * * 1-5')
  async monitDinner() {
    await this.notificationService.monit('dinner');
  }
}

export default NotificationController;
