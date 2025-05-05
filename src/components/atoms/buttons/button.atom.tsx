import {Loading} from '@app/components/atoms/loading';
import clsx from 'clsx';
import {AnimationObject} from 'lottie-react-native';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

type Props = {
  title: string;
  size?: 'md' | 'lg';
  containerColor?: string;
  textColor?: string;
  textSize?: number;
  isLoading?: boolean;
  loadingType?: 'single' | 'beside' | 'beside-right';
  onPress?: () => void;
  anim?:
    | string
    | AnimationObject
    | {
        uri: string;
      };
  activeOpacity?: number;
  disabled?: boolean;
};

export const Button: React.FC<Props> = ({
  title,
  size = 'md',
  containerColor,
  textColor,
  textSize,
  isLoading = false,
  loadingType = 'beside',
  anim = require('@app/assets/anim/loading-primary.json'),
  activeOpacity = 0.7,
  disabled = false,
  onPress,
}) => {
  const renderText = () => (
    <Text
      style={{color: textColor, fontSize: textSize}}
      className={clsx('text-center font-medium', {
        'text-base': size === 'md' && !textSize,
        'text-lg': size === 'lg' && !textSize,
      })}>
      {title}
    </Text>
  );

  const renderContent = () => {
    if (!isLoading) return renderText();

    if (loadingType === 'single') {
      return <Loading source={anim} size={22} />;
    }

    return (
      <View className="flex-row items-center gap-2">
        {loadingType === 'beside' && <Loading source={anim} size={22} />}
        {renderText()}
        {loadingType === 'beside-right' && <Loading source={anim} size={22} />}
      </View>
    );
  };

  return (
    <TouchableOpacity disabled={disabled} activeOpacity={activeOpacity} onPress={onPress}>
      <View
        style={{backgroundColor: containerColor}}
        className={clsx('flex-row items-center justify-center rounded-xl', {
          'h-12': size === 'md',
          'h-14': size === 'lg',
        })}>
        {renderContent()}
      </View>
    </TouchableOpacity>
  );
};
