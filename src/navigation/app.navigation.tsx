import {AuthNavigator} from '@app/navigation/auth.navigation';
import {HomeScreen} from '@app/screens';
import {useUserStore} from '@app/stores';
import {RootStackParamList} from '@app/types';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  const user = useUserStore(state => state.user);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {user ? (
          <Stack.Screen name="Main" component={HomeScreen} />
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
