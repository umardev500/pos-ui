import {Icon} from '@app/components/atoms';
import {useCartStore} from '@app/stores';
import {colors} from '@app/styles';
import {TrueSheet} from '@lodev09/react-native-true-sheet';
import {useNavigation} from '@react-navigation/native';
import clsx from 'clsx';
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
  const additionalInfo = useCartStore(state => state.additionalInfo);
  const setAdditionalInfo = useCartStore(state => state.setAdditionalInfo);

  // ————————————————————————————————————————————————
  // 🛠 Handlers
  // ————————————————————————————————————————————————
  const toggleSwitch = () => setIsEnabled(prev => !prev);

  const handlePressDiscount = () => {
    if (additionalInfo?.discount) {
      setAdditionalInfo({discount: undefined});
      return;
    }

    ref?.current?.dismiss();
    navigation.navigate('VoucherList');
  };

  return (
    <TrueSheet keyboardMode="pan" edgeToEdge ref={ref} sizes={['auto', 'large']}>
      <View className="pt-6 px-4" style={{paddingBottom: bottom + 16}}>
        <TouchableOpacity
          activeOpacity={0.4}
          onPress={handlePressDiscount}
          className="flex-row items-center justify-between h-16">
          <Text className="text-sm font-medium text-gray-800">Pilih Diskon</Text>

          <View
            className={clsx('flex-row items-center gap-2', {
              'bg-gray-200 px-2 py-0.5 rounded-full': additionalInfo?.discount,
            })}>
            <Text className="text-sm font-medium text-gray-800">{additionalInfo?.discount?.label}</Text>
            <Icon
              name={additionalInfo?.discount ? 'x' : 'chevron_right'}
              size={additionalInfo?.discount ? 20 : 22}
              color={additionalInfo?.discount ? colors.red[500] : colors.gray[500]}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={toggleSwitch}
          activeOpacity={0.4}
          className="flex-row items-center justify-between h-16 border-t-[0.5px] border-t-gray-200">
          <Text className="text-sm font-medium text-gray-800">Point</Text>

          <View className="flex-row items-center gap-2">
            <Text className="text-sm font-medium text-gray-800">{0}</Text>
            <Switch
              trackColor={{false: undefined, true: colors.gray[400]}}
              thumbColor={isEnabled ? colors.gray[500] : '#fff'}
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.4}
          onPress={() => {}}
          className="flex-row items-center justify-between h-16 border-t-[0.5px] border-t-gray-200">
          <Text className="text-sm font-medium text-gray-800">Down Payment</Text>
          <View className="flex-row items-center gap-2">
            <Text className="text-sm font-medium text-gray-800">{additionalInfo?.downPayment}</Text>
            <Icon name="chevron_right" size={22} color={colors.gray[500]} />
          </View>
        </TouchableOpacity>
      </View>
    </TrueSheet>
  );
};
