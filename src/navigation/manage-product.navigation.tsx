import {ManageProductScreen, MaterialScreen, RecipeScreen, VariantScreen} from '@app/screens';
import {CategoriesScreen} from '@app/screens/categories';
import {ProductsScreen} from '@app/screens/products';
import {MainStackParamList, ManageProductStackParamList} from '@app/types';
import {getHeaderTitle, Header} from '@react-navigation/elements';
import {createStackNavigator, StackScreenProps} from '@react-navigation/stack';
import React from 'react';

type Props = StackScreenProps<MainStackParamList, 'ManageProductStack'>;

const Stack = createStackNavigator<ManageProductStackParamList>();

export const ManageProductStackNavigator: React.FC<Props> = props => {
  return (
    <Stack.Navigator
      initialRouteName={props.route.params?.screen}
      screenOptions={{
        headerShown: false,
        header: ({back, route, options}) => (
          <Header {...options} back={back} title={getHeaderTitle(options, route.name)} />
        ),
      }}>
      <Stack.Screen name="ManageProduct" component={ManageProductScreen} />
      <Stack.Screen name="Products" component={ProductsScreen} />
      <Stack.Screen name="Categories" component={CategoriesScreen} />
      <Stack.Screen name="Variant" component={VariantScreen} />
      <Stack.Screen name="Material" component={MaterialScreen} />
      <Stack.Screen name="Recipe" component={RecipeScreen} />
    </Stack.Navigator>
  );
};
