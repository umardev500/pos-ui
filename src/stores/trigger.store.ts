import {create} from 'zustand';

/**
 * UI trigger state store to manage both enabled status and press events
 * for actions like saving a product or a variant.
 */
interface TriggerState {
  // Save Variant Button
  isSaveAddVariantEnabled: boolean;
  isSaveAddVariantPressed: boolean;
  setSaveAddVariantEnabled: (enabled: boolean) => void;
  setSaveAddVariantPressed: (pressed: boolean) => void;

  // Save Product Button
  isSaveAddProductEnabled: boolean;
  isSaveAddProductPressed: boolean;
  setSaveAddProductEnabled: (enabled: boolean) => void;
  setSaveAddProductPressed: (pressed: boolean) => void;
}

export const useTriggerStore = create<TriggerState>(set => ({
  // Variant button states
  isSaveAddVariantEnabled: false,
  isSaveAddVariantPressed: false,
  setSaveAddVariantEnabled: enabled => set({isSaveAddVariantEnabled: enabled}),
  setSaveAddVariantPressed: pressed => set({isSaveAddVariantPressed: pressed}),

  // Product button states
  isSaveAddProductEnabled: false,
  isSaveAddProductPressed: false,
  setSaveAddProductEnabled: enabled => set({isSaveAddProductEnabled: enabled}),
  setSaveAddProductPressed: pressed => set({isSaveAddProductPressed: pressed}),
}));
