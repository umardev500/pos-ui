import {create} from 'zustand';

/**
 * State management for UI triggers like enabling/disabling save buttons.
 */
interface TriggerState {
  // Controls whether the "Save" button is enabled on the Add Variant screen
  isSaveAddVariantEnabled: boolean;

  // Toggles the "Save" button on the Add Variant screen
  toggleSaveAddVariant: (enabled: boolean) => void;

  // Controls whether the "Save" button is enabled on the Add Product screen
  isSaveAddProductEnabled: boolean;

  // Toggles the "Save" button on the Add Product screen
  toggleSaveAddProduct: (enabled: boolean) => void;
}

// Zustand store to manage UI state for trigger-based actions
export const useTriggerStore = create<TriggerState>(set => ({
  isSaveAddVariantEnabled: false,
  toggleSaveAddVariant: enabled => set({isSaveAddVariantEnabled: enabled}),

  isSaveAddProductEnabled: false,
  toggleSaveAddProduct: enabled => set({isSaveAddProductEnabled: enabled}),
}));
