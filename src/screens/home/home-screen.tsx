import {ListProducts} from '@app/components/organisms';
import {View} from 'react-native';
import {SystemBars} from 'react-native-edge-to-edge';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const HomeScreen = () => {
  const {top} = useSafeAreaInsets();

  return (
    <>
      <SystemBars style={'dark'} />
      <View className="bg-gray-100 flex-1" style={{paddingTop: top + 16}}>
        <ListProducts />
      </View>
    </>
  );
};
