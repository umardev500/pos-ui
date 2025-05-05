import {ProductVariantDTO} from '@app/types';

type VariantMap = Record<string, Set<string>>;

export function collectUniqueVariantValues(variants: ProductVariantDTO[]): Record<string, string[]> {
  const variantMap: VariantMap = {};

  for (const variant of variants) {
    for (const value of variant.product_variant_values) {
      const typeName = value.variant_value.variant_type.name;
      const val = value.variant_value.value;

      if (!variantMap[typeName]) {
        variantMap[typeName] = new Set();
      }

      variantMap[typeName].add(val);
    }
  }

  // Convert sets to arrays
  const result: Record<string, string[]> = {};
  for (const [key, valSet] of Object.entries(variantMap)) {
    result[key] = Array.from(valSet);
  }

  return result;
}
