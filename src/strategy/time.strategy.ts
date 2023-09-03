import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import { DailyPostType } from '@domain/band.post.dto';

const TIME_ZOME = 'Asia/Seoul';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault(TIME_ZOME);

interface CleanTimeOptions {
  input?: dayjs.ConfigType;
  time?: number[];
}

class TimeStrategy {
  public static getDate = (input?: dayjs.ConfigType): Date => new Date(dayjs(input).tz().format());

  public static getTime = (input?: dayjs.ConfigType): number => this.getDate(input).getTime();

  public static getCleanTime = (option?: CleanTimeOptions): number => {
    const date = this.getDate(option ? option.input : undefined);
    const timeLabel = [60 * 60 * 1000, 60 * 1000, 1000, 1];
    let additionalTime = 0;

    for (let i = 0; option && option.time && i < option.time.length; i++) {
      additionalTime += option.time[i] * timeLabel[i];
    }

    date.setHours(0, 0, 0, 0);
    return date.getTime() + additionalTime;
  };

  public static getHours = (input?: dayjs.ConfigType): number => this.getDate(input).getHours();

  public static prettier = (type: DailyPostType, input?: dayjs.ConfigType) => {
    const week = ['월', '화', '수', '목', '금', '토', '일'];
    const source = !input ? this.getTime() : this.getTime(input);
    const date = new Date(source);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const today = new Date(`${year}-${month + 1}-${day}`).getDay();
    const weekLabel = week[today ? today - 1 : 6];

    return `${month + 1}월 ${day}일(${weekLabel}) ${type === 'launch' ? '중식' : '석식'}`;
  };
}

export default TimeStrategy;
