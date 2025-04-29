import {IconButton} from '@app/components/atoms';
import {CategoryFormHeaderRight} from '@app/components/molecules';
import {
  AddProductVariant,
  AddProductVariantListScreen,
  ManageProductScreen,
  MaterialScreen,
  RecipeScreen,
  VariantScreen,
} from '@app/screens';
import {CategoriesScreen, CategoryDetailScreen} from '@app/screens/categories';
import {AddProductScreen, ProductsScreen} from '@app/screens/products';
import {MainStackParamList, ManageProductStackParamList} from '@app/types';
import {getHeaderTitle, Header} from '@react-navigation/elements';
import {createStackNavigator, StackScreenProps, TransitionPresets} from '@react-navigation/stack';
import React from 'react';
import {View} from 'react-native';

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
        ...TransitionPresets.ModalSlideFromBottomIOS,
      }}>
      <Stack.Screen options={{title: 'Kelola Produk'}} name="ManageProduct" component={ManageProductScreen} />
      <Stack.Screen
        options={({navigation}) => ({
          title: 'Daftar Produk',
          headerRight: () => <IconButton icon="add" onPress={() => navigation.navigate('AddProduct')} />,
        })}
        name="Products"
        component={ProductsScreen}
      />
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

      {/* Subscreen rest */}
      <Stack.Screen
        options={({route}) => {
          const id = route.params?.id;

          return {
            title: id ? 'Ubah Kategori' : 'Tambah Kategori',
            headerRight: () => <CategoryFormHeaderRight />,
          };
        }}
        name="CategoryDetail"
        component={CategoryDetailScreen}
      />

      <Stack.Screen
        options={{
          title: 'Tambah Produk',
        }}
        name="AddProduct"
        component={AddProductScreen}
      />

      <Stack.Screen
        options={() => ({
          title: 'Tambah variasi',
          headerRight: () => {
            return (
              <View className="mr-2">
                <IconButton
                  icon="check"
                  onPress={() => {
                    // TODO: handle save
                  }}
                  size="sm"
                />
              </View>
            );
          },
          ...TransitionPresets.ModalPresentationIOS,
        })}
        name="AddProductVariant"
        component={AddProductVariant}
      />

      <Stack.Screen
        options={() => ({
          title: 'Variasi Terpilih',
          headerRight: () => {
            return (
              <View className="mr-2">
                <IconButton
                  icon="check"
                  onPress={() => {
                    // TODO: handle save
                  }}
                  size="sm"
                />
              </View>
            );
          },
          ...TransitionPresets.ModalPresentationIOS,
        })}
        name="AddProdcutVariantList"
        component={AddProductVariantListScreen}
      />
    </Stack.Navigator>
  );
};
