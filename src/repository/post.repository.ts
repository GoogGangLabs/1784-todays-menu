import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import TimeStrategy from '@strategy/time.strategy';
import PostEntity from '@entity/post.entity';
import { BandPostDto, DailyPostType, PostType } from '@domain/band.post.dto';

@Injectable()
class PostRepository extends Repository<PostEntity> {
  constructor(private dataSource: DataSource) {
    super(PostEntity, dataSource.createEntityManager());
  }

  public findLatestPost = async (type?: PostType) => {
    const query = this.createQueryBuilder('posts').select().orderBy('posts.timestamp', 'DESC');
    if (type !== undefined) query.where('posts.post_type = :type', { type });
    return await query.getOne();
  };

  public findJoinLatestPostByPostType = async (type?: PostType) => {
    const query = this.createQueryBuilder('posts')
      .select()
      .leftJoinAndSelect('posts.photoEntities', 'photos')
      .leftJoinAndSelect('posts.commentEntities', 'comments')
      .orderBy('posts.timestamp', 'DESC')
      .addOrderBy('photos.timestamp', 'ASC')
      .addOrderBy('comments.timestamp', 'ASC');
    if (type !== undefined) query.where('posts.post_type = :type', { type });
    return await query.getOne();
  };

  public findLatestPostByDailyPostType = async (
    type: DailyPostType,
    cleanTime = TimeStrategy.getCleanTime(),
  ): Promise<PostEntity | null> => {
    return await this.createQueryBuilder('posts')
      .select()
      .leftJoinAndSelect('posts.photoEntities', 'photos')
      .leftJoinAndSelect('posts.commentEntities', 'comments')
      .where('posts.daily_post_type = :type', { type })
      .andWhere('posts.is_notified = 0')
      .andWhere('posts.timestamp > :cleanTime', { cleanTime })
      .orderBy('posts.timestamp', 'DESC')
      .addOrderBy('photos.timestamp', 'ASC')
      .addOrderBy('comments.timestamp', 'ASC')
      .getOne();
  };

  public createByDto = async (post: BandPostDto) => {
    await this.createQueryBuilder('posts')
      .insert()
      .into(PostEntity)
      .values({
        id: post.id,
        sequence: post.sequence.toString(),
        postType: post.postType,
        dailyPostType: post.dailyPostType,
        content: post.content.replace(/[\t\r\f\v]/g, ''),
        timestamp: post.createdAt.toString(),
      })
      .execute();
  };

  public updateNotifiedById = async (id: string) => {
    await this.createQueryBuilder('posts')
      .update(PostEntity)
      .set({ isNotified: true })
      .where('posts.id = :id', { id })
      .execute();
  };
}

export default PostRepository;
