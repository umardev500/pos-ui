import {IconButton} from '@app/components/atoms';
import {AddCustomerScreen, CartScreen, CustomerListScreen, ProductView, VoucherListScreen} from '@app/screens';
import {AddDPScreen} from '@app/screens/add-dp/add-dp.screen';
import {colors} from '@app/styles';
import {MainStackParamList} from '@app/types';
import {getHeaderTitle, Header} from '@react-navigation/elements';
import {createStackNavigator, StackHeaderProps, TransitionPresets} from '@react-navigation/stack';
import {View} from 'react-native';
import {DrawerNavigation} from './drawer.navigation';
import {ManageProductStackNavigator} from './manage-product.navigation';

const Stack = createStackNavigator<MainStackParamList>();

interface RenderHeaderProps extends StackHeaderProps {
  headerRight?:
    | ((props: {tintColor?: string; pressColor?: string; pressOpacity?: number; canGoBack: boolean}) => React.ReactNode)
    | undefined;
}

const renderHeader = (props: RenderHeaderProps) => {
  const {back, options, route, ...etc} = props;

  return <Header headerStyle={{elevation: 0}} back={back} title={getHeaderTitle(options, route.name)} {...etc} />;
};

export const MainNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: renderHeader,
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
      <Stack.Screen
        options={({navigation}) => ({
          title: 'Customers',
          headerShown: true,
          header: props => {
            return renderHeader({
              ...props,
              headerRight: () => {
                return (
                  <IconButton
                    onPress={() => navigation.setParams({triggerAdd: true})}
                    icon="add"
                    iconSize={20}
                    color={colors.gray[600]}
                  />
                );
              },
            });
          },
        })}
        name="CustomerList"
        component={CustomerListScreen}
      />
      <Stack.Screen
        options={{
          title: 'Add Customer',
          headerShown: true,
          header: props => {
            return renderHeader({
              ...props,
              headerRight: () => {
                return <IconButton icon="check" iconSize={20} color={colors.gray[600]} />;
              },
            });
          },
        }}
        name="AddCustomer"
        component={AddCustomerScreen}
      />
    </Stack.Navigator>
  );
};
