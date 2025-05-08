import {SelectableItem, SelectableItemType} from '@app/components/molecules';
import clsx from 'clsx';
import React from 'react';
import {View} from 'react-native';

type SelectableListProps<T extends SelectableItemType> = {
  items: T[];
  selectedItems: T[]; // An array of selected items of type T
  onSelect: (item: T) => void;
  horizontal?: boolean;
};

export const SelectableList = <T extends SelectableItemType>({
  items,
  selectedItems,
  onSelect,
  horizontal = false,
}: SelectableListProps<T>) => {
  return (
    <View className={clsx('gap-2', {'flex-row': horizontal})}>
      {items.map(item => (
        <SelectableItem
          key={item.id}
          item={item}
          selected={selectedItems.some(selectedItem => selectedItem.id === item.id)}
          onSelect={onSelect} // Pass the handleSelect to update selection
        />
      ))}
    </View>
  );
};
