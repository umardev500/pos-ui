import {Button} from '@app/components/atoms';
import {colors} from '@app/styles';
import {ProductVariantDTO} from '@app/types';
import {collectUniqueVariantValues, findMatchingVariants} from '@app/utils';
import {TrueSheet} from '@lodev09/react-native-true-sheet';
import clsx from 'clsx';
import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

type Props = {
  variants?: ProductVariantDTO[];
  ref?: React.RefObject<TrueSheet | null>;
};

export const VariantsSelectionSheet: React.FC<Props> = ({variants, ref}) => {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  // All possible options from all variants
  const selectionItems = collectUniqueVariantValues(variants || []);

  // Only include variants that are in stock
  const availableVariants = (variants || []).filter(v => v.stock > 0);

  // Filter based on current selection
  const filteredVariants = findMatchingVariants(availableVariants, selectedOptions);

  // Group variant values that are valid under the current selection
  // const grouping = collectUniqueVariantValues(filteredVariants);

  const handleSelect = (type: string, value: string) => {
    setSelectedOptions(prev => {
      const isAlreadySelected = prev[type] === value;

      if (isAlreadySelected) {
        const updated = {...prev};
        delete updated[type];
        return updated;
      }

      return {
        ...prev,
        [type]: value,
      };
    });
  };

  // Check if all variant types are selected
  const isComplete = Object.keys(selectionItems).every(type => selectedOptions[type]);

  // Function to check if a variant is available based on the current selections
  const isVariantAvailable = (type: string, value: string) => {
    // Make a temporary selection including the current variant type and value
    const tempSelected = {...selectedOptions, [type]: value};

    // Find matching variants that include this selection
    const matchingVariants = findMatchingVariants(availableVariants, tempSelected);

    // If there are matching variants, this option is available
    return matchingVariants.length > 0;
  };

  const handleSubmit = () => {
    console.log(filteredVariants.map(v => v.price));
  };

  return (
    <TrueSheet edgeToEdge ref={ref} sizes={['auto', 'large']}>
      <View className="pt-8 px-4 pb-10 gap-4">
        {Object.keys(selectionItems).map((type, index) => (
          <View
            key={type}
            className={clsx('gap-2 pb-4', {
              'border-t border-gray-200 pt-4': index !== 0,
            })}>
            <Text className="text-gray-800 text-sm">{type}:</Text>
            <View className="flex-row itemc-text-center gap-2">
              {selectionItems[type].map(value => {
                const isSelected = selectedOptions[type] === value;
                const isAvailable = isVariantAvailable(type, value); // Check if variant is available

                return (
                  <TouchableOpacity
                    key={value}
                    activeOpacity={0.7}
                    disabled={!isAvailable} // Disable if not available
                    onPress={() => {
                      if (isAvailable) handleSelect(type, value);
                    }}
                    className={clsx('border items-center justify-center px-4 py-1.5 rounded-md', {
                      'bg-gray-50 border-orange-500': isSelected,
                      'bg-gray-50 border-gray-200': !isSelected && isAvailable,
                      'bg-gray-100 border-gray-100': !isAvailable,
                    })}>
                    <Text
                      className={clsx('text-sm', {
                        'text-orange-500 font-medium': isSelected,
                        'text-gray-800': !isSelected && isAvailable,
                        'text-gray-400': !isAvailable,
                      })}>
                      {value}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}

        <Button
          disabled={!isComplete}
          onPress={handleSubmit}
          title="Simpan"
          textColor={colors.white}
          containerColor={colors.orange[500]}
        />
      </View>
    </TrueSheet>
  );
};
