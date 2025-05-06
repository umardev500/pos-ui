import {ProductUnitDto, UnitDto} from '@app/types';

/**
 * Retrieves a ProductUnitDto that matches the given UnitDto.
 *
 * @param productUnits - List of product unit entries (ProductUnitDto).
 * @param unit - The unit to find the matching product unit for.
 * @returns The matching ProductUnitDto, or undefined if not found or if unit is undefined.
 */
export function getProductUnitByUnit(productUnits: ProductUnitDto[], unit?: UnitDto): ProductUnitDto | undefined {
  if (!unit) return undefined;

  return productUnits.find(productUnit => productUnit.unit.id === unit.id);
}
