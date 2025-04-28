import {AuthStackParamList, MainStackParamList, ManageProductStackParamList, RootStackParamList} from '@app/types';

declare global {
  namespace ReactNavigation {
    interface RootParamList
      extends RootStackParamList,
        MainStackParamList,
        AuthStackParamList,
        ManageProductStackParamList {}
  }
}
