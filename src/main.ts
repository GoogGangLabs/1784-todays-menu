import { NestFactory } from '@nestjs/core';

import Environ from '@config/environment';
import AppModule from '@module/app.module';

(async () => {
  const app = await NestFactory.create(AppModule);
  const port = Environ.SERVER_PORT;

  await app.listen(port, () => {
    console.log(`======= NODE ENV: ${Environ.NODE_ENV} =======`);
    console.log(`🚀 App listening on the port ${port}`);
    console.log(`🚀 1784-meal Server launched`);
  });
})();
