import * as Notifications from 'expo-notifications';

import { MessageLog } from '@/types/nexus';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function bootstrapNotificationsAsync() {
  const permissions = await Notifications.getPermissionsAsync();

  if (!permissions.granted) {
    await Notifications.requestPermissionsAsync();
  }
}

export async function pushLocalNexusPromptAsync(message: MessageLog) {
  return Notifications.scheduleNotificationAsync({
    content: {
      title: `Nexus Prompt: ${message.senderName}`,
      body: message.triage?.summary ?? message.preview,
      data: {
        messageId: message.id,
        platform: message.platform,
      },
    },
    trigger: null,
  });
}

