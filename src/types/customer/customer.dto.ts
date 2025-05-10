import {Level} from '@app/types/customer/customer-level.dto';

export type CustomerDTO = {
  id: number;
  merchant_id: number;
  name: string;
  email: string;
  phone: string | null;
  address: string | null;
  points: number;
  level?: Level;
  created_at: string;
  updated_at: string;
};
