import {ListProducts} from '@app/components/organisms';
import {useProducts} from '@app/hooks';
import {ProductDto} from '@app/types';
import React from 'react';

interface Props {
  categoryId?: number;
  onAddToCart?: (product: ProductDto) => void;
}

export const CatalogTemplate: React.FC<Props> = ({onAddToCart}) => {
  const {data} = useProducts({});

  return (
    <>
      <ListProducts onAddToCart={onAddToCart} data={data} />
    </>
  );
};
