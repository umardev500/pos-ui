import {avatar} from '@app/assets/images/avatars';
import {DrawerMenu} from '@app/components/molecules';
import {DrawerContentComponentProps} from '@react-navigation/drawer';
import React from 'react';
import {Image, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type Props = DrawerContentComponentProps;

export const DrawerContent: React.FC<Props> = ({}) => {
  const {top} = useSafeAreaInsets();

  return (
    <>
      <View style={{paddingTop: top}}>
        <View className="px-4 pt-6">
          <View className="flex-row items-center gap-4">
            <Image className="w-14 h-14 rounded-full" source={avatar} />
            <View>
              <Text className="text-base text-gray-800">Hello 👋</Text>
              <Text className="text-base font-medium text-gray-800">Umar Sinclair</Text>
            </View>
          </View>

          <View className="h-[1px] bg-gray-200 mt-6" />
        </View>

        <View className="px-4 py-4">
          <DrawerMenu label="Katalog" icon="package" />
          <DrawerMenu label="Laporan" icon="finance_mode" />
          <DrawerMenu label="Kelola Produk" icon="deployed_code_update" />
          <DrawerMenu label="Kelola Toko" icon="store_front" />
          <DrawerMenu label="Keluar" icon="power_setting" />
        </View>
      </View>
    </>
  );
};
