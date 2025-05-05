import {UnitDto} from '@app/types';
import {TrueSheet} from '@lodev09/react-native-true-sheet';
import clsx from 'clsx';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

type Props = {
  selected: UnitDto[];
  onSelect: (unit: UnitDto) => void;
  units?: UnitDto[];
  ref?: React.RefObject<TrueSheet | null>;
};

export const UnitSheet: React.FC<Props> = ({
  selected,
  onSelect,
  units = [
    {id: 1, name: 'Pack'},
    {id: 2, name: 'Roll'},
    {id: 3, name: 'Kilos'},
  ],
  ref,
}) => (
  <TrueSheet edgeToEdge ref={ref} sizes={['auto', 'large']}>
    <View className="pt-8 px-4 pb-10">
      <Text className="text-sm text-gray-800">Pilih Satuan</Text>
      <View className="mt-4 gap-2">
        {units.map(unit => (
          <TouchableOpacity
            key={unit.id}
            onPress={() => onSelect(unit)}
            className={clsx('border border-dashed border-gray-300 rounded-xl px-4 py-3', {
              'bg-gray-100': selected.some(u => u.id === unit.id),
            })}>
            <Text className="text-sm text-gray-800 font-medium">{unit.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  </TrueSheet>
);
