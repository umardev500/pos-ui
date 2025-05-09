import {Icon} from '@app/components/atoms';
import {colors} from '@app/styles';
import {Text, View} from 'react-native';
import {BaseToastProps, ToastConfig} from 'react-native-toast-message';

interface CustomToastProps extends BaseToastProps {
  text1?: string;
  text2?: string;
}

export const toastConfig: ToastConfig = {
  success: (toast: CustomToastProps) => (
    <View className="bg-white shadow-lg shadow-black flex-row items-center w-[85%] rounded-xl p-4 gap-2">
      <Icon name="earthquake" size={20} color={colors.green[500]} />
      <Text className="text-sm " numberOfLines={1} ellipsizeMode="tail">
        {toast.text1}
      </Text>
    </View>
  ),
  error: (toast: CustomToastProps) => (
    <View className="bg-white shadow-lg shadow-black flex-row items-center w-[85%] rounded-xl p-4 gap-2">
      <Icon name="x" size={20} color={colors.red[500]} />
      <Text className="text-sm text-gray-800" numberOfLines={1} ellipsizeMode="tail">
        {toast.text1}
      </Text>
    </View>
  ),
};
