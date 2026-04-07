import { appSchema, tableSchema } from '@nozbe/watermelondb';

export const nexusSchema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'templates',
      columns: [
        { name: 'name', type: 'string' },
        { name: 'category', type: 'string' },
        { name: 'tone', type: 'string' },
        { name: 'content', type: 'string' },
        { name: 'variables_json', type: 'string' },
      ],
    }),
    tableSchema({
      name: 'message_logs',
      columns: [
        { name: 'platform', type: 'string' },
        { name: 'sender_name', type: 'string' },
        { name: 'preview', type: 'string' },
        { name: 'triage_category', type: 'string' },
        { name: 'summary', type: 'string' },
        { name: 'received_at', type: 'number' },
      ],
    }),
  ],
});

