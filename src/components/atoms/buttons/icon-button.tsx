import {Icon} from '@app/components/atoms/icon';
import {colors} from '@app/styles';
import clsx from 'clsx';
import React from 'react';
import {TouchableOpacity, TouchableOpacityProps, View} from 'react-native';

type Props = React.ForwardRefExoticComponent<TouchableOpacityProps & React.RefAttributes<View>> & {
  backgroundColor?: string;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
};

// Size configuration
const SIZE_STYLES = {
  sm: {width: 'w-10', height: 'h-10', icon: 18},
  md: {width: 'w-12', height: 'h-12', icon: 22},
  lg: {width: 'w-14', height: 'h-14', icon: 26},
} as const;

export const IconButton: React.FC<Props> = ({
  backgroundColor = colors.gray[300],
  color = colors.gray[400],
  size = 'md',
  ...props
}) => {
  const {width, height, icon} = SIZE_STYLES[size];
  return (
    <TouchableOpacity
      {...props}
      className={clsx('', width, height, {})}
      onPress={() => {}}
      disabled
      style={{backgroundColor}}>
      <Icon name="check" size={icon} color={color} />
    </TouchableOpacity>
  );
};
