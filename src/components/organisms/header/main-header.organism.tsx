import {Icon, Input} from '@app/components/atoms';
import {colors} from '@app/styles';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type Props = {};

export const MainHeader: React.FC<Props> = ({}) => {
  const {top} = useSafeAreaInsets();
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  const handleToggleDrawer = () => {
    // TODO
    navigation.toggleDrawer();
  };

  const handleChange = (text: string) => {
    // TODO
  };

  return (
    <View className="bg-white" style={{paddingTop: top}}>
      <View className="flex-row items-center justify-between px-4 py-4 gap-6">
        <View className="flex-1 flex-row items-center gap-4">
          <Pressable onPress={handleToggleDrawer}>
            <Icon name="menu" size={24} color={colors.gray[600]} />
          </Pressable>
          <Input onChangeText={handleChange} trailingIcon="search" placeholder="Search" size="sm" />
        </View>

        <View className="flex-row items-center gap-4">
          <Pressable onPress={() => {}}>
            <Icon name="assigment" size={24} color={colors.gray[700]} />
          </Pressable>
          <Pressable onPress={() => {}}>
            <Icon name="notification" size={24} color={colors.gray[700]} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};
