import {ProductItem} from '@app/components/molecules';
import {ProductDto} from '@app/types';
import React from 'react';
import {FlatList, ListRenderItem, useWindowDimensions, View} from 'react-native';

const PADDING_X = 8 * 2;
const NUM_COL = 2;

type Props = {
  data?: ProductDto[];
  onRefresh?: () => void;
  isRefreshing?: boolean;
  onAddToCart?: (product: ProductDto) => void;
  onPress?: (id: number) => void;
};

export const ListProducts: React.FC<Props> = props => {
  const {data, onRefresh, isRefreshing, onAddToCart, onPress} = props;
  const {width, height} = useWindowDimensions();
  const isLandscape = width > height;
  const numberOfColumns = isLandscape ? 4 : 2;
  const itemWidth = (width - PADDING_X) / numberOfColumns;

  const renderItem: ListRenderItem<ProductDto> = ({item}) => {
    return <ProductItem onAddToCart={onAddToCart} width={itemWidth} product={item} onPress={onPress} />;
  };

  return (
    <>
      <FlatList
        key={numberOfColumns} // 🔑 Force remount when number of columns changes
        contentContainerStyle={{paddingHorizontal: PADDING_X / 2, paddingBottom: 45, paddingTop: 16}}
        ItemSeparatorComponent={() => <View className="h-4" />}
        numColumns={numberOfColumns}
        keyExtractor={item => `${item.id}`}
        data={data}
        onRefresh={onRefresh}
        refreshing={isRefreshing}
        renderItem={renderItem}
      />
    </>
  );
};
