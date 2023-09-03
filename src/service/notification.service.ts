import { Injectable } from '@nestjs/common';
import axios from 'axios';

import PostRepository from '@repository/post.repository';
import { DailyPostType } from '@domain/band.post.dto';
import SlackStrategy from '@strategy/slack.strategy';
import PhotoEntity from '@entity/photo.entity';
import TimeStrategy from '@strategy/time.strategy';

interface FormatMessageConfigurations {
  content: string;
  date: Date;
  type: DailyPostType;
  sequence: number;
}

@Injectable()
class NotificationService {
  constructor(private readonly postRepository: PostRepository) {}

  public monit = async (type: DailyPostType) => {
    const weeklyPost = await this.postRepository.findJoinLatestPostByPostType('weekly');
    const dailyPost = await this.postRepository.findLatestPostByDailyPostType(type);

    if (dailyPost === null) return;

    const content = this.formatMessage({
      content: dailyPost.content,
      date: TimeStrategy.getDate(parseInt(dailyPost.timestamp, 10)),
      type: dailyPost.dailyPostType,
      sequence: parseInt(dailyPost.sequence, 10),
    });
    const weeklyMealPhotos = weeklyPost.photoEntities[0];
    const dailyMealCount = dailyPost.photoEntities.length === 4 ? 2 : 1;
    const dailyNutritionPhotos = dailyPost.photoEntities.splice(dailyMealCount);
    const dailyMealPhotos = dailyPost.photoEntities.splice(0, dailyMealCount);
    const dailyMealFilePayload = await Promise.all(dailyMealPhotos.map(async (photo) => await this.formatFile(photo)));
    const dailyInfoFilePayload = await Promise.all([
      this.formatFile(weeklyMealPhotos),
      ...dailyNutritionPhotos.map((photo) => this.formatFile(photo)),
    ]);

    const fileId = await SlackStrategy.sendFile(content, dailyMealFilePayload);
    const threadId = await SlackStrategy.findLatestUserMessageId(fileId);
    await SlackStrategy.sendFile(
      `주간 식단표 및 ${dailyPost.dailyPostType === 'launch' ? '중식' : '석식'} 영양표입니다. :)\n\n` +
        '테이크아웃 영양성분표는 고정게시글을 참고해주세요!\n\nhttps://band.us/band/47113445/post/926901116',
      dailyInfoFilePayload,
      threadId,
    );

    await this.postRepository.updateNotifiedById(dailyPost.id);
  };

  private formatFile = async (photo: PhotoEntity) => {
    const response = await axios.get(photo.url, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data, 'binary');

    return { file: buffer, filename: photo.filename };
  };

  private formatMessage = (config: FormatMessageConfigurations): string => {
    return (
      `${TimeStrategy.prettier(config.type, config.date)} 알림 <!channel>\n\n` +
      config.content
        .replace(/&amp;/g, '&')
        .split('\n')
        .map((line, idx) => {
          const newLine = line.trim();
          const isSection = /^\[.*\]$/.test(newLine);
          return (isSection && idx > 0 ? '\n' : '') + newLine;
        })
        .filter((line) => line !== '')
        .join('\n') +
      `\n\n[밴드 바로가기]\nhttps://band.us/band/47113445/post/${config.sequence}`
    );
  };
}

export default NotificationService;
