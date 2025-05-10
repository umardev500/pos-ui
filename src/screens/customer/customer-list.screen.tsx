import {CustomerList} from '@app/components/organisms';
import {useCustomers} from '@app/hooks';
import {CustomerDTO, MainStackParamList} from '@app/types';
import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {Alert, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

// ————————————————————————————————————————————————
// Types
// ————————————————————————————————————————————————
type Props = StackScreenProps<MainStackParamList, 'CustomerList'>;

// ————————————————————————————————————————————————
// Screen Component
// ————————————————————————————————————————————————
export const CustomerListScreen: React.FC<Props> = ({navigation, route}) => {
  const {data: customers = []} = useCustomers();
  const {params} = route;

  // ————————————————————————————————————————————————
  // 📦 Hooks
  // ————————————————————————————————————————————————
  const {bottom} = useSafeAreaInsets();

  // ————————————————————————————————————————————————
  // 🧪 Effects
  // ————————————————————————————————————————————————

  /**
   * Navigates to the 'AddCustomer' screen when 'triggerAdd' is true,
   * and resets the 'triggerAdd' parameter to false.
   */
  useEffect(() => {
    if (params?.triggerAdd) {
      // Navigate to the AddCustomer screen
      navigation.navigate('AddCustomer', {});

      // Reset the triggerAdd parameter
      navigation.setParams({triggerAdd: false});
    }
  }, [params?.triggerAdd, navigation]);

  // ————————————————————————————————————————————————
  // 🛠 Handlers
  // ————————————————————————————————————————————————
  const handlePressEdit = (item: CustomerDTO) => {};
  const handlePressDelete = (item: CustomerDTO) => {
    Alert.alert('Delete item', 'Are you sure you want to delete this?', [
      {text: 'Cancel', style: 'cancel'},
      {text: 'Delete', onPress: () => {}, style: 'destructive'},
    ]);
  };

  // ————————————————————————————————————————————————
  // UI
  // ————————————————————————————————————————————————
  return (
    <View className="flex-1 bg-white">
      <CustomerList
        data={customers}
        paddingBottom={bottom + 16}
        onPressDelete={handlePressDelete}
        onPressEdit={handlePressEdit}
      />
    </View>
  );
};
