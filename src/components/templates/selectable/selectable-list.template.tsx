import {SelectableItemType} from '@app/components/molecules';
import {SelectableList} from '@app/components/organisms';
import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';

type SelectableListProps<T extends SelectableItemType> = {
  title?: string;
  items?: T[];
  selected?: T[];
  onSelect: (selectedItems: T[]) => void;
  multiSelect?: boolean; // Multi select toggle
};

export const SelectableListTemplate = <T extends SelectableItemType>({
  title = 'Select an Item',
  items = [],
  selected = [],
  onSelect,
  multiSelect = false,
}: SelectableListProps<T>) => {
  const [localSelected, setLocalSelected] = useState<T[]>(selected);

  // Sync with props when component mounts or selected changes
  useEffect(() => {
    if (!selected) return;
    setLocalSelected(selected);
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

      onSelect(updatedSelection); // Pass updated selected items to the parent
      return updatedSelection;
    });
  };

  return (
    <>
      <Text className="text-sm text-gray-700">{title}</Text>
      <View className="mt-4">
        <SelectableList items={items} selectedItems={localSelected} onSelect={handleSelect} />
      </View>
    </>
  );
};
