import * as Yup from 'yup';

export const addDPSchema = Yup.object({
  price: Yup.number()
    .typeError('Price must be a number')
    .required('Price is required')
    .min(1, 'Price must be at least 1')
    .positive('Price must be a positive number'),
});

// Infer the TypeScript type from the schema
export type AddDPFormValues = Yup.InferType<typeof addDPSchema>;

export const defaultAddDPFormValues: AddDPFormValues = {
  price: 0,
};
