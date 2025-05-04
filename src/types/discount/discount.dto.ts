export interface DiscountDto {
  id: number;
  merchant_id: number;
  scope: string;
  type: DiscountType;
  value: number;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
}

export enum DiscountType {
  PERCENT = 'PERCENT',
  FIXED = 'FIXED',
}
