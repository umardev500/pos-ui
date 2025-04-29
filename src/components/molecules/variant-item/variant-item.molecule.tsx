import {Icon} from '@app/components/atoms';
import React from 'react';
import {Text, View} from 'react-native';

type Props = {
  item: any;
};

export const VariantItem: React.FC<Props> = ({item}) => {
  const fixedKeys = ['price', 'stock'];
  const dynamicFields = Object.keys(item).filter(key => !fixedKeys.includes(key));

  return (
    <View className="bg-white border border-dashed border-gray-400 rounded-2xl  px-4 py-2.5 mb-4">
      <View className="">
        {dynamicFields.map((key, _) => (
          <View key={key} className="flex-row items-center bg-gray-50 rounded-lg px-3 py-1 mb-1 shadow-sm">
            <Icon name="chevron_right" size={16} color="#6b7280" />
            <Text className="text-sm text-gray-700 ml-2">
              {key.charAt(0).toUpperCase() + key.slice(1)}:{' '}
              <Text className="font-medium text-gray-900">{item[key]}</Text>
            </Text>
          </View>
        ))}
      </View>

      <View className="flex-row items-center gap-4">
        <View className="flex-row items-center gap-2 mt-2">
          <Icon name="deployed_code_update" size={18} color="gray" />
          <Text className="text-sm text-gray-600">Stok: {item.stock}</Text>
        </View>
        <View className="flex-row items-center gap-2 mt-2">
          <Icon name="finance_mode" size={18} color="gray" />
          <Text className="text-sm text-gray-600">Harga: {item.price}</Text>
        </View>
      </View>
    </View>
  );
};
