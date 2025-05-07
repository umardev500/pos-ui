import {Button} from '@app/components/atoms';
import {colors} from '@app/styles';
import {ProductVariantDTO} from '@app/types';
import {collectUniqueVariantValues, findMatchingVariants} from '@app/utils';
import {TrueSheet} from '@lodev09/react-native-true-sheet';
import clsx from 'clsx';
import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

type Props = {
  variants?: ProductVariantDTO[];
  ref?: React.RefObject<TrueSheet | null>;
  currentSelectedOptions?: Record<string, string>;
  onSubmit?: (variant: ProductVariantDTO, selectedOptions: Record<string, string>, price: number) => void;
};

export const VariantsSelectionSheet: React.FC<Props> = ({variants, ref, currentSelectedOptions, onSubmit}) => {
  // ————————————————————————————————————————————————
  // 🧠 State
  // ————————————————————————————————————————————————
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(currentSelectedOptions || {});

  // ————————————————————————————————————————————————
  // 🎯 Sync with external selection
  // ————————————————————————————————————————————————
  useEffect(() => {
    setSelectedOptions(currentSelectedOptions || {});
  }, [currentSelectedOptions]);

  // ————————————————————————————————————————————————
  // 🔍 Derived Data
  // ————————————————————————————————————————————————
  const selectionItems = collectUniqueVariantValues(variants || []);
  const availableVariants = (variants || []).filter(v => v.stock > 0);
  const filteredVariants = findMatchingVariants(availableVariants, selectedOptions);
  const isComplete = Object.keys(selectionItems).every(type => selectedOptions[type]);

  // ————————————————————————————————————————————————
  // 🖱️ Handlers
  // ————————————————————————————————————————————————
  const handleSelect = (type: string, value: string) => {
    setSelectedOptions(prev => {
      const isAlreadySelected = prev[type] === value;

      if (isAlreadySelected) {
        const updated = {...prev};
        delete updated[type];
        return updated;
      }

      return {...prev, [type]: value};
    });
  };

  const handleSubmit = () => {
    const selectedVariant = filteredVariants[0];
    const selectedPrice = selectedVariant?.price;

    onSubmit?.(selectedVariant, selectedOptions, selectedPrice);
  };

  // ————————————————————————————————————————————————
  // 🧪 Helpers
  // ————————————————————————————————————————————————
  const isVariantAvailable = (type: string, value: string) => {
    const tempSelected = {...selectedOptions, [type]: value};
    const matchingVariants = findMatchingVariants(availableVariants, tempSelected);
    return matchingVariants.length > 0;
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
            <View className="flex-row flex-wrap items-center gap-2">
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
