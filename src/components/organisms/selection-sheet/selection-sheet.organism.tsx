import {TrueSheet} from '@lodev09/react-native-true-sheet';
import clsx from 'clsx';
import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

type SelectableItem = {
  id: number | string;
  label: string;
};

type Props<T extends SelectableItem> = {
  title?: string;
  items?: T[];
  selected?: T[];
  onSelect: (selectedItems: T[]) => void;
  ref?: React.RefObject<TrueSheet | null>;
  multiSelect?: boolean; // ➕ Added multiSelect toggle
};

export const SelectionSheet = <T extends SelectableItem>({
  title = 'Select an Item',
  items = [],
  selected,
  onSelect,
  ref,
  multiSelect = false, // Default to true
}: Props<T>) => {
  const [localSelected, setLocalSelected] = useState<T[]>(selected ?? []);

  // Sync with props when component mounts or selected changes
  useEffect(() => {
    if (!selected) return;

    const isSame = selected.length === localSelected.length && selected.every((s, i) => s.id === localSelected[i]?.id);

    if (!isSame) {
      setLocalSelected(selected);
    }
  }, [selected]);

  const handleSelect = (item: T) => {
    setLocalSelected(prevSelected => {
      const isItemSelected = prevSelected.some(s => s.id === item.id);

      let updatedSelection: T[];

      if (multiSelect) {
        // Toggle item in array
        updatedSelection = isItemSelected ? prevSelected.filter(s => s.id !== item.id) : [...prevSelected, item];
      } else {
        // Single selection
        updatedSelection = isItemSelected ? [] : [item];
      }

      onSelect(updatedSelection);
      return updatedSelection;
    });
  };

  return (
    <TrueSheet edgeToEdge ref={ref} sizes={['auto', 'large']}>
      <View className="pt-8 px-4 pb-10">
        <Text className="text-sm text-gray-800">{title}</Text>
        <View className="mt-4 gap-2">
          {items.map(item => (
            <TouchableOpacity
              key={item.id}
              onPress={() => handleSelect(item)}
              className={clsx('border border-dashed border-gray-300 rounded-xl px-4 py-3', {
                'bg-gray-100': localSelected.some(s => s.id === item.id),
              })}>
              <Text className="text-sm text-gray-800 font-medium">{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </TrueSheet>
  );
};
