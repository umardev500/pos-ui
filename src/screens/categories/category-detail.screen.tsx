import {Input} from '@app/components/atoms';
import React from 'react';
import {Text, View} from 'react-native';

type Props = {};

export const CategoryDetailScreen: React.FC<Props> = ({}) => {
  return (
    <View className="flex-1 bg-white p-4 gap-4">
      <View className="gap-2">
        <Text className="text-base text-gray-800">Nama Kategory*</Text>
        <Input onChangeText={() => {}} placeholder="Kategori" size="md" value="Makanan" />
      </View>

      <View className="gap-2">
        <Text className="text-base text-gray-800">Keterangan</Text>
        <Input onChangeText={() => {}} placeholder="Deskripsi dari kategori" size="md" />
      </View>
    </View>
  );
};
