import {Icon, IconName} from '@app/components/atoms/icon';
import {colors} from '@app/styles';
import {Text, View} from 'react-native';

type TagProps = {
  icon: IconName;
  value: number;
};

export const ProductTagIndicator: React.FC<TagProps> = ({icon, value}) => (
  <View className="flex-row items-center gap-0.5 px-1 border border-orange-500 bg-orange-50 rounded">
    <Icon name={icon} size={14} color={colors.orange[500]} />
    <Text className="text-xs text-orange-500">{value}</Text>
  </View>
);
