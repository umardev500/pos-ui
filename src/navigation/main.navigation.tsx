import {IconButton} from '@app/components/atoms';
import {CartScreen, ProductView} from '@app/screens';
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
        headerShown: false,
        ...TransitionPresets.ModalSlideFromBottomIOS,
      }}>
      <Stack.Screen name="Drawer" component={DrawerNavigation} />
      <Stack.Screen name="ManageProductStack" component={ManageProductStackNavigator} />
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
    </Stack.Navigator>
  );
};
