import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';

const NEXUS_SYNC_TASK = 'nexus-agent-sync';

TaskManager.defineTask(NEXUS_SYNC_TASK, async () => {
  try {
    return BackgroundFetch.BackgroundFetchResult.NewData;
  } catch {
    return BackgroundFetch.BackgroundFetchResult.Failed;
  }
});

export async function registerBackgroundSyncAsync() {
  const status = await BackgroundFetch.getStatusAsync();

  if (
    status === BackgroundFetch.BackgroundFetchStatus.Denied ||
    status === BackgroundFetch.BackgroundFetchStatus.Restricted
  ) {
    return false;
  }

  const isRegistered = await TaskManager.isTaskRegisteredAsync(NEXUS_SYNC_TASK);

  if (!isRegistered) {
    await BackgroundFetch.registerTaskAsync(NEXUS_SYNC_TASK, {
      minimumInterval: 15 * 60,
      stopOnTerminate: false,
      startOnBoot: true,
    });
  }

  return true;
}

