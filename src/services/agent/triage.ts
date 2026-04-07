import { MessageLog, TriageResult } from '@/types/nexus';

const urgentWords = ['asap', 'urgent', 'blocker', 'immediately', 'before', 'today'];
const followUpWords = ['follow up', 'following up', 'checking in', 'reminder', 'yesterday'];
const salesWords = ['partnership', 'budget', 'proposal', 'collaboration', 'pricing'];
const spamWords = ['double your returns', 'guaranteed', 'limited slots', 'win now'];

function includesAny(source: string, words: string[]) {
  return words.some((word) => source.includes(word));
}

function detectLanguage(text: string): TriageResult['language'] {
  const lower = text.toLowerCase();

  if (lower.includes('hola') || lower.includes('gracias') || lower.includes('propuesta')) {
    return 'es';
  }

  if (lower.includes('bonjour') || lower.includes('merci')) {
    return 'fr';
  }

  if (lower.includes('janab') || lower.includes('shukriya')) {
    return 'ur';
  }

  return 'en';
}

function detectTone(text: string): TriageResult['tone'] {
  const lower = text.toLowerCase();

  if (lower.includes('please') || lower.includes('thanks') || lower.includes('appreciate')) {
    return 'formal';
  }

  if (text.includes('!') || lower.includes('hey')) {
    return 'friendly';
  }

  return 'direct';
}

export function analyzeMessage(message: MessageLog): TriageResult {
  const source = `${message.subject ?? ''} ${message.preview}`.toLowerCase();
  let category: TriageResult['category'] = 'Casual';
  let urgencyScore = 35;

  if (includesAny(source, spamWords)) {
    category = 'Spam';
    urgencyScore = 0;
  } else if (includesAny(source, urgentWords) || (message.responseDueMinutes ?? 9999) < 60) {
    category = 'Urgent';
    urgencyScore = 94;
  } else if (includesAny(source, salesWords)) {
    category = 'Sales';
    urgencyScore = 64;
  } else if (includesAny(source, followUpWords) || message.firstContact) {
    category = 'Follow-Up';
    urgencyScore = 58;
  }

  const language = detectLanguage(source);
  const tone = detectTone(source);
  const shouldPrompt = category === 'Urgent' || message.firstContact;
  const summary = `${message.senderName} on ${message.platform.toUpperCase()} needs ${
    category === 'Urgent' ? 'fast attention' : 'a guided reply'
  }.`;

  return {
    category,
    tone,
    language,
    urgencyScore,
    shouldPrompt,
    summary,
  };
}

