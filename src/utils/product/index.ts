import {ProductVariantDTO} from '@app/types';

/**
 * Returns all product variants that match a given unit_id.
 *
 * @param productVariants - An array of product variant objects.
 * @param unitId - The unit_id to filter the variants by.
 * @returns An array of product variants that match the given unit_id.
 */
export function getVariantsByUnitId(productVariants: ProductVariantDTO[], unitId: number): ProductVariantDTO[] {
  return productVariants.filter(variant => variant.unit_id === unitId);
}
