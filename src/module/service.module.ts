import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';

import RepositoryModule from '@module/repository.module';
import LogStrategy from '@strategy/log.strategy';
import TypeOrmService from '@service/typorm.service';
import ScrapService from '@service/scrap.service';
import NotificationService from '@service/notification.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmService,
      dataSourceFactory: async (options?: DataSourceOptions): Promise<DataSource> => {
        if (!options) LogStrategy.error('TypeOrmModule', 'TypeOrmModuleOptions must be set to Mandatory.', true);
        return await new DataSource(options).initialize();
      },
    }),
    RepositoryModule,
  ],
  providers: [ScrapService, NotificationService],
  exports: [ScrapService, NotificationService],
})
class ServiceModule {}

export default ServiceModule;
