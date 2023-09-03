import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import PostEntity from '@entity/post.entity';

@Entity('comments')
class CommentEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: string;

  @Column('varchar', { name: 'post_id' })
  postId: string;

  @Column('varchar')
  content: string;

  @Column('bigint')
  timestamp: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => PostEntity, (postEntity) => postEntity.photoEntities, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'post_id', referencedColumnName: 'id', foreignKeyConstraintName: 'fk_comments_post_id' })
  postEntity: PostEntity;
}

export default CommentEntity;
