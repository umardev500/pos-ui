export interface VariantTypeDTO {
  id: number;
  name: string;
}

export interface VariantValueDto {
  id: number;
  variant_type_id: number;
  value: string;
}
