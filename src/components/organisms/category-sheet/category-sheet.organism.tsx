import {TrueSheet} from '@lodev09/react-native-true-sheet';
import clsx from 'clsx';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import {Category} from '@app/types';

// List of category options
const CATEGORY_OPTIONS: Category[] = [
  {id: 1, name: 'Snack'},
  {id: 2, name: 'Junk Food'},
  {id: 3, name: 'Drink'},
];

type CategorySheetProps = {
  selected?: Category;
  onSelect: (cat: Category) => void;
  ref?: React.RefObject<TrueSheet | null>;
};

/**
 * Category selection sheet
 */
export const CategorySheet: React.FC<CategorySheetProps> = ({selected, onSelect, ref}) => (
  <TrueSheet edgeToEdge ref={ref} sizes={['auto', 'large']}>
    <View className="pt-8 px-4 pb-10">
      {/* Title */}
      <Text className="text-sm text-gray-800">Pilih Kategori</Text>

      <View className="mt-4 gap-2">
        {/* Render category options */}
        {CATEGORY_OPTIONS.map(cat => (
          <TouchableOpacity
            key={cat.id}
            onPress={() => onSelect(cat)} // Select category
            className={clsx('border border-dashed border-gray-300 rounded-xl px-4 py-3', {
              'bg-gray-100': selected?.id === cat.id, // Highlight selected category
            })}>
            <Text className="text-sm text-gray-800 font-medium">{cat.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  </TrueSheet>
);
