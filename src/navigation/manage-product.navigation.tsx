import {ManageProductScreen} from '@app/screens';
import {CategoriesScreen} from '@app/screens/categories';
import {ProductsScreen} from '@app/screens/products';
import {MainStackParamList, ManageProductStackParamList} from '@app/types';
import {createStackNavigator, StackScreenProps} from '@react-navigation/stack';
import React from 'react';

type Props = StackScreenProps<MainStackParamList, 'ManageProductStack'>;

const Stack = createStackNavigator<ManageProductStackParamList>();

export const ManageProductStackNavigator: React.FC<Props> = ({route}) => {
  return (
    <Stack.Navigator initialRouteName={route.params?.screen} screenOptions={{headerShown: false}}>
      <Stack.Screen name="ManageProduct" component={ManageProductScreen} />
      <Stack.Screen name="Products" component={ProductsScreen} />
      <Stack.Screen name="Categories" component={CategoriesScreen} />
    </Stack.Navigator>
  );
};
