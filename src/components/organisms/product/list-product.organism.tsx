import {ProductItem} from '@app/components/molecules';
import {Product} from '@app/types';
import React from 'react';
import {FlatList, ListRenderItem, useWindowDimensions, View} from 'react-native';

const PADDING_X = 8 * 2;
const NUM_COL = 2;

type Props = {
  products: Product[];
};

export const ListProducts: React.FC<Props> = props => {
  const {products} = props;
  const {width} = useWindowDimensions();
  const itemWidth = (width - PADDING_X) / NUM_COL;

  const renderItem: ListRenderItem<Product> = ({item}) => {
    return <ProductItem width={itemWidth} product={item} />;
  };

  return (
    <>
      <FlatList
        contentContainerStyle={{paddingHorizontal: PADDING_X / 2, paddingBottom: 45, paddingTop: 16}}
        ItemSeparatorComponent={() => <View className="h-4" />}
        numColumns={2}
        keyExtractor={item => `${item.id}`}
        data={products}
        renderItem={renderItem}
      />
    </>
  );
};
