import {Icon} from '@app/components/atoms';
import {colors} from '@app/styles';
import {TrueSheet} from '@lodev09/react-native-true-sheet';
import React, {useState} from 'react';
import {Switch, Text, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type Props = {
  ref?: React.RefObject<TrueSheet | null>;
};

export const OrderConfigSheet: React.FC<Props> = ({ref}) => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const {bottom} = useSafeAreaInsets();

  return (
    <TrueSheet edgeToEdge ref={ref} sizes={['auto', 'large']}>
      <View className="pt-6 px-4" style={{paddingBottom: bottom + 16}}>
        <TouchableOpacity activeOpacity={0.4} onPress={() => {}} className="flex-row items-center justify-between py-4">
          <Text className="text-sm font-medium text-gray-800">Pilih Diskon</Text>
          <Icon name="chevron_right" size={22} color={colors.gray[500]} />
        </TouchableOpacity>

        <View className="h-[1px] bg-gray-200" />

        <TouchableOpacity
          onPress={toggleSwitch}
          activeOpacity={0.4}
          className="flex-row items-center justify-between py-4">
          <Text className="text-sm font-medium text-gray-800">Point</Text>

          <Switch
            trackColor={{false: undefined, true: colors.orange[200]}}
            thumbColor={isEnabled ? colors.orange[300] : '#fff'}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </TouchableOpacity>

        <View className="h-[1px] bg-gray-200" />

        <TouchableOpacity activeOpacity={0.4} onPress={() => {}} className="flex-row items-center justify-between py-4">
          <Text className="text-sm font-medium text-gray-800">Down Payment</Text>
          <Icon name="chevron_right" size={22} color={colors.gray[500]} />
        </TouchableOpacity>
      </View>
    </TrueSheet>
  );
};
