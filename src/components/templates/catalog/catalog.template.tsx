import {ListProducts} from '@app/components/organisms';
import {useProducts} from '@app/hooks';
import {ProductDto} from '@app/types';
import React from 'react';

interface Props {
  categoryId?: number;
  onAddToCart?: (product: ProductDto) => void;
}

export const CatalogTemplate: React.FC<Props> = () => {
  const {data} = useProducts();

  console.log('render catalog', data);

  return (
    <>
      <ListProducts products={[]} />
    </>
  );
};
