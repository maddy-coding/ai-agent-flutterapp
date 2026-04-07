export type PlatformId =
  | 'gmail'
  | 'outlook'
  | 'whatsapp'
  | 'instagram'
  | 'facebook'
  | 'x';

export type TriageCategory =
  | 'Urgent'
  | 'Follow-Up'
  | 'Casual'
  | 'Sales'
  | 'Spam';

export type ToneProfile = 'formal' | 'friendly' | 'direct';

export type LanguageCode = 'en' | 'es' | 'fr' | 'ur';

export interface TriageResult {
  category: TriageCategory;
  tone: ToneProfile;
  language: LanguageCode;
  urgencyScore: number;
  shouldPrompt: boolean;
  summary: string;
}

export interface MessageLog {
  id: string;
  platform: PlatformId;
  senderName: string;
  senderHandle: string;
  subject?: string;
  preview: string;
  receivedAt: string;
  unread: boolean;
  firstContact: boolean;
  requiresResponse: boolean;
  responseDueMinutes?: number;
  tags: string[];
  triage?: TriageResult;
}

export interface Template {
  id: string;
  name: string;
  category: TriageCategory | 'Universal';
  tone: ToneProfile;
  content: string;
  variables: string[];
}

export interface IntegrationAccount {
  id: PlatformId;
  label: string;
  authType: string;
  connected: boolean;
  locked: boolean;
  lastSync: string;
  securityNote: string;
}

export interface DashboardMetric {
  label: string;
  value: string;
  caption: string;
}

export interface ResponseHeatCell {
  day: string;
  band: string;
  score: number;
}

export interface DraftRequest {
  message: MessageLog;
  instruction: string;
  preferredTone: ToneProfile;
  language: LanguageCode;
}

