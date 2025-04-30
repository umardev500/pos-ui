import {create} from 'zustand';

interface TriggerState {
  isSaveAddVariantEnabled: boolean;
  toggleSaveAddVariant: (enabled: boolean) => void;
}

export const useTriggerStore = create<TriggerState>(set => ({
  isSaveAddVariantEnabled: false,
  toggleSaveAddVariant: (enabled: boolean) => set({isSaveAddVariantEnabled: enabled}),
}));
