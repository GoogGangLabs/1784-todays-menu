import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import Environ from '@config/environment';
import PostEntity from '@entity/post.entity';
import PhotoEntity from '@entity/photo.entity';
import CommentEntity from '@entity/comment.entity';

@Injectable()
class TypeOrmService implements TypeOrmOptionsFactory {
  public createTypeOrmOptions = (): TypeOrmModuleOptions => ({
    type: 'mysql',
    host: Environ.MYSQL_HOST,
    port: Environ.MYSQL_PORT,
    database: Environ.MYSQL_DATABASE,
    username: Environ.MYSQL_USER,
    password: Environ.MYSQL_PASSWORD,
    synchronize: Environ.NODE_ENV === 'local',
    logging: Environ.NODE_ENV === 'local',
    entities: [PostEntity, PhotoEntity, CommentEntity],
    charset: 'utf8mb4',
    keepConnectionAlive: true,
  });
}

export default TypeOrmService;
