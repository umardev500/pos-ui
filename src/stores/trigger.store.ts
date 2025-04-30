import {create} from 'zustand';

interface TriggerState {
  // Variant button
  isSaveAddVariantEnabled: boolean;
  isSaveAddVariantPressed: boolean;
  setSaveAddVariantEnabled: (enabled: boolean) => void;
  setSaveAddVariantPressed: (pressed: boolean) => void;
  pressSaveAddVariant: () => void;

  // Product button
  isSaveAddProductEnabled: boolean;
  isSaveAddProductPressed: boolean;
  setSaveAddProductEnabled: (enabled: boolean) => void;
  setSaveAddProductPressed: (pressed: boolean) => void;
  pressSaveAddProduct: () => void;

  // Category button
  isSaveAddCategoryEnabled: boolean;
  isSaveAddCategoryPressed: boolean;
  setSaveAddCategoryEnabled: (enabled: boolean) => void;
  setSaveAddCategoryPressed: (pressed: boolean) => void;
  pressSaveAddCategory: () => void;
}

export const useTriggerStore = create<TriggerState>(set => ({
  // Variant
  isSaveAddVariantEnabled: false,
  isSaveAddVariantPressed: false,
  setSaveAddVariantEnabled: enabled => set({isSaveAddVariantEnabled: enabled}),
  setSaveAddVariantPressed: pressed => set({isSaveAddVariantPressed: pressed}),
  pressSaveAddVariant: () => {
    set({isSaveAddVariantPressed: true});
    setTimeout(() => set({isSaveAddVariantPressed: false}), 200);
  },

  // Product
  isSaveAddProductEnabled: false,
  isSaveAddProductPressed: false,
  setSaveAddProductEnabled: enabled => set({isSaveAddProductEnabled: enabled}),
  setSaveAddProductPressed: pressed => set({isSaveAddProductPressed: pressed}),
  pressSaveAddProduct: () => {
    set({isSaveAddProductPressed: true});
    setTimeout(() => set({isSaveAddProductPressed: false}), 200);
  },

  // Category
  isSaveAddCategoryEnabled: false,
  isSaveAddCategoryPressed: false,
  setSaveAddCategoryEnabled: enabled => set({isSaveAddCategoryEnabled: enabled}),
  setSaveAddCategoryPressed: pressed => set({isSaveAddCategoryPressed: pressed}),
  pressSaveAddCategory: () => {
    set({isSaveAddCategoryPressed: true});
    setTimeout(() => set({isSaveAddCategoryPressed: false}), 200);
  },
}));
