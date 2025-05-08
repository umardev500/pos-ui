export interface DiscountDTO {
  id: number;
  merchant_id: number;
  scope: DiscountScope;
  type: DiscountType;
  value: number;
  label?: string;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
}

export enum DiscountType {
  PERCENT = 'PERCENT',
  FIXED = 'FIXED',
}

export enum DiscountScope {
  PRODUCT = 'PRODUCT',
  ORDER = 'ORDER',
}

export interface FindDiscountFilterDTO {
  scope?: DiscountScope;
}
