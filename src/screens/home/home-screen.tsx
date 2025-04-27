import {ListProducts} from '@app/components/organisms';
import {View} from 'react-native';
import {SystemBars} from 'react-native-edge-to-edge';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const HomeScreen = () => {
  const {top} = useSafeAreaInsets();

  return (
    <>
      <SystemBars style={'dark'} />
      <View style={{paddingTop: top}}>
        <View className="px-4">
          <ListProducts />
        </View>
      </View>
    </>
  );
};
