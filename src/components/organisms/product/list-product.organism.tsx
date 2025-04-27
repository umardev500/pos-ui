import {ProductItem} from '@app/components/molecules';
import {Product} from '@app/types';
import {FlatList, ListRenderItem, useWindowDimensions} from 'react-native';
import {products} from './product.dummy';

const PADDING_X = 16 * 2;
export const ListProducts = () => {
  const {width} = useWindowDimensions();
  const itemWidth = (width - PADDING_X) / 3;

  const renderItem: ListRenderItem<Product> = ({item}) => {
    return <ProductItem width={itemWidth} product={item} />;
  };

  return (
    <>
      <FlatList numColumns={3} keyExtractor={item => `${item.id}`} data={products} renderItem={renderItem} />
    </>
  );
};
