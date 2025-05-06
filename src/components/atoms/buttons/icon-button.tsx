import {Icon, IconName} from '@app/components/atoms/icon';
import {colors} from '@app/styles';
import clsx from 'clsx';
import React from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';

type Props = TouchableOpacityProps & {
  icon: IconName;
  backgroundColor?: string;
  color?: string;
  roundedSize?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg';
};

// Size configuration
const SIZE_STYLES = {
  xs: {width: 'w-8', height: 'h-8', iconSize: 18},
  sm: {width: 'w-10', height: 'h-10', iconSize: 24},
  md: {width: 'w-12', height: 'h-12', iconSize: 24},
  lg: {width: 'w-14', height: 'h-14', iconSize: 24},
} as const;

export const IconButton: React.FC<Props> = ({
  icon,
  backgroundColor = 'transparent',
  color = colors.gray[700],
  roundedSize,
  size = 'md',
  ...props
}) => {
  const {width, height, iconSize} = SIZE_STYLES[size];

  return (
    <TouchableOpacity
      {...props}
      className={clsx('items-center justify-center overflow-hidden', width, height, !roundedSize && 'rounded-full', {})}
      onPress={props.onPress}
      style={[{backgroundColor}, roundedSize ? {borderRadius: roundedSize} : null]}>
      <Icon name={icon} size={iconSize} color={color} />
    </TouchableOpacity>
  );
};
