import { Module } from '@nestjs/common';

import PostRepository from '@repository/post.repository';
import PhotoRepository from '@repository/photo.repository';
import CommentRepository from '@repository/comment.repository';

@Module({
  providers: [PostRepository, PhotoRepository, CommentRepository],
  exports: [PostRepository, PhotoRepository, CommentRepository],
})
class RepositoryModule {}

export default RepositoryModule;
