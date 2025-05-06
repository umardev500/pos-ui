import {variantsMock} from '@app/mocks/data';
import {collectUniqueVariantValues, findMatchingVariants} from '@app/utils';

const partialSelection: Record<string, string> = {
  Flavor: 'Beef',
};

const matchingVariants = findMatchingVariants(variantsMock, partialSelection);

// console.log(matchingVariants.map(v => v.price)); // Should log the prices of variants matching "Beef"
const grouping = collectUniqueVariantValues(matchingVariants);

console.log(matchingVariants);
