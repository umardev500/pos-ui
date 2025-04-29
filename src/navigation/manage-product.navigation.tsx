import {IconButton} from '@app/components/atoms';
import {CategoryFormHeaderRight} from '@app/components/molecules';
import {ManageProductScreen, MaterialScreen, RecipeScreen, VariantScreen} from '@app/screens';
import {CategoriesScreen, CategoryDetailScreen} from '@app/screens/categories';
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
        header: ({back, route, options}) => (
          <Header {...options} headerStyle={{elevation: 0}} back={back} title={getHeaderTitle(options, route.name)} />
        ),
      }}>
      <Stack.Screen options={{title: 'Kelola Produk'}} name="ManageProduct" component={ManageProductScreen} />
      <Stack.Screen options={{title: 'Daftar Produk'}} name="Products" component={ProductsScreen} />
      <Stack.Screen
        options={({navigation}) => ({
          title: 'Kategori',
          headerRight: () => {
            return (
              <IconButton icon="add" onPress={() => navigation.navigate('CategoryDetail', {id: undefined})} size="sm" />
            );
          },
        })}
        name="Categories"
        component={CategoriesScreen}
      />
      <Stack.Screen options={{title: 'Varian'}} name="Variant" component={VariantScreen} />
      <Stack.Screen options={{title: 'Bahan Baku'}} name="Material" component={MaterialScreen} />
      <Stack.Screen options={{title: 'Resep'}} name="Recipe" component={RecipeScreen} />

      {/* Subscreen of category */}
      <Stack.Screen
        options={{
          title: 'Detail Kategori',
          headerRight: () => <CategoryFormHeaderRight />,
        }}
        name="CategoryDetail"
        component={CategoryDetailScreen}
      />
    </Stack.Navigator>
  );
};
