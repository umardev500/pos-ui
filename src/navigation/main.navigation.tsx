import {IconButton} from '@app/components/atoms';
import {CartScreen, ProductView, VoucherListScreen} from '@app/screens';
import {AddDPScreen} from '@app/screens/add-dp/add-dp.screen';
import {colors} from '@app/styles';
import {MainStackParamList} from '@app/types';
import {getHeaderTitle, Header} from '@react-navigation/elements';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {View} from 'react-native';
import {DrawerNavigation} from './drawer.navigation';
import {ManageProductStackNavigator} from './manage-product.navigation';

const Stack = createStackNavigator<MainStackParamList>();

export const MainNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: ({back, route, options}) => (
          <Header headerStyle={{elevation: 0}} back={back} title={getHeaderTitle(options, route.name)} />
        ),
        ...TransitionPresets.ModalSlideFromBottomIOS,
      }}>
      <Stack.Screen name="Drawer" component={DrawerNavigation} options={{headerShown: false}} />
      <Stack.Screen name="ManageProductStack" component={ManageProductStackNavigator} options={{headerShown: false}} />
      <Stack.Screen
        options={{
          title: 'Daftar Pesanan',
          headerShown: true,
          header: ({back, route, options}) => (
            <Header
              headerRight={() => {
                return (
                  <View className="px-1">
                    <IconButton icon="more_vert" color={colors.gray[800]} />
                  </View>
                );
              }}
              {...options}
              headerStyle={{elevation: 0}}
              back={back}
              title={getHeaderTitle(options, route.name)}
            />
          ),
        }}
        name="Cart"
        component={CartScreen}
      />
      <Stack.Screen name="ProductView" options={{headerShown: false, title: ''}} component={ProductView} />
      <Stack.Screen
        options={{
          title: 'Pilih Diskon',
          headerShown: true,
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}
        name="VoucherList"
        component={VoucherListScreen}
      />
      <Stack.Screen
        options={{
          title: 'Down Payment',
          headerShown: true,
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}
        name="AddDP"
        component={AddDPScreen}
      />
    </Stack.Navigator>
  );
};
