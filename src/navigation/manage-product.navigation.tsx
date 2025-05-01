import {IconButton} from '@app/components/atoms';
import {
  AddProductVariant,
  AddProductVariantListScreen,
  ManageProductScreen,
  MaterialScreen,
  RecipeScreen,
  UnitListScreen,
  VariantScreen,
} from '@app/screens';
import {CategoriesScreen, CategoryDetailScreen} from '@app/screens/categories';
import {AddProductScreen, ProductsScreen} from '@app/screens/products';
import {useTriggerStore} from '@app/stores';
import {colors} from '@app/styles';
import {MainStackParamList, ManageProductStackParamList} from '@app/types';
import {getHeaderTitle, Header} from '@react-navigation/elements';
import {createStackNavigator, StackScreenProps, TransitionPresets} from '@react-navigation/stack';
import React from 'react';
import {View} from 'react-native';

type Props = StackScreenProps<MainStackParamList, 'ManageProductStack'>;

const Stack = createStackNavigator<ManageProductStackParamList>();

export const ManageProductStackNavigator: React.FC<Props> = props => {
  const setSaveAddVariantPressed = useTriggerStore(state => state.setSaveAddVariantPressed);
  const setSaveAddProductPressed = useTriggerStore(state => state.setSaveAddProductPressed);
  const pressSaveAddCategory = useTriggerStore(state => state.pressSaveAddCategory);
  const isSaveAddCategoryEnabled = useTriggerStore(state => state.isSaveAddCategoryEnabled);
  const isSaveAddProductEnabled = useTriggerStore(state => state.isSaveAddProductEnabled);

  return (
    <Stack.Navigator
      initialRouteName={props.route.params?.screen}
      screenOptions={{
        // Customize the header with title and back button
        header: ({back, route, options}) => (
          <Header {...options} headerStyle={{elevation: 0}} back={back} title={getHeaderTitle(options, route.name)} />
        ),
        ...TransitionPresets.ModalSlideFromBottomIOS, // Slide transition for modals
      }}>
      {/* Main Screens */}
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
          headerRight: () => (
            <IconButton icon="add" onPress={() => navigation.navigate('CategoryDetail', {id: undefined})} size="sm" />
          ),
        })}
        name="Categories"
        component={CategoriesScreen}
      />

      <Stack.Screen
        options={({navigation}) => ({
          title: 'Satuan',
          headerRight: () => (
            <View className="px-1">
              <IconButton icon="add" onPress={() => navigation.navigate('AddUnit', {id: undefined})} size="sm" />
            </View>
          ),
        })}
        name="Unit"
        component={UnitListScreen}
      />
      <Stack.Screen
        options={() => ({
          title: 'Tambah Satuan',
          headerRight: () => (
            <View className="px-1">
              <IconButton icon="check" size="sm" />
            </View>
          ),
        })}
        name="AddUnit"
        component={UnitListScreen}
      />
      <Stack.Screen options={{title: 'Varian'}} name="Variant" component={VariantScreen} />
      <Stack.Screen options={{title: 'Bahan Baku'}} name="Material" component={MaterialScreen} />
      <Stack.Screen options={{title: 'Resep'}} name="Recipe" component={RecipeScreen} />

      {/* Category Detail Screen */}
      <Stack.Screen
        options={({route}) => {
          const id = route.params?.id;
          return {
            title: id ? 'Ubah Kategori' : 'Tambah Kategori',
            headerRight: () => (
              <View className="mr-2 flex-row items-center gap-2">
                <IconButton
                  icon="check"
                  color={isSaveAddCategoryEnabled ? colors.gray[700] : colors.gray[400]}
                  disabled={!isSaveAddCategoryEnabled}
                  onPress={pressSaveAddCategory}
                  size="sm"
                />
                {id && <IconButton icon="delete" size="sm" color={colors.red[600]} />}
              </View>
            ),
          };
        }}
        name="CategoryDetail"
        component={CategoryDetailScreen}
      />

      {/* Add Product Screen */}
      <Stack.Screen
        options={() => ({
          title: 'Tambah Produk',
          headerRight: () => (
            <View className="mr-2">
              <IconButton
                disabled={!isSaveAddProductEnabled}
                color={isSaveAddProductEnabled ? colors.gray[700] : colors.gray[400]}
                icon="check"
                onPress={() => setSaveAddProductPressed(true)}
                size="sm"
              />
            </View>
          ),
        })}
        name="AddProduct"
        component={AddProductScreen}
      />

      {/* Add Product Variant Screen */}
      <Stack.Screen
        options={() => ({
          title: 'Tambah Variasi',
          headerRight: () => (
            <View className="mr-2">
              <IconButton icon="check" onPress={() => setSaveAddVariantPressed(true)} size="sm" />
            </View>
          ),
          ...TransitionPresets.ModalPresentationIOS, // Modal transition
        })}
        name="AddProductVariant"
        component={AddProductVariant}
      />

      {/* Add Product Variant List Screen */}
      <Stack.Screen
        options={() => ({
          title: 'Variasi Terpilih',
          ...TransitionPresets.ModalPresentationIOS, // Modal transition
        })}
        name="AddProductVariantList"
        component={AddProductVariantListScreen}
      />
    </Stack.Navigator>
  );
};
