import { create } from 'zustand';

import { MessageLog, PlatformId } from '@/types/nexus';

interface AgentStoreState {
  selectedMessage?: MessageLog;
  biometricUnlocked: boolean;
  toneMirroring: boolean;
  autoFollowUp: boolean;
  multilingualReplies: boolean;
  shadowMode: Record<PlatformId, boolean>;
  lastGeneratedDraft?: string;
  setSelectedMessage: (message?: MessageLog) => void;
  setBiometricUnlocked: (value: boolean) => void;
  setLastGeneratedDraft: (draft?: string) => void;
  toggleShadowMode: (platform: PlatformId) => void;
  toggleSetting: (key: 'toneMirroring' | 'autoFollowUp' | 'multilingualReplies') => void;
}

export const useAgentStore = create<AgentStoreState>((set) => ({
  biometricUnlocked: false,
  toneMirroring: true,
  autoFollowUp: true,
  multilingualReplies: true,
  shadowMode: {
    gmail: false,
    outlook: false,
    whatsapp: true,
    instagram: true,
    facebook: false,
    x: false,
  },
  setSelectedMessage: (selectedMessage) => set({ selectedMessage }),
  setBiometricUnlocked: (biometricUnlocked) => set({ biometricUnlocked }),
  setLastGeneratedDraft: (lastGeneratedDraft) => set({ lastGeneratedDraft }),
  toggleShadowMode: (platform) =>
    set((state) => ({
      shadowMode: {
        ...state.shadowMode,
        [platform]: !state.shadowMode[platform],
      },
    })),
  toggleSetting: (key) =>
    set((state) => {
      switch (key) {
        case 'toneMirroring':
          return { toneMirroring: !state.toneMirroring };
        case 'autoFollowUp':
          return { autoFollowUp: !state.autoFollowUp };
        case 'multilingualReplies':
          return { multilingualReplies: !state.multilingualReplies };
        default:
          return state;
      }
    }),
}));
