// ————————————————————————————————————————————————
// Cart Types
// ————————————————————————————————————————————————
import {CartItem} from '@app/types/cart';

// ————————————————————————————————————————————————
// Main Stack Parameter Types
// ————————————————————————————————————————————————
export type MainStackParamList = {
  ManageProductStack: {
    screen?: keyof ManageProductStackParamList;
  };
  Drawer: undefined;
  Cart: undefined;
  ProductView: {id: number; cartItem?: CartItem};
  VoucherList: undefined;
  AddDP: undefined;
  CustomerList: {triggerAdd?: boolean};
  AddCustomer: {
    triggerSave?: {
      pressed?: boolean;
      ready?: boolean;
    };
  };
};

// ————————————————————————————————————————————————
// Manage Product Stack Parameter Types
// ————————————————————————————————————————————————
export type ManageProductStackParamList = {
  ManageProduct: undefined;
  Products: undefined;
  Categories: undefined;
  Unit: undefined;
  AddUnit: {id?: number};
  Variant: undefined;
  Material: undefined;
  Recipe: undefined;
  CategoryDetail: {id?: string};
  AddProduct: undefined;
  AddProductVariant: undefined;
  AddProductVariantList: undefined;
};

// ————————————————————————————————————————————————
// Authentication Stack Parameter Types
// ————————————————————————————————————————————————
export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
};

// ————————————————————————————————————————————————
// Root Stack Parameter Types
// ————————————————————————————————————————————————
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

// ————————————————————————————————————————————————
// Helper Types
// ————————————————————————————————————————————————
export type MainStackRouteNames = keyof MainStackParamList;
