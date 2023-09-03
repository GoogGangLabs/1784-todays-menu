import { Injectable } from '@nestjs/common';

import PostRepository from '@repository/post.repository';
import PhotoRepository from '@repository/photo.repository';
import CommentRepository from '@repository/comment.repository';
import { BandPostConfigurations, BandPostDto, DailyPostType, PostType } from '@domain/band.post.dto';
import TimeStrategy from '@strategy/time.strategy';
import BandStrategy from '@strategy/band.strategy';

@Injectable()
class ScrapService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly photoRepository: PhotoRepository,
    private readonly commentRepository: CommentRepository,
  ) {}

  public update = async (config: BandPostConfigurations) => {
    if (config.type) {
      const isAlreadySaved = await this.checkSavedPost(config.type);
      if (isAlreadySaved) return;
    }

    const postList = await BandStrategy.getPostList();
    const latestPost = await this.postRepository.findLatestPost();
    let nextSequence = latestPost ? parseInt(latestPost.sequence, 10) + 1 : config.sequence;

    if (!nextSequence) throw new Error('Invalid post sequence');

    let sortedPostList = postList.sort((a, b) => a.createdAt - b.createdAt);
    if (latestPost !== null)
      sortedPostList = sortedPostList.filter((post) => post.createdAt > parseInt(latestPost.timestamp, 10));

    for (const post of sortedPostList) {
      post.sequence = nextSequence;
      post.postType = this.checkPostType(post);
      post.dailyPostType = this.checkDailyPostType(post);

      await this.savePost(post);
      nextSequence++;
    }
  };

  private checkSavedPost = async (type: DailyPostType): Promise<boolean> => {
    const cleanTime = TimeStrategy.getCleanTime({ time: [type === 'launch' ? 0 : 15] });
    return (await this.postRepository.findLatestPostByDailyPostType(type, cleanTime)) !== null;
  };

  private checkPostType = (post: BandPostDto): PostType => {
    if (
      /COURSE/.test(post.content) ||
      /COURSE1/.test(post.content) ||
      /COURSE2/.test(post.content) ||
      /샐러드바/.test(post.content)
    ) {
      return 'daily';
    } else if (
      post.content.includes('https://band.us/band/47113445/post/926901116') ||
      /주간식단표/.test(post.content) ||
      /주간메뉴표/.test(post.content) ||
      /영양성분표/.test(post.content) ||
      /테이크아웃/.test(post.content)
    ) {
      return 'weekly';
    } else {
      return 'other';
    }
  };

  private checkDailyPostType = (post: BandPostDto): DailyPostType => {
    const cleanTime = TimeStrategy.getCleanTime({ input: post.createdAt, time: [15] });
    if (post.postType !== 'daily') return undefined;
    else if (post.createdAt <= cleanTime) return 'launch';
    else return 'dinner';
  };

  private savePost = async (post: BandPostDto) => {
    await this.postRepository.createByDto(post);
    await this.photoRepository.createByDtoList(
      post.photos.sort((a, b) => a.createdAt - b.createdAt),
      post.id,
    );
    await this.commentRepository.createByDtoList(
      post.comments.sort((a, b) => a.createdAt - b.createdAt),
      post.id,
    );
  };
}

export default ScrapService;
