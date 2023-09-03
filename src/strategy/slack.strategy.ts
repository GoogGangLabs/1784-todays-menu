import { WebClient, FileUploadV2 } from '@slack/web-api';

import Environ from '@config/environment';

class SlackStrategy {
  private static readonly client = new WebClient(Environ.SLACK_TOKEN);
  private static readonly channelId = Environ.SLACK_CHANNEL_ID;

  public static sendMessage = async (content: string, threadId?: string) => {
    await this.client.chat.postMessage({
      channel: this.channelId,
      text: content,
      thread_ts: threadId,
      mrkdwn: false,
    });
  };

  public static sendFile = async (content: string, files: FileUploadV2[], threadId?: string): Promise<string> => {
    return (
      await this.client.filesUploadV2({
        initial_comment: content,
        channel_id: this.channelId,
        file_uploads: files,
        thread_ts: threadId,
        request_file_info: true,
      })
    )['files'][0].file.id as string;
  };

  public static findLatestUserMessageId = async (fileId: string): Promise<string> => {
    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    return new Promise(async (resolve) => {
      for (let _ = 0; _ < 10; _++) {
        const histories = (await this.client.conversations.history({ channel: this.channelId })).messages;
        const message = histories.find((message) => {
          return message.files && message.files.findIndex((file) => file.id === fileId) !== -1;
        });

        if (message !== undefined) {
          resolve(message.ts);
          return;
        }

        await sleep(1000);
      }
    });
  };
}

export default SlackStrategy;
