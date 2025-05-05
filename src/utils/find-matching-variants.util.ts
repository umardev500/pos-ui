import {ProductVariantDTO} from '@app/types';

export function findMatchingVariants(
  variants: ProductVariantDTO[],
  selected: Record<string, string>,
  debug: boolean = false,
): ProductVariantDTO[] {
  return variants.filter(variant => {
    const map: Record<string, string[]> = {};

    for (const val of variant.product_variant_values) {
      const typeName = val.variant_value.variant_type.name;
      const value = val.variant_value.value;

      if (!map[typeName]) {
        map[typeName] = [];
      }
      map[typeName].push(value);
    }

    for (const [typeName, selectedValue] of Object.entries(selected)) {
      if (!map[typeName] || !map[typeName].includes(selectedValue)) {
        if (debug) {
          console.log(`No match for ${typeName}: Expected ${selectedValue}, but got ${map[typeName]}`);
        }
        return false;
      }
    }

    if (debug) {
      console.log(`Variant ${variant.id} matched the selection:`, map);
    }

    return true;
  });
}
