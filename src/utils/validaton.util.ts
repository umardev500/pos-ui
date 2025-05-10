import lodash from 'lodash';

/**
 * Checks if the form values have changed and are valid.
 * @param values - The current values of the form.
 * @param defaultValues - The initial or default values of the form.
 * @param isValid - Boolean indicating whether the form is valid.
 * @returns `true` if the form values have changed and the form is valid, otherwise `false`.
 */
export const isFormValidAndChanged = (values: any, defaultValues: any, isValid: boolean): boolean => {
  // Check if the current values are not equal to the default values and if the form is valid
  return !lodash.isEqual(values, defaultValues) && isValid;
};
