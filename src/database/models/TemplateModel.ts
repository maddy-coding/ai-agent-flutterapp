import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

export class TemplateModel extends Model {
  static table = 'templates';

  @field('name') declare name: string;
  @field('category') declare category: string;
  @field('tone') declare tone: string;
  @field('content') declare content: string;
  @field('variables_json') declare variablesJson: string;
}

