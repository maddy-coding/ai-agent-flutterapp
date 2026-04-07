import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

export class MessageLogModel extends Model {
  static table = 'message_logs';

  @field('platform') declare platform: string;
  @field('sender_name') declare senderName: string;
  @field('preview') declare preview: string;
  @field('triage_category') declare triageCategory: string;
  @field('summary') declare summary: string;
  @field('received_at') declare receivedAt: number;
}

