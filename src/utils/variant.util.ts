import {Variant} from '@app/types';

// parse data to variant
export const parseToVariant = (data: {
  price: number;
  stock: number;
  unit?: {id: number; name: string};
  variants: {name: string; value: string}[];
}): Variant => {
  const dynamicFields = data.variants.reduce(
    (acc, curr) => {
      if (curr.name && curr.value) {
        acc[curr.name] = curr.value;
      }
      return acc;
    },
    {} as Record<string, string>,
  );

  return {
    price: Number(data.price),
    stock: Number(data.stock),
    unit: data.unit?.name,
    ...dynamicFields,
  };
};
