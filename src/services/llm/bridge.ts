import { DraftRequest } from '@/types/nexus';

function buildFallbackDraft(request: DraftRequest) {
  const greeting =
    request.language === 'es'
      ? `Hola ${request.message.senderName},`
      : `Hi ${request.message.senderName},`;
  const toneLead =
    request.preferredTone === 'direct'
      ? 'Quick note:'
      : request.preferredTone === 'friendly'
        ? 'Thanks for reaching out.'
        : 'Thank you for the message.';

  return `${greeting} ${toneLead} ${request.instruction} I will follow up with more detail once I have the next update.`;
}

export async function generateDraft(request: DraftRequest) {
  const baseUrl = process.env.EXPO_PUBLIC_NEXUS_BACKEND_URL;

  if (!baseUrl) {
    return buildFallbackDraft(request);
  }

  try {
    const response = await fetch(`${baseUrl}/drafts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error('Draft generation failed');
    }

    const payload = (await response.json()) as { draft?: string };
    return payload.draft ?? buildFallbackDraft(request);
  } catch {
    return buildFallbackDraft(request);
  }
}

