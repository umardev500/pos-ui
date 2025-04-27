import {Icon, Input} from '@app/components/atoms';
import React from 'react';
import {Pressable, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type Props = {};

export const MainHeader: React.FC<Props> = ({}) => {
  const {top} = useSafeAreaInsets();

  const handleChange = (text: string) => {
    // TODO
  };

  return (
    <View className="bg-white" style={{paddingTop: top}}>
      <View className="flex-row items-center justify-between px-4 py-4 gap-6">
        <View className="flex-1 flex-row items-center gap-4">
          <Icon name="menu" />
          <Input onChangeText={handleChange} trailingIcon="search" placeholder="Search" size="sm" />
        </View>

        <View className="flex-row items-center gap-4">
          <Pressable onPress={() => {}}>
            <Icon name="assigment" />
          </Pressable>
          <Pressable onPress={() => {}}>
            <Icon name="notification" />
          </Pressable>
        </View>
      </View>
    </View>
  );
};
