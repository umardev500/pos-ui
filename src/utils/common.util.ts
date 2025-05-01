import {debounce} from 'lodash';
import {ImageSourcePropType} from 'react-native';

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// convert string or ImageSourcePropType to ImageSourcePropType
export const getImageSource = (photo: string | ImageSourcePropType) => {
  return typeof photo === 'string' ? {uri: photo} : photo;
};

/**
 * Creates a debounced handler that updates input validity state
 * @param setValidCallback - A setter function like `setIsValid`
 * @param delay - debounce delay in ms (default: 500)
 */
export function createDebouncedInputValidator(setValidCallback: (valid: boolean) => void, delay: number = 500) {
  return debounce((isValid: boolean) => {
    setValidCallback(isValid);
  }, delay);
}
