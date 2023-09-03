import { Injectable, OnModuleInit } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import Environ from '@config/environment';
import ScrapService from '@service/scrap.service';

@Injectable()
class ScrapController implements OnModuleInit {
  constructor(private readonly scrapService: ScrapService) {}

  async onModuleInit() {
    await this.scrapService.update({ sequence: Environ.BAND_FIRST_POST_ID });
  }

  @Cron('0 * 11 * * 1-5')
  async scrapLaunch() {
    await this.scrapService.update({ type: 'launch' });
  }

  @Cron('0 * 17,18 * * 1-5')
  async scrapDinner() {
    await this.scrapService.update({ type: 'dinner' });
  }
}

export default ScrapController;
