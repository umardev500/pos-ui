import {IconButton, Input} from '@app/components/atoms';
import {colors} from '@app/styles';
import {VariantInput} from '@app/types';
import clsx from 'clsx';
import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-controller';

type Props = {};

export const AddProductVariant: React.FC<Props> = ({}) => {
  const [variants, setVariants] = React.useState<VariantInput[]>([
    {
      id: 0,
      name: '',
      value: '',
    },
    {
      id: 1,
      name: '',
      value: '',
    },
  ]);

  const handleAddVariant = () => {
    setVariants(prev => [
      ...prev,
      {
        id: Date.now(), // or a better unique ID generator if needed
        name: '',
        value: '',
      },
    ]);
  };

  const handleRemoveVariant = (id: number) => {
    setVariants(prev => prev.filter(variant => variant.id !== id));
  };

  const handleChangeText = (id: number, field: 'name' | 'value', text: string) => {
    setVariants(prevVariants =>
      prevVariants.map(variant => (variant.id === id ? {...variant, [field]: text} : variant)),
    );
  };

  const renderVariantInput = (variant: VariantInput) => {
    return (
      <View className="flex-row gap-2 items-center mb-1.5 flex-1">
        <View className="flex-1 gap-2">
          <Input
            onChangeText={text => handleChangeText(variant.id, 'name', text)}
            leadingIcon="layers"
            placeholder="Contoh: Color"
            size={inputSize}
          />
        </View>
        <View className="flex-1 gap-2">
          <Input
            onChangeText={text => handleChangeText(variant.id, 'value', text)}
            placeholder="Contoh: Green"
            size={inputSize}
          />
        </View>
      </View>
    );
  };

  const inputSize = 'sm';
  const labelSize = 'text-sm';

  return (
    <View className="flex-1 bg-white">
      <KeyboardAwareScrollView contentContainerStyle={{paddingBottom: 25}} bottomOffset={25}>
        <View className="px-4 pt-8">
          <View className="mb-4 gap-2">
            <Text className="text-sm text-gray-800">Pilih satuan</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row gap-2">
                <View className="border border-dashed border-gray-300 rounded-xl px-6 py-3">
                  <Text>Kardus</Text>
                </View>
                <View className="border border-dashed border-gray-300 rounded-xl px-6 py-3">
                  <Text>Pack</Text>
                </View>
                <View className="border border-dashed border-gray-300 rounded-xl px-6 py-3">
                  <Text>Pieces</Text>
                </View>
              </View>
            </ScrollView>
          </View>

          <View className="flex-row gap-2 items-center mb-2">
            <View className="flex-1">
              <Text className={clsx('text-gray-800', labelSize)}>Varian</Text>
            </View>
            <View className="flex-1">
              <Text className={clsx('text-gray-800', labelSize)}>Detail</Text>
            </View>
            <IconButton disabled color={'transparent'} icon="delete" size={'xs'} />
          </View>

          {variants.slice(0, -1).map((item, _) => {
            return (
              <View key={item.id} className="flex-row items-center gap-2">
                {renderVariantInput(item)}
                <IconButton
                  color={colors.gray[500]}
                  onPress={() => handleRemoveVariant(item.id)}
                  icon="delete"
                  size={'xs'}
                />
              </View>
            );
          })}

          <View className="flex-row items-center gap-2">
            {renderVariantInput(variants.slice(-1)[0])}
            <IconButton
              roundedSize={12}
              color="white"
              backgroundColor={colors.orange[500]}
              onPress={handleAddVariant}
              size="xs"
              icon="add"
            />
          </View>

          <View className="flex-row gap-2 items-center mt-6">
            <View className="flex-1 gap-2">
              <Text className={clsx('text-gray-800', labelSize)}>Harga variasi</Text>
              <Input leadingIcon="attch_money" onChangeText={() => {}} placeholder="3.500" size={inputSize} />
            </View>
            <View className="flex-1 gap-2">
              <Text className={clsx('text-gray-800', labelSize)}>Stok</Text>
              <Input leadingIcon="deployed_code_update" onChangeText={() => {}} placeholder="45" size={inputSize} />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};
