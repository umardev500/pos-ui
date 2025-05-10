export type CustomerDTO = {
  id: number;
  merchant_id: number;
  name: string;
  email: string;
  phone: string | null;
  address: string | null;
  points: number;
  created_at: string; // or Date if you'd prefer to work with Date objects
  updated_at: string; // or Date if you'd prefer to work with Date objects
};
