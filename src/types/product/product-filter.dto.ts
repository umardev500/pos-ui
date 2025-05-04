export interface ProductFilterDTO {
  search?: string; // Search term to filter products by name, description, etc.
  categoryId?: string; // ID for category filtering (optional)
}
