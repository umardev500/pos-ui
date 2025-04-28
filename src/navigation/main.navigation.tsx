import {MainStackParamList} from '@app/types';
import {createStackNavigator} from '@react-navigation/stack';
import {DrawerNavigation} from './drawer.navigation';

const Stack = createStackNavigator<MainStackParamList>();

export const MainNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Drawer" component={DrawerNavigation} />
    </Stack.Navigator>
  );
};
