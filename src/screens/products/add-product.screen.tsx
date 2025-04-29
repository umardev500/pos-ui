import {Icon, Input} from '@app/components/atoms';
import {colors} from '@app/styles';
import clsx from 'clsx';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-gesture-handler';

type Props = {};

export const AddProductScreen: React.FC<Props> = ({}) => {
  const size = 'sm';
  const labelSize = 'text-sm';

  return (
    <View className="flex-1 bg-white p-4">
      {/* Main info */}
      <View className="gap-4">
        <View className="gap-2">
          <Text className={clsx('text-gray-800', labelSize)}>Nama Produk</Text>
          <Input
            leadingIcon="deployed_code_update"
            onChangeText={() => {}}
            placeholder="Masukan nama produk"
            size={size}
          />
        </View>

        <View className="flex-row gap-2 items-center">
          <View className="flex-1 gap-2">
            <Text className={clsx('text-gray-800', labelSize)}>Kategori</Text>
            <Input trailingIcon="chevron_right" onChangeText={() => {}} placeholder="Pilih kategori" size={size} />
          </View>
          <View className="flex-1 gap-2">
            <Text className={clsx('text-gray-800', labelSize)}>Satuan</Text>
            <Input trailingIcon="chevron_right" onChangeText={() => {}} placeholder="Pilik kategori" size={size} />
          </View>
        </View>

        <View className="flex-row gap-2 items-center">
          <View className="flex-1 gap-2">
            <Text className={clsx('text-gray-800', labelSize)}>Harga Pokok</Text>
            <Input leadingIcon="attch_money" onChangeText={() => {}} placeholder="3.500" size={size} />
          </View>
          <View className="flex-1 gap-2">
            <Text className={clsx('text-gray-800', labelSize)}>Harga Jual</Text>
            <Input leadingIcon="finance_mode" onChangeText={() => {}} placeholder="5.000" size={size} />
          </View>
        </View>
      </View>

      {/* Additional info */}
      <View className="pt-6">
        <View className="flex-row items-center justify-betwee gap-1">
          <Text className="text-sm text-gray-800">Data Tambahan</Text>
          <Icon name="chevron_down" size={22} color={colors.gray[500]} />
        </View>

        <View className="pt-4 gap-4">
          <View className="gap-2">
            <Text className={clsx('text-gray-800', labelSize)}>SKU</Text>
            <Input leadingIcon="style" onChangeText={() => {}} placeholder="XLM-0001" size={size} />
          </View>

          <View className="gap-2">
            <Text className={clsx('text-gray-800', labelSize)}>Barcode</Text>
            <Input
              leadingIcon="barcode_scanner"
              trailingIcon="barcode_reader"
              onChangeText={() => {}}
              placeholder="31245847"
              size={size}
            />
          </View>

          {/* Drop zone */}
          <View>
            <View className="border border-dashed border-gray-300 rounded-xl flex-row items-center gap-4 justify-between pr-4 mr-14">
              <View className="w-20 h-20 bg-gray-200 rounded-xl items-center justify-center">
                <Icon name="deployed_code_update" size={24} color={colors.gray[500]} />
              </View>

              <TouchableOpacity onPress={() => {}}>
                <View className="border border-orange-500 rounded-xl px-4 py-2 items-center justify-center">
                  <Text className="text-orange-500 text-center font-medium">Pilih foto</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View className="gap-2">
            <Text className={clsx('text-gray-800', labelSize)}>Deskripsi</Text>
            <Input
              leadingIcon="description"
              onChangeText={() => {}}
              placeholder="Masukan deskripsi produk"
              size={size}
            />
          </View>
        </View>
      </View>
    </View>
  );
};
