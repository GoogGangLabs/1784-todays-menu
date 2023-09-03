import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import PostEntity from '@entity/post.entity';

@Entity('photos')
class PhotoEntity {
  @PrimaryColumn('varchar')
  id: string;

  @Column('varchar', { name: 'post_id' })
  postId: string;

  @Column('varchar')
  url: string;

  @Column('varchar')
  filename: string;

  @Column('int')
  width: number;

  @Column('int')
  height: number;

  @Column('bigint')
  timestamp: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => PostEntity, (postEntity) => postEntity.photoEntities, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'post_id', referencedColumnName: 'id', foreignKeyConstraintName: 'fk_photos_post_id' })
  postEntity: PostEntity;
}

export default PhotoEntity;
