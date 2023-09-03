import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import CommentEntity from '@entity/comment.entity';
import { BandCommentDto } from '@domain/band.post.dto';

@Injectable()
class CommentRepository extends Repository<CommentEntity> {
  constructor(private dataSource: DataSource) {
    super(CommentEntity, dataSource.createEntityManager());
  }

  public createByDto = async (comment: BandCommentDto, postId: string) => {
    await this.createQueryBuilder('photos')
      .insert()
      .into(CommentEntity)
      .values({
        postId: postId,
        content: comment.content,
        timestamp: comment.createdAt.toString(),
      })
      .execute();
  };

  public createByDtoList = async (commentList: BandCommentDto[], postId: string) => {
    for (const comment of commentList) await this.createByDto(comment, postId);
  };
}

export default CommentRepository;
