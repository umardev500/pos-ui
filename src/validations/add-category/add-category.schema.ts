import * as Yup from 'yup';

/**
 * Validation schema for CategoryInput
 */
export const AddCategorySchema = Yup.object({
  name: Yup.string().required('Nama kategori wajib diisi'),
  description: Yup.string().optional(),
});
