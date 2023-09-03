import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm';

import PhotoEntity from '@entity/photo.entity';
import CommentEntity from '@entity/comment.entity';
import { DailyPostType, PostType } from '@domain/band.post.dto';

@Entity('posts')
class PostEntity {
  @PrimaryColumn('varchar')
  id: string;

  @Column('bigint')
  sequence: string;

  @Column('varchar', { name: 'post_type' })
  postType: PostType;

  @Column('varchar', { name: 'daily_post_type', nullable: true })
  dailyPostType?: DailyPostType;

  @Column('tinyint', { name: 'is_notified', default: false })
  isNotified: boolean;

  @Column('text')
  content: string;

  @Column('bigint')
  timestamp: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => PhotoEntity, (photoEntity) => photoEntity.postEntity, { cascade: true })
  photoEntities: PhotoEntity[];

  @OneToMany(() => CommentEntity, (photoEntity) => photoEntity.postEntity, { cascade: true })
  commentEntities: CommentEntity[];
}

export default PostEntity;
