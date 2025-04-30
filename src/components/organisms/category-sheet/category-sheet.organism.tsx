import {Category} from '@app/types';
import {TrueSheet} from '@lodev09/react-native-true-sheet';
import clsx from 'clsx';
import {View, Text, TouchableOpacity} from 'react-native';

export const CategorySheet = ({
  selected,
  onSelect,
  ref,
}: {
  selected?: Category;
  onSelect: (cat: Category) => void;
  ref?: React.RefObject<TrueSheet | null>;
}) => (
  <TrueSheet edgeToEdge ref={ref} sizes={['auto', 'large']}>
    <View className="pt-8 px-4 pb-10">
      <Text className="text-sm text-gray-800">Pilih Kategori</Text>
      <View className="mt-4 gap-2">
        {[
          {id: 1, name: 'Snack'},
          {id: 2, name: 'Junk Food'},
          {id: 3, name: 'Drink'},
        ].map(cat => (
          <TouchableOpacity
            key={cat.id}
            onPress={() => onSelect(cat)}
            className={clsx('border border-dashed border-gray-300 rounded-xl px-4 py-3', {
              'bg-gray-100': selected?.id === cat.id,
            })}>
            <Text className="text-sm text-gray-800 font-medium">{cat.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  </TrueSheet>
);
