import {IconName, Input} from '@app/components/atoms';
import {Text, View} from 'react-native';

export const LabeledInput = ({
  label,
  icon,
  trailingIcon,
  isClickableOnly,
  placeholder,
  value,
  onChange,
  onBlur,
  onPress,
  isTextArea,
  placeholderTextColor,
  size = 'sm',
}: {
  label: string;
  icon?: IconName;
  trailingIcon?: IconName;
  isClickableOnly?: boolean;
  placeholder: string;
  value?: string;
  onChange?: (text: string) => void;
  onBlur?: (e: any) => void;
  onPress?: () => void;
  isTextArea?: boolean;
  placeholderTextColor?: string;
  size?: 'sm' | 'md' | 'lg';
}) => (
  <View className="gap-2 flex-grow">
    <Text className="text-sm text-gray-800">{label}</Text>
    <Input
      leadingIcon={icon}
      trailingIcon={trailingIcon}
      isClickableOnly={isClickableOnly}
      placeholder={placeholder}
      value={value}
      onChangeText={onChange}
      onBlur={onBlur}
      onPress={onPress}
      isTextArea={isTextArea}
      placeholderTextColor={placeholderTextColor}
      size={size}
    />
  </View>
);
