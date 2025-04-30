import * as yup from 'yup';

export const AddProductSchema = yup.object().shape({
  name: yup.string().required(),
  capital: yup
    .number()
    .typeError('Capital must be a number')
    .required('Capital is required')
    .min(1, 'Capital must be at least 1'),
  price: yup
    .number()
    .typeError('Price must be a number')
    .required('Price is required')
    .min(1, 'Price must be at least 1'),
});
