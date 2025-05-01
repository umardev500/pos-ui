export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type MainStackParamList = {
  ManageProductStack: {
    screen?: keyof ManageProductStackParamList;
  };
  Drawer: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
};

export type ManageProductStackParamList = {
  ManageProduct: undefined;
  Products: undefined;
  Categories: undefined;
  Unit: undefined;
  AddUnit: {
    id?: number;
  };
  Variant: undefined;
  Material: undefined;
  Recipe: undefined;

  // Sub screen rest
  CategoryDetail: {
    id?: string;
  };
  AddProduct: undefined;
  AddProductVariant: undefined;
  AddProductVariantList: undefined;
};
