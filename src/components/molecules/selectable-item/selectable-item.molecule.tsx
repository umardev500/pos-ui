import clsx from 'clsx';
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

export type SelectableItemType = {
  id: number | string;
  label?: string;
  name?: string;
};

type SelectableItemProps<T extends SelectableItemType> = {
  item: T;
  selected: boolean;
  onSelect: (item: T) => void;
};

export const SelectableItem = <T extends SelectableItemType>({item, selected, onSelect}: SelectableItemProps<T>) => {
  const displayText = item.label ?? item.name ?? 'Unnamed';

  return (
    <TouchableOpacity
      onPress={() => onSelect(item)}
      className={clsx('border border-dashed border-gray-300 rounded-xl px-4 py-3', {
        'bg-gray-100': selected,
      })}>
      <Text className="text-sm text-gray-800 font-medium">{displayText}</Text>
    </TouchableOpacity>
  );
};
