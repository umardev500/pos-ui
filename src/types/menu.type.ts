import {ManageProductStackParamList} from '@app/types/navigation.types';

export type MenuItem<T, S extends keyof T = keyof T> = {
  label: string;
  screen: S;
  params?: T[S];
};

export type ManageProductMenuItem =
  | MenuItem<ManageProductStackParamList, 'ManageProduct'>
  | MenuItem<ManageProductStackParamList, 'Products'>
  | MenuItem<ManageProductStackParamList, 'Categories'>
  | MenuItem<ManageProductStackParamList, 'Unit'>
  | MenuItem<ManageProductStackParamList, 'AddUnit'>
  | MenuItem<ManageProductStackParamList, 'Variant'>
  | MenuItem<ManageProductStackParamList, 'Material'>
  | MenuItem<ManageProductStackParamList, 'Recipe'>
  | MenuItem<ManageProductStackParamList, 'CategoryDetail'>;
