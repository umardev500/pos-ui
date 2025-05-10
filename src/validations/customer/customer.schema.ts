import * as Yup from 'yup';

export const createCustomerSchema = Yup.object({
  name: Yup.string().required('Name is required.').min(1, 'Name cannot be empty.'),

  level_id: Yup.number().required('Level is required.').min(1, 'Level cannot be empty.'),

  email: Yup.string().required('Email is required.').email('Invalid email format.'),

  phone: Yup.string()
    .optional()
    .matches(/^(\+62|0)[1-9][0-9]{7,9}$/, 'Invalid phone number format for Indonesia.'),

  address: Yup.string().optional().nullable(),
});

// Infer TypeScript type from the Yup schema
export type CreateCustomerDTO = Yup.InferType<typeof createCustomerSchema>;

export const defaultCustomerValues: CreateCustomerDTO = {
  name: '',
  level_id: 0,
  email: '',
  phone: '',
  address: '',
};
