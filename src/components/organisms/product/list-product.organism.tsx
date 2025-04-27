import {CheckoutSummary, ProductItem} from '@app/components/molecules';
import {Product} from '@app/types';
import {FlatList, ListRenderItem, useWindowDimensions, View} from 'react-native';
import {products} from './product.dummy';

const PADDING_X = 8 * 2;
const NUM_COL = 2;

export const ListProducts = () => {
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
      <CheckoutSummary />
    </>
  );
};
