import {variantsMock} from '@app/mocks/data';
import {collectUniqueVariantValues} from '@app/utils';

// 🔍 Call the function
const variantSummary = collectUniqueVariantValues(variantsMock);

console.log(variantSummary);
