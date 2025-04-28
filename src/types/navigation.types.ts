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
  Variant: undefined;
  Material: undefined;
  Recipe: undefined;
};
