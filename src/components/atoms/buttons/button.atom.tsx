import {Loading} from '@app/components/atoms/loading';
import clsx from 'clsx';
import React from 'react';
import {Pressable, Text, View} from 'react-native';

type Props = {
  title: string;
  size?: 'md' | 'lg';
  containerColor?: string;
  textColor?: string;
  textSize?: number;
  isLoading?: boolean;
  loadingType?: 'single' | 'beside' | 'beside-right';
  onPress?: () => void;
};

export const Button: React.FC<Props> = ({
  title,
  size = 'md',
  containerColor,
  textColor,
  textSize,
  isLoading = false,
  loadingType = 'beside',
  onPress,
}) => {
  const renderText = () => (
    <Text
      style={{color: textColor, fontSize: textSize}}
      className={clsx('text-center font-medium font-jost', {
        'text-base': size === 'md' && !textSize,
        'text-lg': size === 'lg' && !textSize,
      })}>
      {title}
    </Text>
  );

  const renderContent = () => {
    if (!isLoading) return renderText();

    if (loadingType === 'single') {
      return <Loading size={22} />;
    }

    return (
      <View className="flex-row items-center gap-2">
        {loadingType === 'beside' && <Loading size={22} />}
        {renderText()}
        {loadingType === 'beside-right' && <Loading size={22} />}
      </View>
    );
  };

  return (
    <Pressable onPress={onPress}>
      <View
        style={{backgroundColor: containerColor}}
        className={clsx('flex-row items-center justify-center rounded-xl', {
          'h-12': size === 'md',
          'h-14': size === 'lg',
        })}>
        {renderContent()}
      </View>
    </Pressable>
  );
};
