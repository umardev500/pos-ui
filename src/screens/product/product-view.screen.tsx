import {product5} from '@app/assets/images';
import {Button, Icon, ProductTagIndicator} from '@app/components/atoms';
import {LabeledInput} from '@app/components/molecules';
import {colors} from '@app/styles';
import {MainStackParamList} from '@app/types';
import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {Image, Pressable, Text, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-controller';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type Props = StackScreenProps<MainStackParamList, 'ProductView'>;

export const ProductView: React.FC<Props> = ({}) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = React.useState(false);

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  const {bottom} = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-white">
      <KeyboardAwareScrollView
        contentContainerStyle={{
          paddingBottom: 25,
        }}
        bottomOffset={25}
        showsVerticalScrollIndicator={false}>
        <View className="flex-row bg-red-100">
          <Image className="w-full h-[350px]" source={product5} />
        </View>

        <View className="p-4">
          <View className="flex-row items-center justify-between">
            <View className="gap-1.5">
              <Text className="text-xl text-gray-800 font-semibold">Itallian Ice Coffee</Text>

              <View className="flex-row items-center gap-3">
                <ProductTagIndicator icon="deployed_code_update" value={2} />
                <View className="bg-gray-300 w-[1px] h-[10px] rounded-full" />
                <View className="flex-row items-center gap-1">
                  <Icon name="sell" size={14} color={colors.gray[500]} />
                  <Text className="text-sm text-gray-500">Drink</Text>
                </View>
              </View>
            </View>

            <View>
              <Text className="text-xl font-medium text-orange-500">Rp300.000</Text>
            </View>
          </View>

          <View className="mt-8">
            <TouchableOpacity activeOpacity={0.7} onPress={toggleDescription} className="flex-row items-center gap-1">
              <Icon
                name={isDescriptionExpanded ? 'chevron_down' : 'chevron_right'}
                size={16}
                color={colors.gray[500]}
              />
              <Text className="text-sm text-gray-600">Description</Text>
            </TouchableOpacity>

            {isDescriptionExpanded && (
              <Pressable onPress={toggleDescription}>
                <View className="mt-4">
                  <Text className="text-base text-gray-800">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                  </Text>
                </View>
              </Pressable>
            )}
          </View>

          <View className="mt-6">
            <View className="gap-2">
              <LabeledInput
                isClickableOnly
                onPress={() => console.log('Open modal')}
                trailingIcon="chevron_right"
                label="Tipe order"
                placeholder="Pilih tipe order"
              />
              <View className="gap-2 flex-row">
                <LabeledInput
                  isClickableOnly
                  onPress={() => console.log('Open modal')}
                  trailingIcon="chevron_right"
                  label="Satuan"
                  placeholder="Pilih satuan"
                />
                <LabeledInput
                  isClickableOnly
                  onPress={() => console.log('Open modal')}
                  trailingIcon="chevron_right"
                  label="Variasi"
                  placeholder="Pilih variasi"
                />
              </View>

              <LabeledInput icon="description" isTextArea label="Catatan" placeholder="Catatan tambahan" />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>

      <View className="px-4 pt-4 border-t border-t-gray-100" style={{paddingBottom: bottom + 16}}>
        <Button title="Add to Cart" containerColor={colors.orange[500]} textColor={colors.white} />
      </View>
    </View>
  );
};
