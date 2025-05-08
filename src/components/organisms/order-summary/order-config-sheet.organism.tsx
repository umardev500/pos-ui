import {Icon} from '@app/components/atoms';
import {colors} from '@app/styles';
import {TrueSheet} from '@lodev09/react-native-true-sheet';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Switch, Text, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type Props = {
  ref?: React.RefObject<TrueSheet | null>;
};

export const OrderConfigSheet: React.FC<Props> = ({ref}) => {
  // ————————————————————————————————————————————————
  // 🧭 Navigation
  // ————————————————————————————————————————————————
  const navigation = useNavigation();

  // ————————————————————————————————————————————————
  // 📦 Hooks
  // ————————————————————————————————————————————————
  const [isEnabled, setIsEnabled] = useState(false);
  const {bottom} = useSafeAreaInsets();

  // ————————————————————————————————————————————————
  // 🛠 Handlers
  // ————————————————————————————————————————————————
  const toggleSwitch = () => setIsEnabled(prev => !prev);

  const handleNavigateToDiscount = () => {
    ref?.current?.dismiss();
    navigation.navigate('VoucherList');
  };

  return (
    <TrueSheet keyboardMode="pan" edgeToEdge ref={ref} sizes={['auto', 'large']}>
      <View className="pt-6 px-4" style={{paddingBottom: bottom + 16}}>
        <TouchableOpacity
          activeOpacity={0.4}
          onPress={handleNavigateToDiscount}
          className="flex-row items-center justify-between py-4">
          <Text className="text-sm font-medium text-gray-800">Pilih Diskon</Text>
          <Icon name="chevron_right" size={22} color={colors.gray[500]} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={toggleSwitch}
          activeOpacity={0.4}
          className="flex-row items-center justify-between py-4 border-t-[0.5px] border-t-gray-200">
          <Text className="text-sm font-medium text-gray-800">Point</Text>

          <Switch
            trackColor={{false: undefined, true: colors.gray[400]}}
            thumbColor={isEnabled ? colors.gray[500] : '#fff'}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.4}
          onPress={() => {}}
          className="flex-row items-center justify-between py-4 border-t-[0.5px] border-t-gray-200">
          <Text className="text-sm font-medium text-gray-800">Down Payment</Text>
          <Icon name="chevron_right" size={22} color={colors.gray[500]} />
        </TouchableOpacity>
      </View>
    </TrueSheet>
  );
};
