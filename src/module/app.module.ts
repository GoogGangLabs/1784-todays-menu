import { Module } from '@nestjs/common';

import ControllerModule from '@module/controller.module';
import ServiceModule from '@module/service.module';
import RepositoryModule from '@module/repository.module';

@Module({
  imports: [ControllerModule, ServiceModule, RepositoryModule],
})
class AppModule {}

export default AppModule;
