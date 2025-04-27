import clsx from 'clsx';
import React from 'react';
import {Pressable, Text, View} from 'react-native';

type Props = {
  title: string;
  size?: 'md' | 'lg';
  containerColor?: string; // background color class
  textColor?: string; // text color class
  textSize?: number;
  onPress?: () => void;
};

export const Button: React.FC<Props> = props => {
  const {title, size = 'md', containerColor, textColor, textSize, onPress} = props;

  return (
    <Pressable onPress={onPress}>
      <View
        style={{backgroundColor: containerColor}}
        className={clsx('flex-row items-center justify-center rounded-xl', {
          'h-12': size === 'md',
          'h-14': size === 'lg',
        })}>
        <Text
          style={{color: textColor, fontSize: textSize}}
          className={clsx('text-center font-medium font-jost', {
            'text-base': size === 'md' && !textSize,
            'text-lg': size === 'lg' && !textSize,
          })}>
          {title}
        </Text>
      </View>
    </Pressable>
  );
};
