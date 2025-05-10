import * as Yup from 'yup';

export const defaultLevel = {
  id: 0,
  name: '',
  description: '',
  discount_type: '',
  discount: 0,
  created_at: '',
  updated_at: '',
};

export const createCustomerSchema = Yup.object({
  name: Yup.string().required('Name is required.').min(1, 'Name cannot be empty.'),

  level: Yup.object({
    id: Yup.number().required('Level ID is required').min(1, 'ID cannot be empty.'),
    name: Yup.string().required('Level name is required'),
    description: Yup.string().optional(),
    discount_type: Yup.string().optional(), // Assuming DiscountType is a string or specific enum
    discount: Yup.number().optional(),
    created_at: Yup.string().optional(),
    updated_at: Yup.string().optional(),
  }).required(),

  email: Yup.string().required('Email is required.').email('Invalid email format.'),

  phone: Yup.string()
    .optional()
    .nullable()
    .matches(/^(\+62|0)[1-9][0-9]{7,10}$/, 'Invalid phone number format for Indonesia.'),

  address: Yup.string().optional().nullable(),
});

// Infer TypeScript type from the Yup schema
export type CreateCustomerDTO = Yup.InferType<typeof createCustomerSchema>;

export const defaultCustomerValues: CreateCustomerDTO = {
  name: '',
  email: '',
  level: defaultLevel,
};

// update

export const updateCustomerSchema = Yup.object({
  name: Yup.string().required().min(1, 'Name cannot be empty.'),

  level: Yup.object({
    id: Yup.number().required('Level ID is required'),
    name: Yup.string().required('Level name is required'),
    description: Yup.string().optional(),
    discount_type: Yup.string().optional(), // Assuming DiscountType is a string or specific enum
    discount: Yup.number().optional(),
    created_at: Yup.string().optional(),
    updated_at: Yup.string().optional(),
  }).required(), // Level can be optional

  email: Yup.string().required().email('Invalid email format.'),

  phone: Yup.string()
    .optional()
    .nullable()
    .matches(/^(\+62|0)[1-9][0-9]{7,10}$/, 'Invalid phone number format for Indonesia.'),

  address: Yup.string().optional().nullable(),

  points: Yup.number().optional().min(0, 'Points cannot be negative.'),
});

// Infer TypeScript type from the Yup schema
export type UpdateCustomerDTO = Yup.InferType<typeof updateCustomerSchema>;

export const defaultUpdateCustomerValues: UpdateCustomerDTO = {
  name: '',
  level: defaultLevel,
  email: '',
  phone: undefined,
  address: undefined,
  points: undefined,
};
