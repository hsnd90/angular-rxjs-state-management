export interface Category {
  id?: number;
  name: string;
  description?: string;
  parentId?: number;
}

export interface Categories{
  categories: Category[];
  subcategories: Category[];
}
