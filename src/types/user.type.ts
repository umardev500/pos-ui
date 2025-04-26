export type User = {
  id: number;
  fullname: string;
  email: string;
  password: string;
  role: string;
  merchant_id: number;
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
};
