import {DiscountType} from '@app/types';
import * as Yup from 'yup';

/**
 * Yup Schema for creating a new customer level.
 */
export const createCustomerLevelSchema = Yup.object().shape({
  name: Yup.string().required('Name is required.').max(255, 'Name must be at most 255 characters long.'),

  description: Yup.string().max(500, 'Description must be at most 500 characters long.').optional(),

  discount_type: Yup.mixed<DiscountType>().oneOf(Object.values(DiscountType), 'Invalid discount type.').optional(),

  discount: Yup.number()
    .min(0, 'Discount must be a positive number.')
    .positive('Discount must be greater than 0.')
    .optional(),
});

/**
 * Inferred type for the CreateCustomerLevelDto from the Yup schema.
 */
export type CreateCustomerLevelDTO = Yup.InferType<typeof createCustomerLevelSchema>;

/**
 * Yup Schema for updating an existing customer level.
 */
export const updateCustomerLevelSchema = Yup.object().shape({
  name: Yup.string().max(255, 'Name must be at most 255 characters long.').optional(),

  description: Yup.string().max(500, 'Description must be at most 500 characters long.').optional(),

  discount_type: Yup.mixed<DiscountType>().oneOf(Object.values(DiscountType), 'Invalid discount type.').optional(),

  discount: Yup.number()
    .min(0, 'Discount must be a positive number.')
    .positive('Discount must be greater than 0.')
    .optional(),
});

/**
 * Inferred type for the UpdateCustomerLevelDto from the Yup schema.
 */
export type UpdateCustomerLevelDTO = Yup.InferType<typeof updateCustomerLevelSchema>;
