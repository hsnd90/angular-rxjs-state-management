import { Category } from "./category.model";

export interface Product {
  id?: number;
  name: string;
  price: number;
  categoryId: number;
  quantitySold: number;
  category?:Category
}
