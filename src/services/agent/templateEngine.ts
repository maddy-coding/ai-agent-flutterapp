import { MessageLog, Template } from '@/types/nexus';

export function applyTemplate(template: Template, message: MessageLog) {
  const fallbackSubject = message.subject ?? message.preview.slice(0, 28);
  const currentTime = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return template.content
    .replaceAll('{{sender_name}}', message.senderName)
    .replaceAll('{{original_subject}}', fallbackSubject)
    .replaceAll('{{current_time}}', currentTime);
}

