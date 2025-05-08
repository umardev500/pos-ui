import {SelectableListTemplate} from '@app/components/templates';
import {TrueSheet} from '@lodev09/react-native-true-sheet';
import React from 'react';
import {View} from 'react-native';

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
  multiSelect = false,
}: Props<T>) => {
  return (
    <TrueSheet edgeToEdge ref={ref} sizes={['auto', 'large']}>
      <View className="pt-8 px-4 pb-10">
        <SelectableListTemplate
          onSelect={onSelect}
          multiSelect={multiSelect}
          title={title}
          items={items}
          selected={selected}
        />
      </View>
    </TrueSheet>
  );
};
