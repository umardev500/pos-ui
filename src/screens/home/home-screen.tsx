import {ListProducts, MainHeader} from '@app/components/organisms';
import {View} from 'react-native';
import {SystemBars} from 'react-native-edge-to-edge';

export const HomeScreen = () => {
  return (
    <>
      <SystemBars style={'dark'} />
      <MainHeader />
      <View className="bg-gray-100 flex-1">
        <ListProducts />
      </View>
    </>
  );
};
