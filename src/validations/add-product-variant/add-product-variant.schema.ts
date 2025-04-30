import * as Yup from 'yup';

export const AddProductVariantSchema = Yup.object().shape({
  unit: Yup.object()
    .shape({
      id: Yup.number().required(),
      name: Yup.string().required(),
    })
    .required('Satuan wajib dipilih'),

  variants: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().trim().required('Nama varian wajib diisi'),
        value: Yup.string().trim().required('Nilai varian wajib diisi'),
      }),
    )
    .min(1, 'Minimal 1 varian diperlukan'),

  price: Yup.number()
    .typeError('Harga harus berupa angka')
    .required('Harga wajib diisi')
    .positive('Harga harus lebih besar dari 0'),

  stock: Yup.number()
    .typeError('Stok harus berupa angka')
    .required('Stok wajib diisi')
    .integer('Stok harus bilangan bulat')
    .min(0, 'Stok minimal 0'),
});
