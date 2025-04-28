import {MainStackParamList} from '@app/types';
import {createStackNavigator} from '@react-navigation/stack';
import {DrawerNavigation} from './drawer.navigation';
import {ManageProductStackNavigator} from './manage-product.navigation';

const Stack = createStackNavigator<MainStackParamList>();

export const MainNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ManageProductStack" component={ManageProductStackNavigator} />
      <Stack.Screen name="Drawer" component={DrawerNavigation} />
    </Stack.Navigator>
  );
};
