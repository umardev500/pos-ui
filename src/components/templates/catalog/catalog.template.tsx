import {ListProducts} from '@app/components/organisms';
import {useProducts} from '@app/hooks';
import {ProductDto} from '@app/types';
import React, {useCallback, useState} from 'react';

interface Props {
  categoryId?: number;
  onAddToCart?: (product: ProductDto) => void;
}

export const CatalogTemplate: React.FC<Props> = ({categoryId, onAddToCart}) => {
  const {data, refetch} = useProducts({categoryId});
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Refresh handler
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await refetch(); // Call refetch to reload the data
    setIsRefreshing(false);
  }, [refetch]);

  return (
    <>
      <ListProducts onRefresh={handleRefresh} isRefreshing={isRefreshing} onAddToCart={onAddToCart} data={data} />
    </>
  );
};
