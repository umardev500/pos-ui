import {create} from 'zustand';

interface TriggerState {
  triggerSaveAddVariant: number;
  setTriggerSaveAddVariant: () => void;
}

export const useTriggerStore = create<TriggerState>(set => ({
  triggerSaveAddVariant: 0,
  setTriggerSaveAddVariant: () => set(state => ({triggerSaveAddVariant: state.triggerSaveAddVariant + 1})),
}));
